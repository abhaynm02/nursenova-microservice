package com.abhay.nurse_service.repository;

import com.abhay.nurse_service.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language,Long> {
}
