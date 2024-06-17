package com.abhay.nurse_service.controller;

import com.abhay.nurse_service.dto.NurseDto;
import com.abhay.nurse_service.dto.RequestApproveDto;
import com.abhay.nurse_service.dto.VerificationDto;
import com.abhay.nurse_service.service.serviceImp.RegisterServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/nurse/admin")
public class AdminController {

    private final RegisterServiceImp registerServiceImp;

    public AdminController(RegisterServiceImp registerServiceImp) {
        this.registerServiceImp = registerServiceImp;
    }

    @GetMapping("/verification/requests")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<RequestApproveDto>> findVerificationRequest(){
        return new ResponseEntity<>(registerServiceImp.findAllRequests(), HttpStatus.OK);
    }
    @PostMapping("/verify/request")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String>verifyRequest(@RequestBody VerificationDto verificationDto){
        registerServiceImp.approveRequest( verificationDto.getNurseId(),verificationDto.isStatus());
        return new ResponseEntity<>("nurse verification success",HttpStatus.OK);
    }

    @GetMapping("/find/{nurseId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<NurseDto>findNurseById(@PathVariable("nurseId")long nurseId){
        return new ResponseEntity<>(registerServiceImp.findNurse(nurseId),HttpStatus.OK);
    }

}
