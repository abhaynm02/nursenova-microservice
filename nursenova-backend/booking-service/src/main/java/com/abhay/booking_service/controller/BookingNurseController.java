package com.abhay.booking_service.controller;

import com.abhay.booking_service.dto.BookingResponse;
import com.abhay.booking_service.dto.SlotDto;
import com.abhay.booking_service.dto.ViewBooking;
import com.abhay.booking_service.exceptions.coustomexceptions.BookingNotFoundException;
import com.abhay.booking_service.model.BookingStatus;
import com.abhay.booking_service.service.BookingService;
import com.abhay.booking_service.service.serviceImp.SlotServiceImp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private final BookingService bookingService;

    public BookingNurseController(SlotServiceImp slotServiceImp, BookingService bookingService) {
        this.slotServiceImp = slotServiceImp;
        this.bookingService = bookingService;
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
    public ResponseEntity<List<SlotDto>>findSlotsByNurse(@PathVariable String nurseId){
        return new ResponseEntity<>(slotServiceImp.findAvailableSlotsForNurse(nurseId),HttpStatus.OK);
    }
    @DeleteMapping("/delete/{slotId}")
    @PreAuthorize(("hasRole('ROLE_NURSE')"))
    public ResponseEntity<?>deleteSlotById(@PathVariable long slotId){
        slotServiceImp.deleteSlot(slotId);
        return new ResponseEntity<>("slot delete successfully",HttpStatus.OK);
    }
    @GetMapping("/find/bookings/{nurseId}")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<Page<BookingResponse>>findBookingsByNurseId(@PathVariable String nurseId,
                                                                      @RequestParam(defaultValue = "0")int page,
                                                                      @RequestParam(defaultValue = "5")int size){
      Pageable pageable =PageRequest.of(page,size,Sort.by("id").descending());


        return new ResponseEntity<>(bookingService.findBookingsForNurse(pageable,nurseId),HttpStatus.OK);
    }

    @GetMapping("/find/booking/{bookingId}")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<ViewBooking>findBookingById(@PathVariable long bookingId){
        return new ResponseEntity<>(bookingService.findByBookingId(bookingId),HttpStatus.OK);
    }
    @PatchMapping("/update/booking/status/{bookingId}")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<String> updateBookingStatus(@PathVariable long bookingId, @RequestParam  BookingStatus status) {
        try {
            bookingService.updateBookingStatus(bookingId, status);
            return ResponseEntity.ok("Booking status updated successfully");
        } catch (BookingNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the booking status");
        }
    }
}
