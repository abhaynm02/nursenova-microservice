package com.abhay.nurse_service.service.serviceImp;

import com.abhay.nurse_service.dto.ServiceAddRequest;
import com.abhay.nurse_service.model.DutyType;
import com.abhay.nurse_service.model.Nurse;
import com.abhay.nurse_service.model.NurseService;
import com.abhay.nurse_service.repository.DutyTypeRepository;
import com.abhay.nurse_service.repository.NurseRepository;
import com.abhay.nurse_service.repository.NurseServiceRepository;
import com.abhay.nurse_service.service.NurseServiceI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public void addService(ServiceAddRequest request) {
        Optional<Nurse> optionalNurse =nurseRepository.findByUserName(request.getNurseId());
        if (optionalNurse.isPresent()){
            Nurse nurse=optionalNurse.get();
            List<NurseService>services=nurse.getNurseServices();
            if (services==null){
                services=new ArrayList<>();
            }
            if(services.stream().anyMatch(nurseService -> nurseService.getServiceName().equals(request.getServiceName()))){
             throw new RuntimeException("Service Already added");
            }
            NurseService nurseService =new NurseService();
            nurseService.setNurse(nurse);
            nurseService.setServiceName(request.getServiceName());
            nurseService.setServiceId(request.getServiceId());
            nurseService.setAvailable(true);
            nurseServiceRepository.save(nurseService);
            List<DutyType>dutyTypes = new ArrayList<>();
            for (Map.Entry<String,Long>entry:request.getDutyType().entrySet()){
                DutyType dutyType =new DutyType();
                dutyType.setNurseService(nurseService);
                dutyType.setDutyType(entry.getKey());
                dutyType.setServicePrice(entry.getValue());
                dutyTypeRepository.save(dutyType);
                dutyTypes.add(dutyType);
            }
            nurseServiceRepository.save(nurseService);
            services.add(nurseService);
            nurseRepository.save(nurse);
        }
    }
}
