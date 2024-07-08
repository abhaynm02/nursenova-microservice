package com.abhay.booking_service.service.serviceImp;

import com.abhay.booking_service.model.Booking;
import com.abhay.booking_service.model.BookingStatus;
import com.abhay.booking_service.model.Slot;
import com.abhay.booking_service.repository.BookingRepository;
import com.abhay.booking_service.repository.SlotRepository;
import com.abhay.booking_service.service.BookingService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class BookingServiceImp implements BookingService {
    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;

    public BookingServiceImp(BookingRepository bookingRepository, SlotRepository slotRepository) {
        this.bookingRepository = bookingRepository;
        this.slotRepository = slotRepository;
    }

    @Override
    public void placeBooking(String nurseId, LocalDate startDate, LocalDate endDate) {
        List<Slot>selectSlots=slotRepository.findByNurseIdAndDateBetweenAndIsAvailableTrue(nurseId,startDate,endDate);

        for (Slot slot:selectSlots){
            slot.setAvailable(false);
        }
        slotRepository.saveAll(selectSlots);
        Booking booking =new Booking();
        booking.setNurseId(nurseId);
        booking.setUserId(nurseId);
        booking.setStatus(BookingStatus.REQUESTED);
        booking.setStartDate(startDate);
        booking.setEndDate(endDate);
        bookingRepository.save(booking);

    }
}
