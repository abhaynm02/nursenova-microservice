package com.abhay.booking_service.controller;

import com.abhay.booking_service.model.Slot;
import com.abhay.booking_service.service.serviceImp.SlotServiceImp;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/booking/nurse")
public class BookingNurseController{
    private final SlotServiceImp slotServiceImp;

    public BookingNurseController(SlotServiceImp slotServiceImp) {
        this.slotServiceImp = slotServiceImp;
    }


    @PostMapping("/create/{nurseId}")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<?> createSlots(@PathVariable String nurseId,
                                         @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                         @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate endDate){
        slotServiceImp.createDailySlots(nurseId,startDate,endDate);
        return new ResponseEntity<>("slot's added successful", HttpStatus.OK);
    }
    @GetMapping("/available/slots/{nurseId}")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<List<Slot>>findSlotsByNurse(@PathVariable String nurseId){
        return new ResponseEntity<>(slotServiceImp.findAvailableSlots(nurseId),HttpStatus.OK);
    }
    @DeleteMapping("/delete/{slotId}")
    @PreAuthorize(("hasRole('ROLE_NURSE')"))
    public ResponseEntity<?>deleteSlotById(@PathVariable long slotId){
        slotServiceImp.deleteSlot(slotId);
        return new ResponseEntity<>("slot delete successfully",HttpStatus.OK);
    }


}
