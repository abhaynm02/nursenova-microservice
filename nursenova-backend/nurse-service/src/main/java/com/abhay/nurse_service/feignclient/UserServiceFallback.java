package com.abhay.nurse_service.feignclient;

import com.abhay.nurse_service.dto.UserBlockRequestDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class UserServiceFallback implements UserClient{
    @Override
    public ResponseEntity<Boolean> blockUser(UserBlockRequestDto requestDto) {
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
