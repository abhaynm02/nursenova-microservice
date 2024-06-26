package com.abhay.nurse_service.controller;

import com.abhay.nurse_service.dto.NurseDto;
import com.abhay.nurse_service.dto.ProfileDto;
import com.abhay.nurse_service.service.serviceImp.NurseServiceImp;
import com.abhay.nurse_service.service.serviceImp.ProfileServiceImp;
import com.abhay.nurse_service.service.serviceImp.RegisterServiceImp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/nurse")
@Slf4j
public class NurseController {
    private final RegisterServiceImp registerServiceImp;
    private final ProfileServiceImp profileServiceImp;
    private final NurseServiceImp nurseServiceImp;

    public NurseController(RegisterServiceImp registerServiceImp, ProfileServiceImp profileServiceImp, NurseServiceImp nurseServiceImp) {
        this.registerServiceImp = registerServiceImp;
        this.profileServiceImp = profileServiceImp;
        this.nurseServiceImp = nurseServiceImp;
    }

     @PostMapping("/profile/update")
     @PreAuthorize("hasRole('ROLE_NURSE')")
     public ResponseEntity<Boolean>updateProfile(@RequestBody ProfileDto profileDto){
        return new ResponseEntity<>(profileServiceImp.updateProfile(profileDto),HttpStatus.OK);
     }
     @GetMapping("/profile/details/{username}")
     @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<NurseDto>findNurseProfile(@PathVariable("username")String username){
        return new ResponseEntity<>(profileServiceImp.findProfileDetails(username),HttpStatus.OK);
     }


}
