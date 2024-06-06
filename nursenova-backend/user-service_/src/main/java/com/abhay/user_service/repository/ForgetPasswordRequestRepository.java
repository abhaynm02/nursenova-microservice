package com.abhay.user_service.repository;

import com.abhay.user_service.model.ForgetPasswordRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ForgetPasswordRequestRepository extends JpaRepository<ForgetPasswordRequest,Long> {

    Optional<ForgetPasswordRequest> findByEmail(String email);
    void  deleteByEmail(String email);
}
