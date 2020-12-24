package by.minilooth.medicalinstitution.payload.requests;

import java.util.Date;

import lombok.Data;

@Data
public class BookingRequest {
    private Integer employeeId;
    private Integer roomId;
    private Date startDateTime;
    private Date endDateTime;
    private String manipulationName;
    private String description;
}
