package com.abhay.user_service.service;

import com.abhay.user_service.dto.ProfileDto;
import org.springframework.web.bind.annotation.RequestBody;

public interface NurseService {
    void updateProfile(ProfileDto profileDto);
}
