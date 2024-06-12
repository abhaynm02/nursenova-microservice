package com.abhay.user_service.service.serviceImp;

import com.abhay.user_service.dto.ServiceAddRequest;
import com.abhay.user_service.dto.ServiceResponse;
import com.abhay.user_service.exceptions.customexception.DuplicateServiceNameException;
import com.abhay.user_service.exceptions.customexception.ServiceNotFoundException;
import com.abhay.user_service.model.Services;
import com.abhay.user_service.repository.ServicesRepository;
import com.abhay.user_service.service.ServicesService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ServicesImp implements ServicesService {

    private final ServicesRepository servicesRepository;

    public ServicesImp(ServicesRepository servicesRepository) {
        this.servicesRepository = servicesRepository;
    }

    @Override
    public void addServices(ServiceAddRequest request) {
        if (servicesRepository.existsByServiceName(request.getServiceName())){
            throw new DuplicateServiceNameException("The service name is already exists");
        }
        Services service = new Services();
        service.setServiceName(request.getServiceName().toUpperCase());
        service.setDescription(request.getDescription());
        service.setBasePrice(request.getBasePrice());
        service.setStatus(true);
        servicesRepository.save(service);

    }

    @Override
    public void editServices( long id,ServiceResponse request) {
        Optional<Services>services =servicesRepository.findById(id);
       if (services.isPresent()){
           try {
               Services services1 =services.get();
               services1.setServiceName(request.getServiceName().toUpperCase());
               services1.setBasePrice(request.getBasePrice());
               services1.setDescription(request.getDescription());
               servicesRepository.save(services1);
           }catch (Exception e){
               throw new DuplicateServiceNameException("The service name is already exits ");
           }

        }else {
           throw  new ServiceNotFoundException("Service not found ");
       }
    }

    @Override
    @Transactional
    public void blockServices(long id,boolean status) {
        servicesRepository.updateStatus(id,status);
    }

    @Override
    public List<ServiceResponse> findAllServices() {
        List<Services>services =servicesRepository.findAll();
       return  services.stream().map(service->{
          return new ServiceResponse(service.getId(),
                  service.getServiceName(),
                  service.getDescription(),service.getBasePrice(),
                  service.isStatus());
       }).toList();

    }

    @Override
    public ServiceResponse findServiceById(long id) {
        Optional<Services> service=servicesRepository.findById(id);
        return new ServiceResponse(service.get().getId(),
                service.get().getServiceName(),
                service.get().getDescription(),service.get().getBasePrice()
                ,service.get().isStatus());
    }

    @Override
    public List<ServiceResponse>findAllActiveServices() {

        List<Services>services= servicesRepository.findByStatus(true);
        return services.stream().map(service->{
            return new ServiceResponse( service.getId(),
                    service.getServiceName(),
                    service.getDescription(),service.getBasePrice(),
                    service.isStatus());
        }).toList();
    }
}
