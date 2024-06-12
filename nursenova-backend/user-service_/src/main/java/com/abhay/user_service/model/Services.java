package com.abhay.user_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "services",uniqueConstraints = @UniqueConstraint(columnNames = "serviceName"))
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    private String serviceName;
    private long basePrice;
    private String description;
    private boolean status;
}
