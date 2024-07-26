package com.abhay.user_service.repository;

import com.abhay.user_service.model.WalletHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WalletHistoryRepository extends JpaRepository<WalletHistory,Long> {
    @Query("SELECT w FROM WalletHistory w WHERE w.wallet.id= :userId")
    Page<WalletHistory> transactionHistory(@Param("userId") Long id, Pageable pageable);
}
