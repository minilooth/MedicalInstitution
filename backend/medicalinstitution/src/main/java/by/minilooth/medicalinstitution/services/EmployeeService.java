package by.minilooth.medicalinstitution.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.minilooth.medicalinstitution.models.Employee;
import by.minilooth.medicalinstitution.repositories.EmployeeRepository;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Transactional
    public void save(Employee employee) {
        employeeRepository.save(employee);
    }

    @Transactional
    public void delete(Employee employee) {
        employeeRepository.delete(employee);
    }

    @Transactional
    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    @Transactional
    public Employee getById(Integer id) {
        return employeeRepository.findById(id).orElse(null);
    }
}
