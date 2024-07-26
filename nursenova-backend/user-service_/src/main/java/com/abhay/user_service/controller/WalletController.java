package com.abhay.user_service.controller;

import com.abhay.user_service.dto.WalletRequest;
import com.abhay.user_service.model.WalletHistory;
import com.abhay.user_service.service.WalletService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/wallet")
@Slf4j
public class WalletController {
    private final WalletService walletService;
    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @PostMapping("/addFunds")
    public ResponseEntity<String> updateWalletFund(@RequestBody WalletRequest walletRequest){
        log.info("request reached user wallet controller");
        walletService.addFundsToWallet(walletRequest.getUserId(),walletRequest.getAmount());
        return ResponseEntity.ok("amount added successfully");
    }

    @PostMapping("/withdrawFunds")
    public ResponseEntity<String>withdrawFund(@RequestBody WalletRequest walletRequest){
        log.info("request reached user wallet controller");
        walletService.withdrawFromWallet(walletRequest.getUserId(),walletRequest.getAmount());
        return ResponseEntity.ok("amount withdraw successfully");
    }
    @GetMapping("/history/{userId}")
    public ResponseEntity<Page<WalletHistory>>walletHistory(@PathVariable String userId,
                                                            @RequestParam(defaultValue = "0")int page,
                                                            @RequestParam(defaultValue = "5")int size){
        Pageable pageable= PageRequest.of(page,size, Sort.by("id").descending());
        return new ResponseEntity<>(walletService.walletHistory(pageable,userId), HttpStatus.OK);

    }
    @GetMapping("/total/{userId}")
    public ResponseEntity<?>walletTotal(@PathVariable String userId){
        return ResponseEntity.ok(walletService.totalAmount(userId));
    }
}
