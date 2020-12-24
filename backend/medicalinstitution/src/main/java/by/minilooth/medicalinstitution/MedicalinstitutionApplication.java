package by.minilooth.medicalinstitution;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import by.minilooth.medicalinstitution.services.InitializationService;

@SpringBootApplication
@EnableAsync
@EnableTransactionManagement
@EnableJpaRepositories
public class MedicalinstitutionApplication {

	public static void main(String[] args) {
		ApplicationContext applicationContext = SpringApplication.run(MedicalinstitutionApplication.class, args);

		InitializationService initializationService = applicationContext.getBean(InitializationService.class);
		initializationService.initialize();
	}

}
