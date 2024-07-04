package com.abhay.nurse_service.controller;

import com.abhay.nurse_service.dto.DisplayNurseDto;
import com.abhay.nurse_service.dto.ViewNurseDto;
import com.abhay.nurse_service.service.serviceImp.UserHomeServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/register/home")
public class UserHomeController {

    private final UserHomeServiceImp userHomeServiceImp;

    public UserHomeController(UserHomeServiceImp userHomeServiceImp) {
        this.userHomeServiceImp = userHomeServiceImp;
    }
    @GetMapping("/available/locations")
    public ResponseEntity<List<String>>findAvailableLocations(){
        return new ResponseEntity<>(userHomeServiceImp.findAvailableLocations(), HttpStatus.OK);
    }
    @GetMapping("/nurses/service")
    public ResponseEntity<List<DisplayNurseDto>>getNursesByLocationAndService(@RequestParam String location,
                                                                              @RequestParam long serviceId){
        return new ResponseEntity<>(userHomeServiceImp.findByLocationAndService(location,serviceId),HttpStatus.OK);
    }


}
