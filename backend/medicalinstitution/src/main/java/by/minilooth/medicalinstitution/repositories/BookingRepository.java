package by.minilooth.medicalinstitution.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import by.minilooth.medicalinstitution.models.Booking;
import by.minilooth.medicalinstitution.models.Employee;
import by.minilooth.medicalinstitution.models.Room;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    public List<Booking> findAllByEmployeeAndCancelled(Employee employee, Boolean cancelled); 
    public List<Booking> findAllByRoomAndCancelled(Room room, Boolean cancelled);
    public List<Booking> findAllByEndedAndCancelled(Boolean ended, Boolean cancelled);
}
