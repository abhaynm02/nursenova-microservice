package com.abhay.user_service.service;

import com.abhay.user_service.dto.PassWordUpdateDto;
import com.abhay.user_service.dto.ProfileDto;

public interface UserService {
ProfileDto findProfile(String username);

    void updateProfile(ProfileDto profileDto);

    void updatePassword(PassWordUpdateDto updateDto);
}
