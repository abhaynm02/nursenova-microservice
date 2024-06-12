package com.abhay.user_service.repository;

import com.abhay.user_service.model.Role;
import com.abhay.user_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<List<User>>findByRole(Role role);

    @Modifying
    @Query("UPDATE User u SET u.status= :status WHERE u.id= :userId")
    void updateStatus(Long userId,boolean status);

}
