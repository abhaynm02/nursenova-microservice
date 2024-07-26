package com.abhay.user_service.service;

import com.abhay.user_service.model.WalletHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WalletService {
    void addFundsToWallet(String userId ,double amount);
    void withdrawFromWallet(String userId, double amount);
    Page<WalletHistory>walletHistory(Pageable pageable,String userId);
    double totalAmount(String userId);

}
