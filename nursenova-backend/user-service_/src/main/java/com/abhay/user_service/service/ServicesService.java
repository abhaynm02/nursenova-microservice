package com.abhay.user_service.service;

import com.abhay.user_service.dto.ServiceAddRequest;
import com.abhay.user_service.dto.ServiceResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ServicesService {
  void   addServices(ServiceAddRequest request);
  void  editServices( long id,ServiceResponse request);
  void blockServices(long id,boolean status);
  Page<ServiceResponse> findAllServices(Pageable pageable);
  Page<ServiceResponse>searchServices(Pageable pageable,String searchKey);
  ServiceResponse findServiceById(long id);
  List<ServiceResponse> findAllActiveServices();

}
