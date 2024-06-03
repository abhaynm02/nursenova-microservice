package com.abhay.user_service.repository;

import com.abhay.user_service.model.UnverifiedUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface  UnverifiedUserRepository extends JpaRepository<UnverifiedUser,Long> {
    Optional<UnverifiedUser>findByEmail(String email);

    void deleteByEmail(String email);
}
