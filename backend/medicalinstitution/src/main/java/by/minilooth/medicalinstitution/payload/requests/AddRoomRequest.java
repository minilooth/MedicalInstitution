package by.minilooth.medicalinstitution.payload.requests;

import by.minilooth.medicalinstitution.models.enums.RoomType;
import lombok.Data;

@Data
public class AddRoomRequest {
    private String roomNumber;
    private RoomType roomType;
    private Boolean haveComputer;
    private Boolean haveElectronicScoreboard;
}
