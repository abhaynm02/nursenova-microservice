package com.abhay.booking_service.repository;

import com.abhay.booking_service.dto.BookingAggregateDTO;
import com.abhay.booking_service.dto.UserBookingsDto;
import com.abhay.booking_service.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    Page<Booking> findByNurseId(Pageable page, String nurseId);
    Page<Booking>findByUserId(Pageable page,String userId);

    @Query("SELECT b FROM Booking b WHERE b.nurseId = :nurseId")
    List<Booking> findByNurseId(@Param("nurseId") String nurseId);


}
