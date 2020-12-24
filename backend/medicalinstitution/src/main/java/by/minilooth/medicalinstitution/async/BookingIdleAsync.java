package by.minilooth.medicalinstitution.async;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import by.minilooth.medicalinstitution.models.Booking;
import by.minilooth.medicalinstitution.services.BookingService;

@Component
public class BookingIdleAsync {
    private static final Logger logger = LoggerFactory.getLogger(BookingIdleAsync.class);

    @Autowired
    private BookingService bookingService;

    private Boolean working = false;

    @Async
    public void runAsync() {
        if (!working) {
            working = true;
            idleAsync();
        }
    }

    @Async
    private void idleAsync() {
        logger.info("Booking idler started");
        
        while(true) {
            List<Booking> bookings = bookingService.getAllNotEndedAndNotCancelled();
            Date currentDate = new Date();

            for (Booking booking : bookings) {
                if (booking.getEndTime().getTime() < currentDate.getTime()) {
                    booking.setEnded(true);
                }

                bookingService.save(booking);
            }

            try {
                Thread.sleep(60000);
            }
            catch (InterruptedException ex) {
                logger.info("Booking idler stopped: " + ex.getMessage());
            }
        }
    }
}
