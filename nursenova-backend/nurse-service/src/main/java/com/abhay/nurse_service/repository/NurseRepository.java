package com.abhay.nurse_service.repository;

import com.abhay.nurse_service.model.Nurse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NurseRepository extends JpaRepository<Nurse,Long> {
    Optional<Nurse> findByUserName(String username);
    Page<Nurse> findByIsVerified(Pageable pageable, boolean status);
    List<Nurse>findByStatus(boolean status);
    @Modifying
    @Query("UPDATE Nurse u SET u.isVerified= :status WHERE u.id= :userId")
    void verifyRequest(long userId,boolean status);

    @Modifying
    @Query("UPDATE Nurse u SET u.status= :status WHERE u.id= :userId")
    void blockNurse(long userId,boolean status);

    @Query("SELECT  p FROM Nurse p WHERE p.firstName LIKE %:searchKey% OR p.lastName LIKE %:searchKey%")
    Page<Nurse>searchServices(Pageable pageable, @Param("searchKey") String searchKey);
}
