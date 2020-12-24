import axios from 'axios';

class EmployeeService {
    get() {
        return axios.get("http://localhost:8080/api/employee/get");
    }

    add(firstname, surname, patronymic, workPhone, position) {
        return axios.post("http://localhost:8080/api/employee/add", {
            firstname,
            surname,
            patronymic,
            workPhone,
            position
        });
    }
}

export default new EmployeeService();