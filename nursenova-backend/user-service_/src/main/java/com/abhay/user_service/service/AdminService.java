package com.abhay.user_service.service;

import com.abhay.user_service.dto.AllUserResponse;

import java.util.List;

public interface AdminService {
    List<AllUserResponse>findAllUsers();
    void blockUser(long id,boolean status);
    void blockNurse(String userName,boolean status);
}
