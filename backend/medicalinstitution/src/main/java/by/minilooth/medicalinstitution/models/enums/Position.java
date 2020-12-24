package by.minilooth.medicalinstitution.models.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.NUMBER_INT)
public enum Position {
    NURSE,
    OBSTETRICIAN,
    SURGEON,
    ENDOCRINOLOGIST,
    NEUROLOGIST,
    NEUROSURGEON,
    ONCOLOGIST,
    OPHTHALMOLOGIST,
    PEDIATRICIAN,
    PSYCHIATRIST,
    DENTIST,
    THERAPIST
}
