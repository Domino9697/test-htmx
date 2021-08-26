package test.htmx.thymeleaf.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import test.htmx.thymeleaf.models.Genre;

public interface GenresRepository extends MongoRepository<Genre, String> {
}
