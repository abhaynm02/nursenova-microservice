package com.abhay.booking_service.service;

import com.abhay.booking_service.dto.SlotDto;
import com.abhay.booking_service.model.Slot;

import java.time.LocalDate;
import java.util.List;

public interface SlotService {
    void  createDailySlots(String nurseId, LocalDate startDate,LocalDate endDate);
    List<SlotDto> findAvailableSlots(String nurseId);
    void  deleteSlot(long slotId);
    List<SlotDto>findAvailableSlotsForNurse(String nurseId);
}
