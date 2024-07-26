package com.abhay.nurse_service.service.serviceImp;

import com.abhay.nurse_service.dto.CheckoutResponse;
import com.abhay.nurse_service.dto.LanguageDto;
import com.abhay.nurse_service.exceptions.customexceptions.ServiceNotFoundException;
import com.abhay.nurse_service.exceptions.customexceptions.UsernameNotFoundException;
import com.abhay.nurse_service.model.DutyType;
import com.abhay.nurse_service.model.Nurse;
import com.abhay.nurse_service.repository.DutyTypeRepository;
import com.abhay.nurse_service.repository.NurseRepository;
import com.abhay.nurse_service.repository.NurseServiceRepository;
import com.abhay.nurse_service.service.CheckoutService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CheckoutServiceImp implements CheckoutService {
    private final NurseRepository nurseRepository;
    private final DutyTypeRepository dutyTypeRepository;


    public CheckoutServiceImp(NurseRepository nurseRepository, DutyTypeRepository dutyTypeRepository) {
        this.nurseRepository = nurseRepository;
        this.dutyTypeRepository = dutyTypeRepository;

    }

    @Override
    public CheckoutResponse checkoutDetails(String nurseId, long serviceId,long totalDays) {
        Nurse nurse =nurseRepository.findByUserName(nurseId).orElseThrow(()->new UsernameNotFoundException("nurse not found given email"));
        CheckoutResponse response =new CheckoutResponse();
        response.setFirstName(nurse.getFirstName());
        response.setLastName(nurse.getLastName());
        response.setAge(nurse.getAge());
        response.setGender(nurse.getGender());
        response.setPhone(nurse.getPhone());
        response.setExperience(nurse.getExperience());
        response.setEducation(nurse.getEducation());
        List<LanguageDto> languageDtos=nurse.getLanguages()
                .stream()
                .map(language -> new LanguageDto(language.getId(),language.getLanguage())).toList();
        response.setLanguageDtos(languageDtos);
        DutyType dutyType =dutyTypeRepository.findById(serviceId).orElseThrow(()->new ServiceNotFoundException("service not found with id"));
        response.setDuty(dutyType.getDutyType());
        response.setServicePrice(dutyType.getServicePrice());
        response.setTotalAmount(dutyType.getServicePrice()*totalDays);
        response.setServiceName(dutyType.getNurseService().getServiceName());

        return response;
    }
}
