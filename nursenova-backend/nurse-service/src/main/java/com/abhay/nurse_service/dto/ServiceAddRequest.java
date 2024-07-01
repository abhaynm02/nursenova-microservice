package com.abhay.nurse_service.dto;

import com.abhay.nurse_service.model.Duty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ServiceAddRequest {
    private String nurseId;
    private String serviceName;
    private  long serviceId;
    private Map<String,Long>dutyType;

    @Override
    public String toString() {
        return "ServiceAddRequest{" +
                "nurseId='" + nurseId + '\'' +
                ", serviceName='" + serviceName + '\'' +
                ", serviceId=" + serviceId +
                ", dutyType=" + dutyType +
                '}';
    }
}
