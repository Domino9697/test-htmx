package test.htmx.thymeleaf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import test.htmx.thymeleaf.config.MongoConfig;
import test.htmx.thymeleaf.service.MoviesService;

@SpringBootApplication
public class ThymeleafApplication {
	public static void main(String[] args) {
		SpringApplication.run(ThymeleafApplication.class, args);
	}
}
