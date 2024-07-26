package com.abhay.nurse_service.controller;

import com.abhay.nurse_service.dto.NurseDto;
import com.abhay.nurse_service.service.ProfileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/nurse/booking")
@Slf4j
public class BookingFeignController {
   private final ProfileService profileService;

    public BookingFeignController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/view/nurse/{nurseId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<NurseDto>findNurseForViewBooking(@PathVariable String nurseId){
        log.info("request entered in feign controller ");
        return new ResponseEntity<>(profileService.findProfileDetails(nurseId), HttpStatus.OK);
    }
}
