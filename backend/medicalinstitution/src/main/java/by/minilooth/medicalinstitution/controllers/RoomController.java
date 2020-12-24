package by.minilooth.medicalinstitution.controllers;

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

import by.minilooth.medicalinstitution.models.Room;
import by.minilooth.medicalinstitution.payload.requests.AddRoomRequest;
import by.minilooth.medicalinstitution.payload.responses.MessageResponse;
import by.minilooth.medicalinstitution.services.RoomService;
import by.minilooth.medicalinstitution.utils.ValidationResult;
import by.minilooth.medicalinstitution.utils.Validator;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/room")
public class RoomController {
    private static final Logger logger = LoggerFactory.getLogger(RoomController.class);
    
    @Autowired
    private RoomService roomService;

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody AddRoomRequest addRoomRequest) {
        logger.info("Add room request");

        ValidationResult validationResult = Validator.getInstance().validateRoomNumber(addRoomRequest.getRoomNumber());
        if (!validationResult.getValid()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(validationResult.getMessage()));
        }

        Room room = roomService.getByNumber(addRoomRequest.getRoomNumber());
        
        if (room != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Room with this room number already exists."));
        } 

        room = Room.builder()
                        .type(addRoomRequest.getRoomType())
                        .number(addRoomRequest.getRoomNumber())
                        .haveComputer(addRoomRequest.getHaveComputer())
                        .haveElectronicScoreboard(addRoomRequest.getHaveElectronicScoreboard())
                        .build();

        roomService.save(room);

        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse("Room successfully added"));
    }

    @GetMapping("/get")
    public ResponseEntity<?> get() {
        logger.info("Get rooms request");
        return ResponseEntity.status(HttpStatus.OK).body(roomService.getAll()); 
    }
}
