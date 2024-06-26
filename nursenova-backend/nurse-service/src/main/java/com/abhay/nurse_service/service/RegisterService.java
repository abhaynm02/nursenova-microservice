package com.abhay.nurse_service.service;

import com.abhay.nurse_service.dto.ImageLink;
import com.abhay.nurse_service.dto.NurseDto;
import com.abhay.nurse_service.dto.NurseRequest;
import com.abhay.nurse_service.dto.RequestApproveDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface RegisterService {
    void updateNurseDetails(NurseRequest request, MultipartFile profile,MultipartFile certificate) throws IOException;
    Page<RequestApproveDto> findAllRequests(Pageable pageable);
    NurseDto findNurse(long nurseId);
    void approveRequest(long nurseId,boolean status);

}
