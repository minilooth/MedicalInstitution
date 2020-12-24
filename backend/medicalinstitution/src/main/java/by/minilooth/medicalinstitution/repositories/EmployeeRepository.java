package by.minilooth.medicalinstitution.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import by.minilooth.medicalinstitution.models.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    
}
