package com.abhay.user_service.service;

import com.abhay.user_service.dto.AllUserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminService {
    Page<AllUserResponse> findAllUsers(Pageable pageable);
    void blockUser(long id,boolean status);
    boolean blockNurse(String userName,boolean status);

    Page<AllUserResponse> searchUsers(Pageable pageable, String searchKey);
}
