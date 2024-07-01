package com.abhay.nurse_service.repository;

import com.abhay.nurse_service.model.NurseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NurseServiceRepository extends JpaRepository< NurseService,Long> {
    @Query("SELECT ns FROM NurseService ns JOIN ns.nurse n WHERE n.userName = :username")
    Page<NurseService> findServicesByNurseUsername(@Param("username") String username, Pageable pageable);

    @Query("SELECT ns FROM NurseService ns JOIN ns.nurse n WHERE n.userName = :username AND ns.serviceName LIKE CONCAT(:searchKey, '%')")
    Page<NurseService> searchServicesByNurseUsername(@Param("username") String username, @Param("searchKey") String searchKey, Pageable pageable);

}
