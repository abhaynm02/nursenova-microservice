package com.abhay.user_service.controller;

import com.abhay.user_service.dto.PassWordUpdateDto;
import com.abhay.user_service.dto.ProfileDto;
import com.abhay.user_service.service.serviceImp.UserServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserServiceImp userServiceImp;

    public UserController(UserServiceImp userServiceImp) {
        this.userServiceImp = userServiceImp;
    }

    @GetMapping("/profile/{username}")
    public ResponseEntity<ProfileDto>getProfile(@PathVariable("username")String username){
        return new ResponseEntity<>(userServiceImp.findProfile(username), HttpStatus.OK);
    }
    @PostMapping("/profile/update")
    public ResponseEntity<String>updateProfile(@RequestBody ProfileDto profileDto){
        userServiceImp.updateProfile(profileDto);
        return new ResponseEntity<>("profile updated successfully",HttpStatus.OK);
    }
    @PostMapping("/profile/change-password")
    public ResponseEntity<String>changePassword(@RequestBody PassWordUpdateDto updateDto){
        userServiceImp.updatePassword(updateDto);
        return new ResponseEntity<>("password updated successfully",HttpStatus.OK);

    }

}
