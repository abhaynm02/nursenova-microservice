package com.abhay.nurse_service.service.serviceImp;

import com.abhay.nurse_service.dto.*;
import com.abhay.nurse_service.exceptions.customexceptions.DuplicateServiceEntryException;
import com.abhay.nurse_service.exceptions.customexceptions.NurseNotFoundException;
import com.abhay.nurse_service.exceptions.customexceptions.ServiceNotFoundException;
import com.abhay.nurse_service.exceptions.customexceptions.UsernameNotFoundException;
import com.abhay.nurse_service.model.Duty;
import com.abhay.nurse_service.model.DutyType;
import com.abhay.nurse_service.model.Nurse;
import com.abhay.nurse_service.model.NurseService;
import com.abhay.nurse_service.repository.DutyTypeRepository;
import com.abhay.nurse_service.repository.NurseRepository;
import com.abhay.nurse_service.repository.NurseServiceRepository;
import com.abhay.nurse_service.service.NurseServiceI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NurseServiceImp implements NurseServiceI {
    private final NurseRepository nurseRepository;
    private final DutyTypeRepository dutyTypeRepository;
    private  final NurseServiceRepository nurseServiceRepository;

    public NurseServiceImp(NurseRepository nurseRepository, DutyTypeRepository dutyTypeRepository, NurseServiceRepository nurseServiceRepository) {
        this.nurseRepository = nurseRepository;
        this.dutyTypeRepository = dutyTypeRepository;
        this.nurseServiceRepository = nurseServiceRepository;
    }

    @Override
    @Transactional
    public void addService(ServiceAddRequest request) {
        Optional<Nurse> optionalNurse = nurseRepository.findByUserName(request.getNurseId());
        if (optionalNurse.isPresent()) {
            Nurse nurse = optionalNurse.get();
            List<NurseService> services = nurse.getNurseServices();
            if (services == null) {
                services = new ArrayList<>();
            }
            if (services.stream().anyMatch(nurseService -> nurseService.getServiceName().equals(request.getServiceName()))) {
                throw new DuplicateServiceEntryException("Service Already added");
            }
            NurseService nurseService = new NurseService();
            nurseService.setNurse(nurse);
            nurseService.setServiceName(request.getServiceName());
            nurseService.setServiceId(request.getServiceId());
            nurseService.setAvailable(true);

            // Create and add duty types
            List<DutyType> dutyTypes = new ArrayList<>();
            for (Map.Entry<String, Long> entry : request.getDutyType().entrySet()) {
                DutyType dutyType = new DutyType();
                dutyType.setNurseService(nurseService);
                dutyType.setDutyType(Duty.valueOf(entry.getKey()));
                dutyType.setServicePrice(entry.getValue());
                dutyTypes.add(dutyType);
            }
            nurseService.setDutyTypes(dutyTypes);

            // Save nurseService which cascades to save dutyTypes
            nurseServiceRepository.save(nurseService);

            // Add to services and save nurse
            services.add(nurseService);
            nurse.setNurseServices(services);
            nurseRepository.save(nurse);
        } else {
            throw new NurseNotFoundException("Nurse not found");
        }
    }

    @Override
    public Page<ServiceResponse> findServices(String username, Pageable pageable) {
        Page<NurseService>services =nurseServiceRepository.findServicesByNurseUsername(username,pageable);

        return services.map(service->{
            ServiceResponse response =new ServiceResponse();
            response.setServiceId(service.getServiceId());
            response.setServiceName(service.getServiceName());
            response.setId(service.getId());
            response.setAvailable(service.isAvailable());
            List<ServiceDutyResponse>dutyResponses=new ArrayList<>();
            for ( DutyType dutyType:service.getDutyTypes()){
                ServiceDutyResponse dutyResponse =new ServiceDutyResponse(
                        dutyType.getId()
                        ,dutyType.getDutyType(),
                        dutyType.getServicePrice());
                dutyResponses.add(dutyResponse);

            }
            response.setDutyTypes(dutyResponses);
            return response;
        });
    }

    @Override
    public Page<ServiceResponse> searchServices(String username, String searchKey, Pageable pageable) {
        Page<NurseService> servicesPage = nurseServiceRepository.searchServicesByNurseUsername(username, searchKey, pageable);

        return servicesPage.map(service -> {
            ServiceResponse response = new ServiceResponse();
            response.setServiceId(service.getServiceId());
            response.setServiceName(service.getServiceName());
            response.setId(service.getId());
            response.setAvailable(service.isAvailable());

            List<ServiceDutyResponse> dutyResponses = service.getDutyTypes().stream()
                    .map(dutyType -> new ServiceDutyResponse(dutyType.getId(), dutyType.getDutyType(), dutyType.getServicePrice()))
                    .collect(Collectors.toList());

            response.setDutyTypes(dutyResponses);
            return response;
        });
    }

    @Override
    @Transactional
    public void blockService(long serviceId, boolean status) {
        Optional<NurseService>optionalNurseService =nurseServiceRepository.findById(serviceId);
        if (optionalNurseService.isPresent()){
            NurseService service =optionalNurseService.get();
            service.setAvailable(status);
            nurseServiceRepository.save(service);

        }else {
          throw  new ServiceNotFoundException("service not found");
        }
    }

    @Override
    public ServiceResponse findServiceById(long serviceId) {
      NurseService nurseService=nurseServiceRepository.findById(serviceId).
              orElseThrow(()->new ServiceNotFoundException("service Not found"));

            ServiceResponse response =new ServiceResponse();
            response.setServiceName(nurseService.getServiceName());
            response.setServiceId(nurseService.getServiceId());
            response.setAvailable(nurseService.isAvailable());
            response.setId(nurseService.getId());
           List< ServiceDutyResponse>dutyResponses=nurseService.getDutyTypes().stream().map(service->{
               return new ServiceDutyResponse(service.getId(),
                       service.getDutyType(),
                       service.getServicePrice());

           }).toList();
           response.setDutyTypes(dutyResponses);
           return response;



    }

    @Override
    @Transactional
    public void deleteDutyType(long dutyId) {
        log.info("duty Id: {}",dutyId);
        if (dutyTypeRepository.existsById(dutyId)){
            dutyTypeRepository.deleteById(dutyId);
        }else {
            log.info("duty is not found :{}",dutyId);
        }

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
