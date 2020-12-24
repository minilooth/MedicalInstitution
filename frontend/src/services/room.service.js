import axios from 'axios';

class RoomService {
    get() {
        return axios.get("http://localhost:8080/api/room/get");
    }

    add(roomNumber, roomType, haveComputer, haveElectronicScoreboard) {
        return axios.post("http://localhost:8080/api/room/add", {
            roomNumber,
            roomType,
            haveComputer,
            haveElectronicScoreboard
        })
    }
}

export default new RoomService();