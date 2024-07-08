package com.abhay.booking_service.service.serviceImp;

import com.abhay.booking_service.model.Slot;
import com.abhay.booking_service.repository.BookingRepository;
import com.abhay.booking_service.repository.SlotRepository;
import com.abhay.booking_service.service.SlotService;
import com.abhay.booking_service.utils.DateUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class SlotServiceImp implements SlotService {
    private final SlotRepository slotRepository;
    private final BookingRepository bookingRepository;

    public SlotServiceImp(SlotRepository slotRepository, BookingRepository bookingRepository) {
        this.slotRepository = slotRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public void createDailySlots(String nurseId, LocalDate startDate, LocalDate endDate) {
        List<Slot> slots = new ArrayList<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            if(!slotRepository.existsByNurseIdAndDate(nurseId,date)){
                Slot slot = new Slot();
                slot.setDate(date);
                slot.setAvailable(true);
                slot.setNurseId(nurseId);
                slots.add(slot);
            }
        }
        slotRepository.saveAll(slots);
    }

    @Override
    public List<Slot> findAvailableSlots(String nurseId) {
        LocalDate startDate = DateUtils.getTwoDayAfterCurrentDate();
        LocalDate endDate = DateUtils.getEndOfCurrentMoth();
        return slotRepository.findByNurseIdAndDateBetweenAndIsAvailableTrue(nurseId,startDate,endDate);
    }

    @Override
    public void deleteSlot(long slotId) {
        try {
            slotRepository.deleteById(slotId);
        } catch (EmptyResultDataAccessException e) {
            // Handle the case when the slot with the given ID does not exist
            throw new RuntimeException("Slot with ID " + slotId + " not found.");
        }
    }
}
