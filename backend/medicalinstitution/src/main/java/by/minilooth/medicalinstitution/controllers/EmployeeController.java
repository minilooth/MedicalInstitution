package by.minilooth.medicalinstitution.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import by.minilooth.medicalinstitution.models.Employee;
import by.minilooth.medicalinstitution.payload.requests.AddEmployeeRequest;
import by.minilooth.medicalinstitution.payload.responses.MessageResponse;
import by.minilooth.medicalinstitution.services.EmployeeService;
import by.minilooth.medicalinstitution.utils.ValidationResult;
import by.minilooth.medicalinstitution.utils.Validator;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/employee")
public class EmployeeController {
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);
    
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody AddEmployeeRequest addEmployeeRequest) {
        logger.info("Add employee request");

        Validator validator = Validator.getInstance();
        ValidationResult validationResult = null;

        validationResult = validator.validateFirstname(addEmployeeRequest.getFirstname());
        if (!validationResult.getValid()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(validationResult.getMessage()));
        }
        validationResult = validator.validateSurname(addEmployeeRequest.getSurname());
        if (!validationResult.getValid()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(validationResult.getMessage()));
        }
        validationResult = validator.validatePatronymic(addEmployeeRequest.getPatronymic());
        if (!validationResult.getValid()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(validationResult.getMessage()));
        }
        validationResult = validator.validateWorkPhone(addEmployeeRequest.getWorkPhone());
        if (!validationResult.getValid()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse(validationResult.getMessage()));
        }

        Employee employee = Employee.builder()
                                    .firstname(addEmployeeRequest.getFirstname())
                                    .surname(addEmployeeRequest.getSurname())
                                    .patronymic(addEmployeeRequest.getPatronymic())
                                    .workPhone(addEmployeeRequest.getWorkPhone())
                                    .position(addEmployeeRequest.getPosition())
                                    .build();

        employeeService.save(employee);

        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse("Employee successfully added."));
    }

    @GetMapping("/get")
    public ResponseEntity<?> get() {
        logger.info("Get employees request");
        return ResponseEntity.status(HttpStatus.OK).body(employeeService.getAll());
    }
}
