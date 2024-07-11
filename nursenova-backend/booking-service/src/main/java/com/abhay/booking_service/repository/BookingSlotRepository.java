package com.abhay.booking_service.repository;

import com.abhay.booking_service.model.BookingSlot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingSlotRepository extends JpaRepository<BookingSlot,Long> {
}
