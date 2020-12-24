package by.minilooth.medicalinstitution.controllers;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import by.minilooth.medicalinstitution.models.Booking;
import by.minilooth.medicalinstitution.models.Employee;
import by.minilooth.medicalinstitution.models.Room;
import by.minilooth.medicalinstitution.payload.requests.BookingRequest;
import by.minilooth.medicalinstitution.payload.requests.CancelBookingRequest;
import by.minilooth.medicalinstitution.payload.requests.FinishBookingRequest;
import by.minilooth.medicalinstitution.payload.responses.MessageResponse;
import by.minilooth.medicalinstitution.services.BookingService;
import by.minilooth.medicalinstitution.services.EmployeeService;
import by.minilooth.medicalinstitution.services.RoomService;
import by.minilooth.medicalinstitution.utils.ValidationResult;
import by.minilooth.medicalinstitution.utils.Validator;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/booking")
public class BookingController {
    private static final Logger logger = LoggerFactory.getLogger(BookingController.class);

    @Autowired
    private BookingService bookingService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private RoomService roomService;

    @PostMapping("/book")
    public ResponseEntity<?> bookRoom(@RequestBody BookingRequest bookingRequest) {
        logger.info("Book room request");
        
        Validator validator = Validator.getInstance();
        ValidationResult validationResult = null;

        validationResult = validator.validateManipulationName(bookingRequest.getManipulationName());
        if (!validationResult.getValid()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(validationResult.getMessage()));
        }
        validationResult = validator.validateManipulationDates(bookingRequest.getStartDateTime(), bookingRequest.getEndDateTime());
        if (!validationResult.getValid()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(validationResult.getMessage()));
        }

        if (bookingRequest.getEmployeeId() == null || bookingRequest.getRoomId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Something went wrong."));
        }

        Employee employee = employeeService.getById(bookingRequest.getEmployeeId());

        if (employee == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Employee not found."));
        }

        Room room = roomService.getById(bookingRequest.getRoomId());

        if (room == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Room not found."));
        }

        if (bookingService.isCanBookAtTime(room, bookingRequest.getStartDateTime(), bookingRequest.getEndDateTime()) || bookingService.isEmployeeHaveBookingAtTime(employee, bookingRequest.getStartDateTime(), bookingRequest.getEndDateTime())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("You cant book this room at this time."));
        }

        Booking booking = Booking.builder()
                                 .startTime(bookingRequest.getStartDateTime())
                                 .endTime(bookingRequest.getEndDateTime())
                                 .manipulationName(bookingRequest.getManipulationName())
                                 .description(bookingRequest.getDescription())
                                 .employee(employee)
                                 .ended(false)
                                 .cancelled(false)
                                 .room(room)
                                 .build();

        bookingService.save(booking);

        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Room successfully booked."));
    }

    @PostMapping("/finish_book")
    public ResponseEntity<?> finishBooking(@RequestBody FinishBookingRequest finishBookingRequest) {
        logger.info("Finish book request");

        if (finishBookingRequest.getBookingId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Something went wrong."));
        }

        Booking booking = bookingService.getById(finishBookingRequest.getBookingId());

        if (booking == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Booking not found."));
        }

        if (booking.getEnded() || booking.getCancelled()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Unable to finish booking. Booking already finished or cancelled."));
        }

        if (new Date().getTime() < booking.getStartTime().getTime()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("You cannot finish your booking until it has started. If you want to cancel booking, you should click to \"Cancel\" button."));
        }

        booking.setEnded(true);
        booking.setEndTime(new Date());
        bookingService.save(booking);

        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Room booking finished successfully."));
    }

    @GetMapping("/get")
    public ResponseEntity<?> get() {
        logger.info("Get bookings request");
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getAll());
    }

    @PostMapping("/cancel_book")
    public ResponseEntity<?> cancelBooking(@RequestBody CancelBookingRequest cancelBookingRequest) {
        logger.info("Cancel booking request");

        if (cancelBookingRequest.getBookingId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Something went wrong."));
        }

        Booking booking = bookingService.getById(cancelBookingRequest.getBookingId());

        if (booking == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Booking not found."));
        }

        if (booking.getEnded() || booking.getCancelled()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Unable to cancel booking. Booking already finished or cancelled."));
        }

        booking.setCancelled(true);
        bookingService.save(booking);

        return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Room booking cancelled successfully."));
    }
}
