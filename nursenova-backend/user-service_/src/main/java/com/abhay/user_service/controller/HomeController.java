package com.abhay.user_service.controller;

import com.abhay.user_service.dto.ServiceResponse;
import com.abhay.user_service.service.serviceImp.ServicesImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {
    private final ServicesImp servicesImp;

    public HomeController(ServicesImp servicesImp) {
        this.servicesImp = servicesImp;
    }

    @GetMapping("/services")
    public ResponseEntity<List<ServiceResponse>>findAllActiveServices(){
        return new ResponseEntity<>(  servicesImp.findAllActiveServices(), HttpStatus.OK);
    }
}
