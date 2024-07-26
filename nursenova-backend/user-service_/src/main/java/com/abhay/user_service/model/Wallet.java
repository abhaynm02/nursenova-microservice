package com.abhay.user_service.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Setter
@Getter
@AllArgsConstructor
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    @JsonBackReference
    private User user;
    @Column(name = "totalAmount", columnDefinition = "Decimal(10,2)")
    private double totalAmount;
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "wallet")
    @JsonManagedReference
    private Set<WalletHistory>walletHistories;

    public Wallet(){
        this.totalAmount =0.00;
    }

}
