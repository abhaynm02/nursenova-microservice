package com.abhay.booking_service.controller;

import com.abhay.booking_service.dto.BookingRequestDto;
import com.abhay.booking_service.dto.PaymentRequest;
import com.abhay.booking_service.dto.PaymentResponse;
import com.abhay.booking_service.dto.SlotDto;
import com.abhay.booking_service.paypal.PayPalService;
import com.abhay.booking_service.service.BookingService;
import com.abhay.booking_service.service.SlotService;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking/user")
@Slf4j
public class BookingUserController {
    private final SlotService slotService;
    private final PayPalService payPalService;
    private final BookingService bookingService;

    public BookingUserController(SlotService slotService, PayPalService payPalService, BookingService bookingService) {
        this.slotService = slotService;
        this.payPalService = payPalService;
        this.bookingService = bookingService;
    }
   @GetMapping("/available/slots/{nurseId}")
   @PreAuthorize(("hasRole('ROLE_USER')"))
    public ResponseEntity<List<SlotDto>>findAvailableSlotsByNurseId(@PathVariable String nurseId){
        return new ResponseEntity<>(slotService.findAvailableSlots(nurseId),HttpStatus.OK);
    }
    @PostMapping("/payment/create")
    @PreAuthorize(("hasRole('ROLE_USER')"))
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequest paymentRequest) {
        log.info("Creating payment for request: {}", paymentRequest);
        try {
            Payment payment = payPalService.createPayment(
                    (double) paymentRequest.getTotal(),
                    paymentRequest.getCurrency(),
                    paymentRequest.getMethod(),
                    paymentRequest.getIntent(),
                    paymentRequest.getDescription(),
                    paymentRequest.getCancelUrl(),
                    paymentRequest.getSuccessUrl()
            );
            String approvalUrl = payment.getLinks().stream()
                    .filter(link -> "approval_url".equals(link.getRel()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("No approval URL found"))
                    .getHref();

            String ecToken = approvalUrl.substring(approvalUrl.lastIndexOf("EC-"));
            PaymentResponse response = new PaymentResponse(ecToken);
            return ResponseEntity.ok(response);
        } catch (PayPalRESTException e) {
            log.error("Error creating payment: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/book/service")
    @PreAuthorize(("hasRole('ROLE_USER')"))
    public ResponseEntity<?>bookService(@RequestBody BookingRequestDto requestDto){
        bookingService.placeBooking(requestDto);
        return new ResponseEntity<>("Service booked successfully",HttpStatus.OK);
    }


//    @PostMapping("/payment/execute")
//    public ResponseEntity<?> executePayment(@RequestParam("paymentId") String paymentId, @RequestParam("payerId") String payerId) {
//        log.info("Executing payment with ID: {} and Payer ID: {}", paymentId, payerId);
//        try {
//            Payment payment = payPalService.executePayment(paymentId, payerId);
//            log.info("Payment executed: {}", payment);
//            return ResponseEntity.ok("Payment successfully completed");
//        } catch (PayPalRESTException e) {
//            log.error("Error executing payment: ", e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//    }

}
