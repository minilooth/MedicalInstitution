package by.minilooth.medicalinstitution.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import by.minilooth.medicalinstitution.async.BookingIdleAsync;
import lombok.SneakyThrows;

@Service
public class InitializationService {
    @Autowired
    private BookingIdleAsync bookingIdleAsync;

    @SneakyThrows
    public void initialize() {
        bookingIdleAsync.runAsync();
    }
}
