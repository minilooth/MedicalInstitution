package by.minilooth.medicalinstitution.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@Entity
@Table(name = "booking")
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private Integer id;

    @Column(name = "StartTime", nullable = false)
    private Date startTime;

    @Column(name = "EndTime", nullable = false)
    private Date endTime;

    @Column(name = "ManipulationName", nullable = false)
    private String manipulationName;

    @Column(name = "Description", columnDefinition = "LONGTEXT")
    private String description;

    @Column(name = "Ended", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean ended;

    @Column(name = "Cancelled", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean cancelled;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "EmployeeId", nullable = false)
    private Employee employee;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "RoomId", nullable = false)
    private Room room;
}
