package com.abhay.booking_service.repository;

import com.abhay.booking_service.model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SlotRepository extends JpaRepository<Slot,Long> {
    List<Slot>findByNurseIdAndDateBetweenAndIsAvailableTrue(String nurseId, LocalDate startDate ,LocalDate endDate);
    List<Slot>findByNurseIdAndDateBetween(String nurseId, LocalDate startDate ,LocalDate endDate);
    boolean existsByNurseIdAndDate(String nurseId, LocalDate date);
}
