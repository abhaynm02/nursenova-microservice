package com.abhay.nurse_service.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/nurse")
@Slf4j
public class NurseController {
    @GetMapping("/manage")
    @PreAuthorize("hasRole('ROLE_NURSE')")
     public ResponseEntity<String>manageSystem(){
         log.info("Nurse accessed manage system at {}", LocalDateTime.now());
         return new ResponseEntity<>("Hello nurse", HttpStatus.OK);
     }

}
