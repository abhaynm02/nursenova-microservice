package com.abhay.nurse_service.repository;

import com.abhay.nurse_service.model.Nurse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NurseRepository extends JpaRepository<Nurse,Long> {
    Optional<Nurse> findByUserName(String username);
    List<Nurse>findByIsVerified(boolean status);
    @Modifying
    @Query("UPDATE Nurse u SET u.isVerified= :status WHERE u.id= :userId")
    void verifyRequest(long userId,boolean status);
}
