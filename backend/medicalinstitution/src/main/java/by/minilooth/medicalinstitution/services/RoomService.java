package by.minilooth.medicalinstitution.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.minilooth.medicalinstitution.models.Room;
import by.minilooth.medicalinstitution.repositories.RoomRepository;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Transactional
    public void save(Room room) {
        roomRepository.save(room);
    }

    @Transactional
    public void delete(Room room) {
        roomRepository.delete(room);
    }

    @Transactional
    public List<Room> getAll() {
        return roomRepository.findAll();
    }

    @Transactional
    public Room getById(Integer id) {
        return roomRepository.findById(id).orElse(null);
    }

    @Transactional
    public Room getByNumber(String number) {
        return roomRepository.findFirstByNumber(number);
    }
}
