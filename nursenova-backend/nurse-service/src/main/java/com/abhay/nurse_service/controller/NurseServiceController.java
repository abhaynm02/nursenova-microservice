package com.abhay.nurse_service.controller;

import com.abhay.nurse_service.dto.ServiceAddRequest;
import com.abhay.nurse_service.dto.ServiceResponse;
import com.abhay.nurse_service.service.serviceImp.NurseServiceImp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/nurse/service")
@Slf4j
public class NurseServiceController {

    private final NurseServiceImp nurseServiceImp;

    public NurseServiceController(NurseServiceImp nurseServiceImp) {
        this.nurseServiceImp = nurseServiceImp;
    }
    @GetMapping("/select/services")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<ServiceResponse>>findSelectServices(@RequestParam String username,
                                                                   @RequestParam(defaultValue = "0")int page
                                                                 , @RequestParam(defaultValue = "5")int size,
                                                                   @RequestParam(defaultValue = "")String searchKey){
        Pageable pageable= PageRequest.of(page,size);
        if (!searchKey.isEmpty()){
            return new ResponseEntity<>(nurseServiceImp.searchServices(username,searchKey,pageable),HttpStatus.OK);
        }
        return new ResponseEntity<>(nurseServiceImp.findServices(username,pageable),HttpStatus.OK);
    }
    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<String>addService(@RequestBody ServiceAddRequest request){
        log.info("nurse Service : {}",request);
        nurseServiceImp.addService( request);
        return new ResponseEntity<>("service added successfully", HttpStatus.OK);
    }
    @PostMapping("/block")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<String>blockService(@RequestParam Long serviceId,@RequestParam boolean status){
        nurseServiceImp.blockService(serviceId,status);
        return new ResponseEntity<>("Service block successfully",HttpStatus.OK);
    }
    @GetMapping("/find-by/id")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<ServiceResponse>findServiceById(@RequestParam long serviceId){

        return new ResponseEntity<>(nurseServiceImp.findServiceById(serviceId),HttpStatus.OK);
    }

    @DeleteMapping("/delete/duty-type/{dutyId}")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<Void>deleteDutyType(@PathVariable long dutyId){
        log.info("dutyId: {}",dutyId);
        nurseServiceImp.deleteDutyType(dutyId);
        return ResponseEntity.noContent().build();
    }

}
