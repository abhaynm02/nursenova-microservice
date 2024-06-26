package com.abhay.nurse_service.controller;

import com.abhay.nurse_service.dto.NurseDto;
import com.abhay.nurse_service.dto.RequestApproveDto;
import com.abhay.nurse_service.dto.VerificationDto;
import com.abhay.nurse_service.service.serviceImp.AdminServiceImp;
import com.abhay.nurse_service.service.serviceImp.RegisterServiceImp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/nurse/admin")
public class AdminController {

    private final RegisterServiceImp registerServiceImp;
    private final AdminServiceImp adminServiceImp;

    public AdminController(RegisterServiceImp registerServiceImp, AdminServiceImp adminServiceImp) {
        this.registerServiceImp = registerServiceImp;
        this.adminServiceImp = adminServiceImp;
    }

    @GetMapping("/verification/requests")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<RequestApproveDto>> findVerificationRequest(@RequestParam(defaultValue = "0")int page
            ,@RequestParam(defaultValue = "10")int size){
        Pageable pageable= PageRequest.of(page,size);
        return new ResponseEntity<>(registerServiceImp.findAllRequests(pageable), HttpStatus.OK);
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
    @GetMapping("/find/all/staffs")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<RequestApproveDto>>findAllStaffs(@RequestParam(defaultValue = "0")int page,
                                                                @RequestParam(defaultValue ="10")int size,
                                                                @RequestParam(defaultValue = "")String searchKey){
        Pageable pageable= PageRequest.of(page,size);
        if (!searchKey.isEmpty()){
            return new ResponseEntity<>(adminServiceImp.searchStaffs(pageable,searchKey),HttpStatus.OK);
        }
        return new ResponseEntity<>(adminServiceImp.findAllStaffs(pageable),HttpStatus.OK);
    }
    @PostMapping("/block/nurse")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String>blockOrUnblock(@RequestBody VerificationDto verificationDto){
        adminServiceImp.blockOrUnblock(verificationDto.getNurseId(),verificationDto.isStatus());
        return new ResponseEntity<>("status updated successfully ",HttpStatus.OK);
    }
}
