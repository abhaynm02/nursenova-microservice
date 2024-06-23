package com.abhay.nurse_service.service.serviceImp;

import com.abhay.nurse_service.dto.RequestApproveDto;
import com.abhay.nurse_service.dto.UserBlockRequestDto;
import com.abhay.nurse_service.exceptions.customexceptions.DuplicateUsernameException;
import com.abhay.nurse_service.feignclient.UserClient;
import com.abhay.nurse_service.model.Nurse;
import com.abhay.nurse_service.repository.NurseRepository;
import com.abhay.nurse_service.service.AdminService;
import feign.FeignException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class AdminServiceImp implements AdminService {
    private final NurseRepository nurseRepository;
    private final UserClient userClient;

    public AdminServiceImp(NurseRepository nurseRepository, UserClient userClient) {
        this.nurseRepository = nurseRepository;
        this.userClient = userClient;
    }

    @Override
    public Page<RequestApproveDto> findAllStaffs(Pageable pageable) {
        Page<Nurse> nursePage = nurseRepository.findByIsVerified(pageable, true);

        return nursePage.map(nurse -> new RequestApproveDto(
                nurse.getId(),
                nurse.getFirstName(),
                nurse.getLastName(),
                nurse.getUserName(),
                String.valueOf(nurse.getGender()),
                nurse.getPhone(),
                nurse.isStatus()
        ));
    }

    @Override
    @Transactional
    public boolean blockOrUnblock(long nurseId, boolean status) {
        Optional<Nurse> nurseOptional = nurseRepository.findById(nurseId);
        if (nurseOptional.isPresent()) {
            Nurse nurse = nurseOptional.get();
            try {
                userClient.blockUser(new UserBlockRequestDto(nurse.getUserName(), status));
              nurseRepository.blockNurse(nurseId,status);
                return true;
            } catch (FeignException ex) {
                throw new RuntimeException("Failed to block/unblock user", ex);
            } catch (Exception ex) {
                throw new RuntimeException("An unexpected error occurred", ex);
            }
        } else {
            throw new DuplicateUsernameException("Nurse not found with ID: " + nurseId);
        }
    }

    @Override
    public Page<RequestApproveDto> searchStaffs(Pageable pageable, String searchKey) {
        Page<Nurse>nursePage=nurseRepository.searchServices(pageable,searchKey);

        return nursePage.map(nurse -> new RequestApproveDto(
                nurse.getId(),
                nurse.getFirstName(),
                nurse.getLastName(),
                nurse.getUserName(),
                String.valueOf(nurse.getGender()),
                nurse.getPhone(),
                nurse.isStatus()
        ));
    }
}
