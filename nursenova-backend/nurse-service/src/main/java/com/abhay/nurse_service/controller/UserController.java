package com.abhay.nurse_service.controller;

import com.abhay.nurse_service.dto.CheckoutResponse;
import com.abhay.nurse_service.dto.ViewNurseDto;
import com.abhay.nurse_service.service.NurseServiceI;
import com.abhay.nurse_service.service.serviceImp.UserHomeServiceImp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/nurse/home")
@Slf4j
public class UserController {
    private final UserHomeServiceImp userHomeServiceImp;
    private final NurseServiceI nurseServiceI;

    public UserController(UserHomeServiceImp userHomeServiceImp, NurseServiceI nurseServiceI) {
        this.userHomeServiceImp = userHomeServiceImp;
        this.nurseServiceI = nurseServiceI;
    }


    @GetMapping("/view/nurse")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<ViewNurseDto> viewNurseForBooking(@RequestParam String userId,
                                                            @RequestParam long serviceId){
        return new ResponseEntity<>(userHomeServiceImp.findNurseForBooking(userId,serviceId), HttpStatus.OK);
    }
    @GetMapping("/checkout")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<CheckoutResponse>checkoutDetails(@RequestParam String nurseId,
                                                           @RequestParam long serviceId,@RequestParam long totalDays){
        log.info("totalDays{}",totalDays);
        return new ResponseEntity<>(nurseServiceI.checkoutDetails(nurseId,serviceId,totalDays),HttpStatus.OK);
    }
}
