package com.abhay.nurse_service.repository;

import com.abhay.nurse_service.model.NurseService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NurseServiceRepository extends JpaRepository< NurseService,Long> {
}
