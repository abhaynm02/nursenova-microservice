package com.abhay.nurse_service.service;

import com.abhay.nurse_service.dto.RequestApproveDto;

import java.util.List;

public interface AdminService {
    List<RequestApproveDto>findAllStaffs();
    boolean blockOrUnblock(long nurseId,boolean status);
}
