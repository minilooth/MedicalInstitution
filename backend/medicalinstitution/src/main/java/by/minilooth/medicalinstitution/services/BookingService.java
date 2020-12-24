package by.minilooth.medicalinstitution.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.minilooth.medicalinstitution.models.Booking;
import by.minilooth.medicalinstitution.models.Employee;
import by.minilooth.medicalinstitution.models.Room;
import by.minilooth.medicalinstitution.repositories.BookingRepository;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Transactional
    public void save(Booking booking) {
        bookingRepository.save(booking);
    }

    @Transactional
    public void delete(Booking booking) {
        bookingRepository.delete(booking);
    }

    @Transactional
    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }

    @Transactional
    public List<Booking> getAllNotEndedAndNotCancelled() {
        return bookingRepository.findAllByEndedAndCancelled(false, false);
    }

    @Transactional
    public Booking getById(Integer id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @Transactional
    public List<Booking> getNotCancelledBookingsByEmployee(Employee employee) {
        return bookingRepository.findAllByEmployeeAndCancelled(employee, false);
    }

    @Transactional
    public List<Booking> getNotCancelledBookingsByRoom(Room room) {
        return bookingRepository.findAllByRoomAndCancelled(room, false);
    }

    public Boolean isCanBookAtTime(Room room, Date startTime, Date endTime) {
        List<Booking> bookings = getNotCancelledBookingsByRoom(room);

        for (Booking booking : bookings) {
            if (startTime.getTime() > booking.getStartTime().getTime() && startTime.getTime() < booking.getEndTime().getTime()) {
                return true;
            }
            if (endTime.getTime() > booking.getStartTime().getTime() && endTime.getTime() < booking.getEndTime().getTime()) {
                return true;
            }
        }

        return false;
    }

    public Boolean isEmployeeHaveBookingAtTime(Employee employee, Date startTime, Date endTime) {
        List<Booking> bookings = getNotCancelledBookingsByEmployee(employee);

        for (Booking booking : bookings) {
            if (startTime.getTime() > booking.getStartTime().getTime() && startTime.getTime() < booking.getEndTime().getTime()) {
                return true;
            }
            if (endTime.getTime() > booking.getStartTime().getTime() && endTime.getTime() < booking.getEndTime().getTime()) {
                return true;
            }
        }

        return false;
    }
}
