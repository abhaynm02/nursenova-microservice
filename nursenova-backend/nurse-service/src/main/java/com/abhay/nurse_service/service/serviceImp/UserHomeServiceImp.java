package com.abhay.nurse_service.service.serviceImp;

import com.abhay.nurse_service.dto.DisplayNurseDto;
import com.abhay.nurse_service.dto.LanguageDto;
import com.abhay.nurse_service.dto.ServiceDutyResponse;
import com.abhay.nurse_service.dto.ServiceResponse;
import com.abhay.nurse_service.filestore.FileStore;
import com.abhay.nurse_service.model.Nurse;
import com.abhay.nurse_service.repository.NurseRepository;
import com.abhay.nurse_service.service.UserHomeService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserHomeServiceImp implements UserHomeService {

    private final NurseRepository nurseRepository;
    private final FileStore fileStore;

    public UserHomeServiceImp(NurseRepository nurseRepository, FileStore fileStore) {
        this.nurseRepository = nurseRepository;
        this.fileStore = fileStore;
    }

    @Override
    public List<String> findAvailableLocations() {
        return nurseRepository.findAllDistinctLocations();
    }

    @Override
    public List<DisplayNurseDto> findByLocationAndService(String location, long serviceId) {
        List<Nurse> nurses = nurseRepository.findByLocationAndService(location, serviceId);
        return nurses.stream()
                .map(nurse -> mapToDisplayNurseDto(nurse, serviceId))
                .filter(Objects::nonNull) // Filter out null values
                .collect(Collectors.toList());
    }

    private DisplayNurseDto mapToDisplayNurseDto(Nurse nurse, long serviceId) {
        //fetching the selected service detail and duty details
        ServiceResponse serviceResponse = nurse.getNurseServices().stream()
                .filter(nurseService -> nurseService.getServiceId() == serviceId&& nurseService.isAvailable())
                .map(nurseService -> new ServiceResponse(nurseService.getId(),
                        nurseService.getServiceId(),
                        nurseService.getServiceName(),
                        nurseService.getDutyTypes().stream()
                                .map(dt -> new ServiceDutyResponse(dt.getId(), dt.getDutyType(), dt.getServicePrice()))
                                .collect(Collectors.toList()),
                        nurseService.isAvailable()))
                .findFirst()
                .orElse(null);

        if (serviceResponse == null) {
            return null;
        }

        //setting the response
        DisplayNurseDto dto = new DisplayNurseDto();
        dto.setFirstName(nurse.getFirstName());
        dto.setLastName(nurse.getLastName());
        dto.setId(nurse.getId());
        dto.setUserName(nurse.getUserName());
        dto.setServiceId(serviceResponse.getServiceId());
        dto.setServiceName(serviceResponse.getServiceName());
        dto.setLanguageDtos(nurse.getLanguages().stream()
                .map(language -> new LanguageDto(language.getId(), language.getLanguage()))
                .collect(Collectors.toList()));
        dto.setProfileImageLink(fileStore.generateUrl(nurse.getProfileImageLink()));
        dto.setGender(nurse.getGender());
        dto.setDutyResponses(serviceResponse.getDutyTypes());

        return dto;
    }
}
