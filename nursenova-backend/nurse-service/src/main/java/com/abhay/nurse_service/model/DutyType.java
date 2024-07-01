package com.abhay.nurse_service.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @Enumerated(value = EnumType.STRING)
    private Duty dutyType;
    private Long servicePrice;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nurse_service_id", referencedColumnName = "id")
    @JsonBackReference
    private NurseService nurseService;
}
