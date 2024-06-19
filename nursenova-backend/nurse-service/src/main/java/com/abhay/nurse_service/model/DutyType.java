package com.abhay.nurse_service.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class DutyType {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String dutyType;
    private long servicePrice;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nurse_service_id", referencedColumnName = "id")
    private NurseService nurseService;
}
