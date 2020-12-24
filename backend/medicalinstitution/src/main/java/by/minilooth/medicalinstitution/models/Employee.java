package by.minilooth.medicalinstitution.models;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import by.minilooth.medicalinstitution.models.enums.Position;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@Entity
@Table(name = "employee")
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Column(name = "Firstname", nullable = false, length = 30)
    private String firstname;

    @Column(name = "Surname", nullable = false, length = 30)
    private String surname;

    @Column(name = "Patronymic", nullable = false, length = 30)
    private String patronymic;

    @Column(name = "WorkPhone", nullable = false, length = 17)
    private String workPhone;

    @Column(name = "Position", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private Position position;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "employee", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Booking> bookings;
}
