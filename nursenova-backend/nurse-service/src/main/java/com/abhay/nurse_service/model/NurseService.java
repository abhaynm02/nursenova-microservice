package com.abhay.nurse_service.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NurseService {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private long serviceId;
    private String serviceName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nurse_id", referencedColumnName = "id")
    @JsonBackReference
    private Nurse nurse;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "nurseService", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<DutyType> dutyTypes;
    private boolean isAvailable;
}
