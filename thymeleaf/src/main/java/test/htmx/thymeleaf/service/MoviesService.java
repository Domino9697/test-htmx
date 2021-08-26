package test.htmx.thymeleaf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import test.htmx.thymeleaf.models.Movie;
import test.htmx.thymeleaf.repository.MoviesRepository;

@Service
public class MoviesService {
    @Autowired
    private MoviesRepository moviesRepository;

    public Movie getMovie(String id) {
        return moviesRepository.findById(id).orElse(null);
    }

    public Page<Movie> getMovies(Pageable pageable) {
        return moviesRepository.findAll(pageable);
    }

}
