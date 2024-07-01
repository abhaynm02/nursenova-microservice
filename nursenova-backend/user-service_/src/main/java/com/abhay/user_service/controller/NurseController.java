package com.abhay.user_service.controller;

import com.abhay.user_service.dto.ProfileDto;
import com.abhay.user_service.dto.ServiceResponse;
import com.abhay.user_service.service.serviceImp.NurseServiceImp;
import com.abhay.user_service.service.serviceImp.UserServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('NURSE')")
@RequestMapping("/user/nurse")
public class NurseController {
    private final UserServiceImp userServiceImp;
    private final NurseServiceImp nurseServiceImp;

    public NurseController(UserServiceImp userServiceImp, NurseServiceImp nurseServiceImp) {
        this.userServiceImp = userServiceImp;
        this.nurseServiceImp = nurseServiceImp;
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable("username")String username){
        return new ResponseEntity<>(userServiceImp.findProfile(username), HttpStatus.OK);
    }

    @PostMapping("/profile/update")
    public ResponseEntity<String>updateProfile(@RequestBody ProfileDto profileDto){
        nurseServiceImp.updateProfile(profileDto);
        return new ResponseEntity<>("Profile Updated successfully",HttpStatus.OK);
    }
    @GetMapping("/show/services")
    public ResponseEntity<List<ServiceResponse>>findAllServices(){
        return new ResponseEntity<>(nurseServiceImp.findServicesForNurseSelecting(),HttpStatus.OK);
    }

}
