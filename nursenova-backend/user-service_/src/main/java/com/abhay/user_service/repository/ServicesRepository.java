package com.abhay.user_service.repository;

import com.abhay.user_service.dto.ServiceResponse;
import com.abhay.user_service.model.Services;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

public interface ServicesRepository extends JpaRepository<Services,Long> {
    Optional<Services>findByServiceName(String name);
    boolean existsByServiceName(String name);
    List<Services> findByStatus(boolean status);
    @Modifying
    @Query("UPDATE Services u SET u.status= :status WHERE u.id= :userId")
    void updateStatus(Long userId,boolean status);

    @Query("SELECT  p FROM Services p WHERE p.serviceName LIKE ?1%")
    Page<Services>searchServices(Pageable pageable, @Param("searchKey") String searchKey);
}
