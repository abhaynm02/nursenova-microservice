package com.abhay.nurse_service.controller;

import com.abhay.nurse_service.dto.ImageLink;
import com.abhay.nurse_service.dto.NurseDto;
import com.abhay.nurse_service.dto.NurseRequest;
import com.abhay.nurse_service.model.Nurse;
import com.abhay.nurse_service.service.serviceImp.RegisterServiceImp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/register")
@Slf4j
public class RegisterController {

    private final RegisterServiceImp registerService;

    public RegisterController(RegisterServiceImp registerService) {
        this.registerService = registerService;
    }

    @PostMapping("/details")
    public ResponseEntity<String> registerNurseDetails(@RequestPart("user")NurseRequest request,
                                                       @RequestPart("profile")MultipartFile profile,
                                                       @RequestPart("certificate")MultipartFile certificate) throws IOException {
        log.info("successfully hit register end point ");
        log.info( "nurse details:{}",request);
        log.info("profilePictureName:{}",profile.getOriginalFilename());
        log.info("certificateName:{}",certificate.getOriginalFilename());
        registerService.updateNurseDetails(request,profile,certificate);

        return new ResponseEntity<>("please wait we are working on it", HttpStatus.OK);

    }
   @GetMapping("/all")
    public ResponseEntity<List<NurseDto>>findAllNurses(){
        return  new ResponseEntity<>(registerService.findAllNurses(),HttpStatus.OK);
   }
}
