package com.abhay.user_service.repository;

import com.abhay.user_service.model.Role;
import com.abhay.user_service.model.Services;
import com.abhay.user_service.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    @Transactional(readOnly = true)
    @Query("SELECT u FROM User u WHERE u.role = :role")
    Page<User> findByRole(Pageable pageable, @Param("role") Role role);

    @Modifying
    @Query("UPDATE User u SET u.status= :status WHERE u.id= :userId")
    void updateStatus(Long userId,boolean status);

    @Query("SELECT p FROM User p WHERE (p.firstname LIKE %:searchKey% OR p.lastname LIKE %:searchKey%) AND p.role = :role")
    Page<User> searchUsers(Pageable pageable, @Param("searchKey") String searchKey,@Param("role") Role role);

}
