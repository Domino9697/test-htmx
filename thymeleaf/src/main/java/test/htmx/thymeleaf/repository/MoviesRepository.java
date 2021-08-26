package test.htmx.thymeleaf.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import test.htmx.thymeleaf.models.Movie;

public interface MoviesRepository extends MongoRepository<Movie,String> {
}
