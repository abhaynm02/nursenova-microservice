package com.abhay.nurse_service.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "nurse", uniqueConstraints = @UniqueConstraint(columnNames = "userName"))
public class Nurse {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;
    private String userName;
    private String phone;
    private long age;
    private String experience;
    private String education;
    private String profileImageLink;
    private String certificateImageLink;
    private String address;
    private String pin;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "nurseId", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Language> languages;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "nurse", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<NurseService> nurseServices;

    private boolean isVerified;
    private boolean status;
}
