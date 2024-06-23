package com.abhay.nurse_service.service;

import com.abhay.nurse_service.dto.RequestApproveDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminService {
    Page<RequestApproveDto> findAllStaffs(Pageable pageable);
    boolean blockOrUnblock(long nurseId,boolean status);

    Page<RequestApproveDto> searchStaffs(Pageable pageable, String searchKey);
}
