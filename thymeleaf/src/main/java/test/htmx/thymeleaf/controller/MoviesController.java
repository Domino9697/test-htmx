package test.htmx.thymeleaf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import test.htmx.thymeleaf.service.MoviesService;

import static test.htmx.thymeleaf.ApplicationConstants.PAGE_SIZE;


@Controller
@RequestMapping("/movies")
public class MoviesController {
    @Autowired
    MoviesService moviesService;

    @GetMapping("/")
    public String getMovies(Model model) {
        Pageable pageable = PageRequest.of(0, PAGE_SIZE);

        model.addAttribute("page",0);
        model.addAttribute("movies", moviesService.getMovies(pageable));
        return "movies";
    }

    @GetMapping("/list")
    public String getMoviesPaginated(Model model, @RequestParam(defaultValue = "0", required = false) int page) {
        Pageable pageable = PageRequest.of(page, PAGE_SIZE);

        model.addAttribute("page", page);
        model.addAttribute("movies", moviesService.getMovies(pageable));
        return "movieList";
    }

    @GetMapping("/{movieId}")
    public String getMovie(@PathVariable String movieId, Model model) {
        model.addAttribute("movie", moviesService.getMovie(movieId));
        return "movie";
    }
}
