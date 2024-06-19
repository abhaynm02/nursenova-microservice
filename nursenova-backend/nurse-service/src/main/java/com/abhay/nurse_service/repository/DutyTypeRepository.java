package com.abhay.nurse_service.repository;

import com.abhay.nurse_service.model.DutyType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DutyTypeRepository extends JpaRepository< DutyType,Long> {
}
