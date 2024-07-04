package com.abhay.nurse_service.service.serviceImp;

import com.abhay.nurse_service.dto.*;
import com.abhay.nurse_service.filestore.FileStore;
import com.abhay.nurse_service.model.Nurse;
import com.abhay.nurse_service.repository.NurseRepository;
import com.abhay.nurse_service.service.UserHomeService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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

    @Override
    public ViewNurseDto findNurseForBooking(String nurseId, long serviceId) {
        Nurse nurse=nurseRepository.findByUserName(nurseId).orElseThrow(()->new UsernameNotFoundException("User not found with email: " + nurseId));
       ViewNurseDto nurseDto =new ViewNurseDto();
        nurseDto.setId(nurse.getId());
        nurseDto.setFirstName(nurse.getFirstName());
        nurseDto.setLastName(nurse.getLastName());
        nurseDto.setGender(String.valueOf(nurse.getGender()));
        nurseDto.setPhone(nurse.getPhone());
        nurseDto.setLocation(nurse.getLocation());
        nurseDto.setAddress(nurse.getAddress());
        nurseDto.setAge(nurse.getAge());
        nurseDto.setExperience(nurse.getExperience());
        nurseDto.setEducation(nurse.getEducation());
        nurseDto.setProfileImageLink(fileStore.generateUrl(nurse.getProfileImageLink()));
        nurseDto.setUserName(nurse.getUserName());

        ServiceResponse service=nurse.getNurseServices().stream()
                .filter(s->s.getServiceId()==serviceId && s.isAvailable())
                .map(s-> new ServiceResponse(s.getId(),s.getServiceId(),
                        s.getServiceName(),
                        s.getDutyTypes().
                                stream()
                                .map(dt->new ServiceDutyResponse(dt.getId(),dt.getDutyType(),dt.getServicePrice()))
                                .collect(Collectors.toList()), s.isAvailable())).findFirst().orElse(null);
        nurseDto.setServiceResponse(service);

        List<LanguageDto>languageDtos =nurse.getLanguages().stream()
                .map(dt->new LanguageDto(dt.getId(), dt.getLanguage())).toList();
        nurseDto.setLanguageDtos(languageDtos);
        return nurseDto;
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
