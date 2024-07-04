package com.abhay.nurse_service.controller;

import com.abhay.nurse_service.dto.ViewNurseDto;
import com.abhay.nurse_service.service.serviceImp.UserHomeServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/nurse/home")
public class UserController {
    private final UserHomeServiceImp userHomeServiceImp;

    public UserController(UserHomeServiceImp userHomeServiceImp) {
        this.userHomeServiceImp = userHomeServiceImp;
    }


    @GetMapping("/view/nurse")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ViewNurseDto> viewNurseForBooking(@RequestParam String userId,
                                                            @RequestParam long serviceId){
        return new ResponseEntity<>(userHomeServiceImp.findNurseForBooking(userId,serviceId), HttpStatus.OK);
    }
}
