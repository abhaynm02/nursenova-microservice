package com.abhay.booking_service.service.serviceImp;

import com.abhay.booking_service.dto.*;
import com.abhay.booking_service.exceptions.coustomexceptions.BookingNotFoundException;
import com.abhay.booking_service.feignclient.NurseClient;
import com.abhay.booking_service.model.Booking;
import com.abhay.booking_service.repository.BookingRepository;
import com.abhay.booking_service.repository.SlotRepository;
import com.abhay.booking_service.service.UserBookingService;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserBookingServiceImp implements UserBookingService {
    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;
    private final NurseClient nurseClient;

    public UserBookingServiceImp(BookingRepository bookingRepository, SlotRepository slotRepository, NurseClient nurseClient) {
        this.bookingRepository = bookingRepository;
        this.slotRepository = slotRepository;
        this.nurseClient = nurseClient;
    }

    @Override
    public Page<UserBookingsDto> findBookingsForUser(Pageable page,String userId) {
        return bookingRepository.findByUserId(page,userId).map(booking -> {
            return new UserBookingsDto(booking.getId(),
                    booking.getServiceName(),
                    booking.getTotalDays(),
                    booking.getStatus(),
                    booking.getTotalAmount(),
                    booking.getStartDate(),
                    booking.getEndDate());
        });
    }


    @Override
    public UserBookingResponseDto viewBookingDetails(long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BookingNotFoundException("Booking id is not valid: " + bookingId));

        ViewBooking response = mapBookingToViewBooking(booking);

        try {
            ResponseEntity<NurseDto> nurseResponse = nurseClient.findNurseForViewBooking(booking.getNurseId());
            log.info("nurse response :{}",nurseResponse);
            NurseDto nurse = nurseResponse.getBody();
            log.info("nurse Dto :{}",nurse);

            if (nurse == null) {
                throw new RuntimeException("Nurse data is null");
            }

            UserBookingResponseDto userBookingResponseDto = new UserBookingResponseDto();
            userBookingResponseDto.setViewBooking(response);
            userBookingResponseDto.setNurseDto(nurse);

            return userBookingResponseDto;
        } catch (FeignException ex) {
            throw new RuntimeException("Failed to fetch nurse details", ex);
        } catch (Exception ex) {
            throw new RuntimeException("An unexpected error occurred while fetching booking details", ex);
        }
    }

    private ViewBooking mapBookingToViewBooking(Booking booking) {
        ViewBooking response = new ViewBooking();
        response.setBookingId(booking.getId());
        response.setServiceName(booking.getServiceName());
        response.setServicePrice(booking.getServicePrice());
        response.setAddress(booking.getAddress());
        response.setAge(booking.getAge());
        response.setGender(booking.getGender());
        response.setFirstName(booking.getFirstName());
        response.setLastName(booking.getLastName());
        response.setPatientFullName(booking.getPatientFullName());
        response.setMedicalDetails(booking.getMedicalDetails());
        response.setPin(booking.getPin());
        response.setDutyType(booking.getDutyType());
        response.setStatus(booking.getStatus());
        response.setPaymentId(booking.getPaymentId());
        response.setTotalAmount(booking.getTotalAmount());
        response.setTotalDays(booking.getTotalDays());
        response.setStartDate(booking.getStartDate());

        List<SlotDto> slotDtos = booking.getSlots().stream()
                .map(slot -> {
                    SlotDto slotDto = new SlotDto();
                    slotDto.setId(slot.getId());
                    slotDto.setNurseId(booking.getNurseId());
                    slotDto.setDate(slot.getDate());
                    return slotDto;
                })
                .collect(Collectors.toList());
        response.setSlotDtos(slotDtos);

        return response;
    }
}
