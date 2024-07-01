package com.abhay.nurse_service.dto;

import com.abhay.nurse_service.model.Duty;
import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServiceDutyResponse {
   private long id;
   private Duty dutyType;
   private long servicePrice;
}
