package com.abhay.booking_service.service.serviceImp;

import com.abhay.booking_service.dto.BookingRequestDto;
import com.abhay.booking_service.dto.BookingResponse;
import com.abhay.booking_service.dto.SlotDto;
import com.abhay.booking_service.model.Booking;
import com.abhay.booking_service.model.BookingSlot;
import com.abhay.booking_service.model.BookingStatus;
import com.abhay.booking_service.model.Slot;
import com.abhay.booking_service.repository.BookingRepository;
import com.abhay.booking_service.repository.BookingSlotRepository;
import com.abhay.booking_service.repository.SlotRepository;
import com.abhay.booking_service.service.BookingService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImp implements BookingService {
    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;
    private final BookingSlotRepository bookingSlotRepository;

    public BookingServiceImp(BookingRepository bookingRepository, SlotRepository slotRepository, BookingSlotRepository bookingSlotRepository) {
        this.bookingRepository = bookingRepository;
        this.slotRepository = slotRepository;
        this.bookingSlotRepository = bookingSlotRepository;
    }


    @Transactional
    public void placeBooking(BookingRequestDto bookingRequestDto) {
        Booking booking = new Booking();
        booking.setNurseId(bookingRequestDto.getNurseId());
        booking.setUserId(bookingRequestDto.getUserId());
        booking.setServiceId(bookingRequestDto.getServiceId());
        booking.setServiceName(bookingRequestDto.getServiceName());
        booking.setDutyType(bookingRequestDto.getDutyType());
        booking.setStatus(BookingStatus.REQUESTED);
        booking.setAge(bookingRequestDto.getAge());
        booking.setPatientFullName(bookingRequestDto.getPatientFullName());
        booking.setGender(bookingRequestDto.getGender());
        booking.setMedicalDetails(bookingRequestDto.getMedicalDetails());
        booking.setFirstName(bookingRequestDto.getFirstName());
        booking.setLastName(bookingRequestDto.getLastName());
        booking.setAddress(bookingRequestDto.getAddress());
        booking.setPin(bookingRequestDto.getPin());

        List<BookingSlot> bookingSlots = createBookingSlots(bookingRequestDto.getSlotDtos(), booking);
        booking.setSlots(bookingSlots);
        booking.setTotalAmount(calculateTotalAmount(bookingRequestDto.getSlotDtos(), bookingRequestDto.getServicePrice()));
        booking.setTotalDays(bookingRequestDto.getSlotDtos().size());
        booking.setPaymentId(bookingRequestDto.getPaymentId());
        booking.setServicePrice(bookingRequestDto.getServicePrice());

        bookingRepository.save(booking);
        bookingSlotRepository.saveAll(bookingSlots);
    }

    @Override
    public List<BookingResponse> findBookingsForNurse(String nurseId) {
        return null;
    }

    private long calculateTotalAmount(List<SlotDto> slotDtos, long servicePrice) {
        return slotDtos.size() * servicePrice;
    }

    private List<BookingSlot> createBookingSlots(List<SlotDto> slotDtos, Booking booking) {
        return slotDtos.stream().map(slotDto -> {
            BookingSlot bookingSlot = new BookingSlot();
            bookingSlot.setBooking(booking);
            bookingSlot.setDate(slotDto.getDate());

            Slot slot = slotRepository.findById(slotDto.getId()).orElseThrow(() ->
                    new RuntimeException("Slot not found with ID: " + slotDto.getId()));
            slot.setAvailable(false);
            slotRepository.save(slot);

            return bookingSlot;
        }).collect(Collectors.toList());
    }
}
