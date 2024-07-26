package com.abhay.booking_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DashboardData {
    private long totalBookings;
    private long completedBookings;
    private long ongoingBookings;
    private long upcomingBookings;
    private long cancelBookings;
    private double totalEarnings;
    private List<BookingCountByService> bookingsByService;
    private List<EarningsByMonth> earningsByMonth;
}
