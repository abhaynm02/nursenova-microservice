package com.abhay.nurse_service.service;

import com.abhay.nurse_service.dto.DisplayNurseDto;
import com.abhay.nurse_service.dto.ViewNurseDto;
import com.abhay.nurse_service.model.Nurse;

import java.util.List;

public interface UserHomeService {
    List<String> findAvailableLocations() ;
    List<DisplayNurseDto>findByLocationAndService(String location , long serviceId);
    ViewNurseDto findNurseForBooking(String nurseId,long serviceId);

}
