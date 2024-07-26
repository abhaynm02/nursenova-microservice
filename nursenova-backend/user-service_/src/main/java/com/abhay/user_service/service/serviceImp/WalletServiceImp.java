package com.abhay.user_service.service.serviceImp;

import com.abhay.user_service.exceptions.customexception.UserNotFoundExceptions;
import com.abhay.user_service.model.User;
import com.abhay.user_service.model.Wallet;
import com.abhay.user_service.model.WalletHistory;
import com.abhay.user_service.model.WalletTransactionType;
import com.abhay.user_service.repository.UserRepository;
import com.abhay.user_service.repository.WalletHistoryRepository;
import com.abhay.user_service.repository.WalletRepository;
import com.abhay.user_service.service.WalletService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
@Slf4j
public class WalletServiceImp implements WalletService {
    private final WalletRepository walletRepository;
    private final WalletHistoryRepository walletHistoryRepository;
    private final UserRepository userRepository;

    public WalletServiceImp(WalletRepository walletRepository, WalletHistoryRepository walletHistoryRepository, UserRepository userRepository) {
        this.walletRepository = walletRepository;
        this.walletHistoryRepository = walletHistoryRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void addFundsToWallet(String userId, double amount) {
        User user = getUser(userId);
        log.info("request in wallet service");
        Wallet wallet =user.getWallet();
        if (wallet ==null){
            log.info("creating new wallet ");
            wallet  =new Wallet();
            wallet.setUser(user);
        }
        Set<WalletHistory> walletHistorySet=wallet.getWalletHistories();
        if (walletHistorySet==null){
            walletHistorySet=new HashSet<>();
            WalletHistory walletHistory = getWalletHistory();
            walletHistory.setAmount(amount);
            walletHistory.setDateTime(LocalDateTime.now());
            walletHistory.setWallet(wallet);
            walletHistory.setTransactionType(WalletTransactionType.CREDIT);
           walletHistoryRepository.save(walletHistory);
            walletHistorySet.add(walletHistory);
            walletHistory.setWallet(wallet);
            walletHistoryRepository.save(walletHistory);

        }else {
            WalletHistory walletHistory = getWalletHistory();
            walletHistory.setAmount(amount);
            walletHistory.setDateTime(LocalDateTime.now());
            walletHistory.setWallet(wallet);
            walletHistory.setTransactionType(WalletTransactionType.CREDIT);
            walletHistorySet.add(walletHistory);
            walletHistoryRepository.save(walletHistory);
        }
        wallet.setWalletHistories(walletHistorySet);
        wallet.setTotalAmount(wallet.getTotalAmount()+amount);
        walletRepository.save(wallet);
    }

    private static WalletHistory getWalletHistory() {
        return new WalletHistory();
    }


    @Override
    public void withdrawFromWallet(String userId, double amount) {
        User user=getUser(userId);
        log.info("in withdrawFromWallet method ");
        Wallet wallet=user.getWallet();
        Set<WalletHistory>walletHistorySet=wallet.getWalletHistories();
        WalletHistory walletHistory = getWalletHistory();
        walletHistory.setAmount(amount);
        walletHistory.setDateTime(LocalDateTime.now());
        walletHistory.setWallet(wallet);
        walletHistory.setTransactionType(WalletTransactionType.DEBIT);
        walletHistorySet.add(walletHistory);
        walletHistoryRepository.save(walletHistory);

        wallet.setTotalAmount(wallet.getTotalAmount()-amount);
        wallet.setWalletHistories(walletHistorySet);
        walletRepository.save(wallet);
        
    }

    @Override
    public Page<WalletHistory> walletHistory(Pageable pageable, String userId) {
        User user=getUser(userId);
        long id=user.getWallet().getId();
        return walletHistoryRepository.transactionHistory(id,pageable);
    }

    @Override
    public double totalAmount(String userId) {
        return getUser(userId).getWallet().getTotalAmount();
    }


    private User getUser(String userId) {
        return userRepository.findByEmail(userId).orElseThrow(()->new UserNotFoundExceptions("user not found "));
    }

}
