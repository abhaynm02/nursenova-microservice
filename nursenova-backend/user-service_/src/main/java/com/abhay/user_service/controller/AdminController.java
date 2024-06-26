package com.abhay.user_service.controller;

import com.abhay.user_service.dto.AllUserResponse;
import com.abhay.user_service.dto.ServiceAddRequest;
import com.abhay.user_service.dto.ServiceResponse;
import com.abhay.user_service.dto.UserBlockRequestDto;
import com.abhay.user_service.service.serviceImp.AdminServiceImp;
import com.abhay.user_service.service.serviceImp.ServicesImp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final ServicesImp servicesImp;
    private final AdminServiceImp adminServiceImp;

    public AdminController(ServicesImp servicesImp, AdminServiceImp adminServiceImp) {
        this.servicesImp = servicesImp;
        this.adminServiceImp = adminServiceImp;
    }

    @PostMapping("/services/add-services")
    public ResponseEntity<?> addServices(@RequestBody ServiceAddRequest request) {
        servicesImp.addServices(request);
        return new ResponseEntity<>("service added successfully", HttpStatus.CREATED);

    }

    @GetMapping("/services")
    public ResponseEntity<Page<ServiceResponse>> findAllServices(@RequestParam(defaultValue = "0")int page,
                                                                 @RequestParam(defaultValue = "5")int size,
                                                                 @RequestParam(defaultValue ="") String searchKey,
                                                                 @RequestParam(defaultValue = "")String key) {

        Pageable pageable = null;
        if(key.equals("asc")){
             pageable=PageRequest.of(page,size, Sort.by("basePrice").ascending());

        }else if (key.equals("des")){
            pageable=PageRequest.of(page,size,Sort.by("basePrice").descending());
        }else {
            pageable=PageRequest.of(page,size);
        }
        if (!searchKey.isEmpty()){
            return new ResponseEntity<>(servicesImp.searchServices(pageable,searchKey),HttpStatus.OK);
        }
        return new ResponseEntity<>(servicesImp.findAllServices(pageable), HttpStatus.OK);
    }

    @GetMapping("/service/{service-id}")
    public ResponseEntity<ServiceResponse> findServiceById(@PathVariable("service-id") long id) {
        ServiceResponse serviceResponse = servicesImp.findServiceById(id);
        if (serviceResponse != null) {
            return new ResponseEntity<>(serviceResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/service/edit-service")
    public ResponseEntity<?>editService(@RequestBody ServiceResponse serviceResponse){
        servicesImp.editServices(serviceResponse.getId(),serviceResponse);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping("/service/block")
    public ResponseEntity<?>blockOrUnblock(@RequestBody ServiceResponse serviceResponse){
        servicesImp.blockServices(serviceResponse.getId(),serviceResponse.isStatus());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/all-users")
    public ResponseEntity<Page<AllUserResponse>>findAllUsers(@RequestParam(defaultValue = "0")int page,
                                                             @RequestParam(defaultValue = "5")int size,
                                                             @RequestParam(defaultValue = "")String searchKey){
        Pageable pageable= PageRequest.of(page, size);
        if (!searchKey.isEmpty()){
            return new ResponseEntity<>(adminServiceImp.searchUsers(pageable,searchKey),HttpStatus.OK);
        }

        return new ResponseEntity<>(adminServiceImp.findAllUsers(pageable),HttpStatus.OK) ;
    }

    @PostMapping("/user/block")
    public ResponseEntity<?>blockOrUnblockUser(@RequestBody AllUserResponse allUserResponse){
        adminServiceImp.blockUser(allUserResponse.getId(),allUserResponse.isStatus());
        return new ResponseEntity<>(HttpStatus.OK);
    }

  @PostMapping("/nurse/block")
    public ResponseEntity<Boolean>blockOrUnblockNurse(@RequestBody UserBlockRequestDto allUserResponse){

        return new ResponseEntity<>(adminServiceImp.blockNurse(allUserResponse.getUsername(),allUserResponse.isStatus()),HttpStatus.OK);
  }
}
