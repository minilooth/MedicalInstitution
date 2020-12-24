import axios from 'axios';

class BookingService {
    get() {
        return axios.get("http://localhost:8080/api/booking/get");
    }

    book(employeeId, roomId, startDateTime, endDateTime, manipulationName, description) {
        return axios.post("http://localhost:8080/api/booking/book", {
            employeeId,
            roomId,
            startDateTime,
            endDateTime,
            manipulationName,
            description
        })
    }

    finishBook(bookingId) {
        return axios.post("http://localhost:8080/api/booking/finish_book", {
            bookingId
        })
    }

    cancelBook(bookingId) {
        return axios.post("http://localhost:8080/api/booking/cancel_book", {
            bookingId
        })
    }
}

export default new BookingService();