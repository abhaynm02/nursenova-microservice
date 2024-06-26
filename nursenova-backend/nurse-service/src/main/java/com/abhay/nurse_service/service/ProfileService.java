package com.abhay.nurse_service.service;

import com.abhay.nurse_service.dto.NurseDto;
import com.abhay.nurse_service.dto.ProfileDto;

public interface ProfileService {
    boolean updateProfile(ProfileDto profileDto);
    NurseDto findProfileDetails(String username);

}
