package by.minilooth.medicalinstitution.utils;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import lombok.Data;

@Data
public class Validator {
    public final static Integer ROOM_NUMBER_MIN_LENGTH = 2;
    public final static Integer ROOM_NUMBER_MAX_LENGTH = 4;
    public final static Integer FIRSTNAME_MIN_LENGTH = 2;
    public final static Integer FIRSTNAME_MAX_LENGTH = 30;
    public final static Integer SURNAME_MIN_LENGTH = 2;
    public final static Integer SURNAME_MAX_LENGTH = 30;
    public final static Integer PATRONYMIC_MIN_LENGTH = 2;
    public final static Integer PATRONYMIC_MAX_LENGTH = 30;
    public final static Integer WORK_PHONE_LENGTH = 17;  
    public final static Integer MANIPULATION_NAME_MIN_LENGTH = 5;
    public final static Integer MANIPULATION_NAME_MAX_LENGTH = 255;

    private static Validator instance;

    private Validator() {}

    public static Validator getInstance() {
        if (instance == null) {
            instance = new Validator();
        }
        return instance;
    }

    public ValidationResult validateRoomNumber(String roomNumber) {
        if (roomNumber == null || roomNumber.isEmpty() || roomNumber.isBlank()) {
            return new ValidationResult("Room number cannot be empty.", false);
        }
        if (roomNumber.length() < ROOM_NUMBER_MIN_LENGTH || roomNumber.length() > ROOM_NUMBER_MAX_LENGTH) {
            return new ValidationResult(String.format("Room number length should be between %d and %d symbols.", ROOM_NUMBER_MIN_LENGTH, ROOM_NUMBER_MAX_LENGTH), false);
        }
        if (!roomNumber.matches("^[0-9]{2,3}[A-Za-zА-Яа-я]{0,1}$")) {
            return new ValidationResult("Room number should consists only of digits and letters.", false);
        }
        return new ValidationResult(null, true);
    }

    public ValidationResult validateFirstname(String firstname) {
        if (firstname == null || firstname.isEmpty() || firstname.isBlank()) {
            return new ValidationResult("Firstname cannot be empty.", false);
        }
        if (firstname.length() < FIRSTNAME_MIN_LENGTH || firstname.length() > FIRSTNAME_MAX_LENGTH) {
            return new ValidationResult(String.format("Firstname length should be between %d and %d symbols.", FIRSTNAME_MIN_LENGTH, FIRSTNAME_MAX_LENGTH), false);
        }
        if (!firstname.matches("^[A-Za-zА-Яа-я]+$")) {
            return new ValidationResult("Firstname should constists only of letters.", false);
        }
        return new ValidationResult(null, true);
    }

    public ValidationResult validateSurname(String surname) {
        if (surname == null || surname.isEmpty() || surname.isBlank()) {
            return new ValidationResult("Surname cannot be empty.", false);
        }
        if (surname.length() < SURNAME_MIN_LENGTH || surname.length() > SURNAME_MAX_LENGTH) {
            return new ValidationResult(String.format("Surname length should be between %d and %d symbols.", SURNAME_MIN_LENGTH, SURNAME_MAX_LENGTH), false);
        }
        if (!surname.matches("^[A-Za-zА-Яа-я]+$")) {
            return new ValidationResult("Surname should consists only of letters.", false);
        }
        return new ValidationResult(null, true);
    }

    public ValidationResult validatePatronymic(String patronymic) {
        if (patronymic == null || patronymic.isEmpty() || patronymic.isBlank()) {
            return new ValidationResult("Patronymic cannot be empty.", false);
        }
        if (patronymic.length() < PATRONYMIC_MIN_LENGTH || patronymic.length() > PATRONYMIC_MAX_LENGTH) {
            return new ValidationResult(String.format("Patronymic length should be between %d and %d symbols.", PATRONYMIC_MIN_LENGTH, PATRONYMIC_MAX_LENGTH), false);
        }
        if (!patronymic.matches("^[A-Za-zА-Яа-я]+$")) {
            return new ValidationResult("Patronymic should consists only of letters.", false);
        }
        return new ValidationResult(null, true);
    }

    public ValidationResult validateWorkPhone(String workPhone) {
        if (workPhone == null || workPhone.isEmpty() || workPhone.isBlank()) {
            return new ValidationResult("Work phone cannot be empty.", false);
        }
        if (workPhone.length() != WORK_PHONE_LENGTH) {
            return new ValidationResult(String.format("Work phone length should be %d.", WORK_PHONE_LENGTH), false);
        }
        if (!workPhone.matches("^[+]{1}[3]{1}[7]{1}[5]{1}[(]{1}[0-9]{2}[)]{1}[-\\s/0-9]{9}$")) {
            return new ValidationResult("Work phone should match template +375(12)345-67-89.", false);
        }
        return new ValidationResult(null, true);
    }

    public ValidationResult validateManipulationName(String manipulationName) {
        if (manipulationName == null || manipulationName.isEmpty() || manipulationName.isBlank()) {
            return new ValidationResult("Manipulation name cannot be empty.", false);
        }
        if (manipulationName.length() < MANIPULATION_NAME_MIN_LENGTH || manipulationName.length() > MANIPULATION_NAME_MAX_LENGTH) {
            return new ValidationResult(String.format("Manipulation name length should be between %d and %d symbols.", MANIPULATION_NAME_MIN_LENGTH, MANIPULATION_NAME_MAX_LENGTH), false);
        }
        if (!manipulationName.matches("^[A-Za-zА-Яа-я0-9., \"()-№;:-]+$")) {
            return new ValidationResult("Manipulation name should consists of digits, letters and symbols \".-, \"()-№;:\".", false);
        }
        return new ValidationResult(null, true);
    }

    public ValidationResult validateManipulationDates(Date firstDate, Date secondDate) {
        if (firstDate.getTime() < Instant.now().truncatedTo(ChronoUnit.DAYS).getEpochSecond() * 1000 || secondDate.getTime() < Instant.now().truncatedTo(ChronoUnit.DAYS).getEpochSecond() * 1000) {
            return new ValidationResult("Manipulation times cannot be at past", false);
        }
        if (secondDate.before(firstDate)) {
            return new ValidationResult("Manipulation end time cannot be after manipulation start time.", false);
        }
        return new ValidationResult(null, true);
    }
}
