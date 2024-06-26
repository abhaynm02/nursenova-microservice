package com.abhay.user_service.feignclient;

import com.abhay.user_service.dto.ProfileDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class NurseServiceFallback implements NurseClient{
    @Override
    public ResponseEntity<Boolean> updateNurseProfile(ProfileDto profileDto) {
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
