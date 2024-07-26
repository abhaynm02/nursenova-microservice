package com.abhay.booking_service.service.serviceImp;

import com.abhay.booking_service.dto.BookingAggregateDTO;
import com.abhay.booking_service.dto.BookingCountByService;
import com.abhay.booking_service.dto.DashboardData;
import com.abhay.booking_service.dto.EarningsByMonth;
import com.abhay.booking_service.model.Booking;
import com.abhay.booking_service.model.BookingStatus;
import com.abhay.booking_service.repository.BookingRepository;
import com.abhay.booking_service.service.DashBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashBoardServiceImp implements DashBoardService {
    private final BookingRepository bookingRepository;

    @Override
    public List<BookingAggregateDTO> getNurseMonthlyStats(String nurseId) {
        List<Booking> bookings = bookingRepository.findByNurseId(nurseId);
        Map<YearMonth, Long> countMap = bookings.stream()
                .filter(b -> b.getStartDate() != null)  // Filter out null startDates
                .collect(Collectors.groupingBy(
                        b -> YearMonth.from(b.getStartDate()),
                        Collectors.counting()
                ));

        return countMap.entrySet().stream()
                .map(entry -> new BookingAggregateDTO(
                        entry.getKey().getYear(),
                        entry.getKey().getMonthValue(),
                        entry.getValue()
                ))
                .sorted(Comparator.comparing(BookingAggregateDTO::getYear)
                        .thenComparing(BookingAggregateDTO::getMonth))
                .collect(Collectors.toList());
    }

    @Override
    public DashboardData getDashboardDataForNurse(String nurseId) {
        DashboardData dashboardData = new DashboardData();

        LocalDate today = LocalDate.now();

        // Fetch all bookings for the nurse
        List<Booking> nurseBookings = bookingRepository.findByNurseId(nurseId);

        // Calculate total bookings
        dashboardData.setTotalBookings(nurseBookings.size());

        // Calculate completed, ongoing, and upcoming bookings
        long completedBookings = nurseBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.COMPLETED).count();
        long ongoingBookings = nurseBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.CONFIRMED).count();
        long upcomingBookings = nurseBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.REQUESTED).count();
        long cancelBookings = nurseBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.CANCELLED).count();

        dashboardData.setCompletedBookings(completedBookings);
        dashboardData.setOngoingBookings(ongoingBookings);
        dashboardData.setUpcomingBookings(upcomingBookings);
        dashboardData.setCancelBookings(cancelBookings);

        // Calculate total earnings
        double totalEarnings = nurseBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
                .mapToDouble(Booking::getTotalAmount)
                .sum();
        dashboardData.setTotalEarnings(totalEarnings);

        // Calculate bookings by service
        Map<String, Long> bookingsByService = nurseBookings.stream()
                .collect(Collectors.groupingBy(Booking::getServiceName, Collectors.counting()));
        dashboardData.setBookingsByService(bookingsByService.entrySet().stream()
                .map(entry -> new BookingCountByService(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList()));

        // Calculate earnings by month
        Map<String, Double> earningsByMonth = nurseBookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.COMPLETED)
                .collect(Collectors.groupingBy(
                        b -> b.getStartDate().getMonth().toString(),
                        Collectors.summingDouble(Booking::getTotalAmount)
                ));
        dashboardData.setEarningsByMonth(earningsByMonth.entrySet().stream()
                .map(entry -> new EarningsByMonth(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList()));

        return dashboardData;
    }
}
