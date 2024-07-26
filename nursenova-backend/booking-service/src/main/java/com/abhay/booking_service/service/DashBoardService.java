package com.abhay.booking_service.service;

import com.abhay.booking_service.dto.BookingAggregateDTO;
import com.abhay.booking_service.dto.DashboardData;

import java.util.List;

public interface DashBoardService {
    List<BookingAggregateDTO> getNurseMonthlyStats(String nurseId);
    DashboardData getDashboardDataForNurse(String nurseId);
}
