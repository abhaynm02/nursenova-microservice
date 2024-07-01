package com.abhay.user_service.service;

import com.abhay.user_service.dto.ProfileDto;
import com.abhay.user_service.dto.ServiceResponse;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface NurseService {
    void updateProfile(ProfileDto profileDto);
    List<ServiceResponse>findServicesForNurseSelecting();
}
