package com.abhay.user_service.service;

import com.abhay.user_service.dto.ServiceAddRequest;
import com.abhay.user_service.dto.ServiceResponse;

import java.util.List;

public interface ServicesService {
  void   addServices(ServiceAddRequest request);
  void  editServices( long id,ServiceResponse request);
  void blockServices(long id,boolean status);
  List<ServiceResponse>findAllServices();
  ServiceResponse findServiceById(long id);
  List<ServiceResponse> findAllActiveServices();

}
