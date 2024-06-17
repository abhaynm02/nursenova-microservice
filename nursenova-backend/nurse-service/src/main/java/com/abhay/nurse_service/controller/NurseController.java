package com.abhay.nurse_service.controller;

import com.abhay.nurse_service.dto.RequestApproveDto;
import com.abhay.nurse_service.service.serviceImp.RegisterServiceImp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/nurse")
@Slf4j
public class NurseController {
    private final RegisterServiceImp registerServiceImp;

    public NurseController(RegisterServiceImp registerServiceImp) {
        this.registerServiceImp = registerServiceImp;
    }

    @GetMapping("/manage")
    @PreAuthorize("hasRole('ROLE_NURSE')")
     public ResponseEntity<String>manageSystem(){
         log.info("Nurse accessed manage system at {}", LocalDateTime.now());
         return new ResponseEntity<>("Hello nurse", HttpStatus.OK);
     }
     @GetMapping("/register/details")
    public ResponseEntity<String>registerNurseDetails(){
        log.info("successfully hit register end point ");
        return new ResponseEntity<>("please wait we are working on it",HttpStatus.OK);

     }


}
