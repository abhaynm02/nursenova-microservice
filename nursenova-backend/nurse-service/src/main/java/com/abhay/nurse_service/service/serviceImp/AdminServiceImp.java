package com.abhay.nurse_service.service.serviceImp;

import com.abhay.nurse_service.dto.RequestApproveDto;
import com.abhay.nurse_service.repository.NurseRepository;
import com.abhay.nurse_service.service.AdminService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AdminServiceImp implements AdminService {
    private final NurseRepository nurseRepository;

    public AdminServiceImp(NurseRepository nurseRepository) {
        this.nurseRepository = nurseRepository;
    }

    @Override
    public List<RequestApproveDto> findAllStaffs() {
        return nurseRepository.findByIsVerified(true).stream().map(nurse ->new RequestApproveDto(
                nurse.getId(),
                nurse.getFirstName(),
                nurse.getLastName(),
                nurse.getUserName(),
                String.valueOf(nurse.getGender()),
                nurse.getPhone(),
                nurse.isVerified()
        )).toList();
    }

    @Override
    public boolean blockOrUnblock(long nurseId, boolean status) {
        try {
            nurseRepository.verifyRequest(nurseId,status);
        }catch (RuntimeException e){
            throw new RuntimeException("user not blocked ");
        }

       return true;
    }
}
