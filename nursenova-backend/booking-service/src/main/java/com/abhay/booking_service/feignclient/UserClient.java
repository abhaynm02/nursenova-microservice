package com.abhay.booking_service.feignclient;

import com.abhay.booking_service.dto.NurseDto;
import com.abhay.booking_service.dto.WalletRequest;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service", url = "${application.config.user-url}",
        configuration = FeignClientConfiguration.class)
public interface UserClient {

    @PostMapping("/wallet/addFunds")
    @CircuitBreaker(name = "nurseService", fallbackMethod = "addFundWalletFallback")
    @Retry(name = "nurseService", fallbackMethod = "addFundWalletFallback")
    ResponseEntity<Void> addFundWallet(@RequestBody WalletRequest walletRequest);

    @PostMapping("/wallet/withdrawFunds")
    @CircuitBreaker(name = "nurseService", fallbackMethod = "withdrawFoundFallback")
    @Retry(name = "nurseService", fallbackMethod = "withdrawFoundFallback")
    ResponseEntity<Void> withdrawFound(@RequestBody WalletRequest walletRequest);

    @GetMapping("/wallet/total/{userId}")
    @CircuitBreaker(name = "nurseService", fallbackMethod = "walletBalanceFallback")
    @Retry(name = "nurseService", fallbackMethod = "walletBalanceFallback")
    ResponseEntity<Double> walletBalance(@PathVariable String userId);

    default ResponseEntity<Double> walletBalanceFallback(String userId, Throwable throwable) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
    }
    default ResponseEntity<Void> addFundWalletFallback(WalletRequest walletRequest, Throwable throwable) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
    }

    default ResponseEntity<Void> withdrawFoundFallback(WalletRequest walletRequest, Throwable throwable) {

        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).build();
    }
}
