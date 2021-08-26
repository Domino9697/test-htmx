package test.htmx.thymeleaf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import test.htmx.thymeleaf.service.MoviesService;

import static test.htmx.thymeleaf.ApplicationConstants.PAGE_SIZE;

@Controller
public class IndexController {
    @Autowired
    MoviesService moviesService;

    @GetMapping(value={"/home","/"})
    public String index(Model model) {
        Pageable pageable = PageRequest.of(0,PAGE_SIZE);

        model.addAttribute("page", 0);
        model.addAttribute("movies", moviesService.getMovies(pageable));
        return "home";
    }
}
