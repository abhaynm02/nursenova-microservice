package com.abhay.booking_service.controller;

import com.abhay.booking_service.dto.BookingAggregateDTO;
import com.abhay.booking_service.dto.DashboardData;
import com.abhay.booking_service.service.DashBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/booking/nurse/dashboard")
@RequiredArgsConstructor
public class NurseDashBoardController {
    private final DashBoardService dashBoardService;

    @GetMapping("/{nurseId}")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<DashboardData>getNurseDashboard(@PathVariable String nurseId){
        DashboardData dashboardData=dashBoardService.getDashboardDataForNurse(nurseId);
        return new ResponseEntity<>(dashboardData,HttpStatus.OK);
    }
    @GetMapping("/chart/{nurseId}")
    @PreAuthorize("hasRole('ROLE_NURSE')")
    public ResponseEntity<List<BookingAggregateDTO>>getNurseMonthlyStats(@PathVariable("nurseId")String nurseId){
        return new ResponseEntity<>(dashBoardService.getNurseMonthlyStats(nurseId), HttpStatus.OK);
    }
}
