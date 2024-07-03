package com.abhay.nurse_service.repository;

import com.abhay.nurse_service.model.DutyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DutyTypeRepository extends JpaRepository< DutyType,Long> {
}
