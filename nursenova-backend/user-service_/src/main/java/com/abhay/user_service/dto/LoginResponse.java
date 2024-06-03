package com.abhay.user_service.dto;

import com.abhay.user_service.model.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponse {
    String token;
    Role role;
    String username;
}
