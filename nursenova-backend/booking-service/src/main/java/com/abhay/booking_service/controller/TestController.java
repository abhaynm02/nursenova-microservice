package com.abhay.booking_service.controller;

import com.abhay.booking_service.dto.SlotDto;
import com.abhay.booking_service.model.Slot;
import com.abhay.booking_service.service.serviceImp.BookingServiceImp;
import com.abhay.booking_service.service.serviceImp.SlotServiceImp;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/booking")
public class TestController {
    private final SlotServiceImp slotServiceImp;
    private final BookingServiceImp bookingServiceImp;

    public TestController(SlotServiceImp slotServiceImp, BookingServiceImp bookingServiceImp) {
        this.slotServiceImp = slotServiceImp;
        this.bookingServiceImp = bookingServiceImp;
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<String>testMethod(){
        return new ResponseEntity<>("Hello user welcome to the booking", HttpStatus.ACCEPTED);
    }
    @PostMapping("/create/{nurseId}")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<?>createSlots(@PathVariable String nurseId,
                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate startDate,
                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate endDate){
        slotServiceImp.createDailySlots(nurseId,startDate,endDate);
        return new ResponseEntity<>("slot's added successful",HttpStatus.OK);
    }
    @GetMapping("/available/slots/{nurseId}")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<List<SlotDto>>findSlotsByNurse(@PathVariable String nurseId){
        return new ResponseEntity<>(slotServiceImp.findAvailableSlots(nurseId),HttpStatus.OK);
    }
    @PostMapping("/service/{nurseId}")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<?>bookService(@PathVariable String nurseId,
                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate startDate,
                                        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate endDate){
//       bookingServiceImp.placeBooking(nurseId,startDate,endDate);
        return new ResponseEntity<>("service booked  successful",HttpStatus.OK);
    }
}
