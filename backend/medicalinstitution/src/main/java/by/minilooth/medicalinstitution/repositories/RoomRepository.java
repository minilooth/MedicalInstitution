package by.minilooth.medicalinstitution.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import by.minilooth.medicalinstitution.models.Room;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    public Room findFirstByNumber(String number);
}
