package by.minilooth.medicalinstitution.utils;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ValidationResult {
    String message;
    Boolean valid;
}
