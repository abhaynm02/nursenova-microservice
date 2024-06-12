package com.abhay.user_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AllUserResponse {
    private long id;
    private String name;
    private String username;
    private boolean status;
}
