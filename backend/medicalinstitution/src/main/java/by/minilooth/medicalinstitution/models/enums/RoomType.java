package by.minilooth.medicalinstitution.models.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.NUMBER_INT)
public enum RoomType {
    OPERATING,
    PREOPERATIVE,
    CHILDRENS_WARD,
    PREMATURE_AND_INJURED_BABIES_WARD,
    DRESSING,
    INTENSIVE_CARE_WARD,
    LABARATORY,
    BLOOD_TRANSFUSION_STATION
}
