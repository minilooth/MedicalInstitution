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

import by.minilooth.medicalinstitution.models.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@Entity
@Table(name = "room")
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Column(name = "Number", nullable = false, length = 4, unique = true)
    private String number;

    @Column(name = "Type", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private RoomType type;

    @Column(name = "HaveComputer", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean haveComputer;

    @Column(name = "HaveElectornicScoreboard", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean haveElectronicScoreboard;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Booking> bookings;
}
