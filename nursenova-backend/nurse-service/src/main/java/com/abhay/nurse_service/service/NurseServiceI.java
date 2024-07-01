package com.abhay.nurse_service.service;

import com.abhay.nurse_service.dto.ProfileDto;
import com.abhay.nurse_service.dto.ServiceAddRequest;
import com.abhay.nurse_service.dto.ServiceResponse;
import com.abhay.nurse_service.model.NurseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NurseServiceI {
    void addService(ServiceAddRequest request);
    Page<ServiceResponse> findServices(String username, Pageable pageable);
    Page<ServiceResponse> searchServices(String username, String searchKey, Pageable pageable);
}
