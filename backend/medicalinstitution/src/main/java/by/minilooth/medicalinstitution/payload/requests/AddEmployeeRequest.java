package by.minilooth.medicalinstitution.payload.requests;

import by.minilooth.medicalinstitution.models.enums.Position;
import lombok.Data;

@Data
public class AddEmployeeRequest {
    private String firstname;
    private String surname;
    private String patronymic;
    private String workPhone;
    private Position position;
}
