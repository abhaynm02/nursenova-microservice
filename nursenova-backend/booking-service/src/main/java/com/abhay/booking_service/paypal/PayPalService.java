package com.abhay.booking_service.paypal;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@Slf4j
public class PayPalService {

    private final APIContext apiContext;

    public PayPalService(APIContext apiContext) {
        this.apiContext = apiContext;
    }

    public Payment createPayment(
            Double total,
            String currency,
            String method,
            String intent,
            String description,
            String cancelUrl,
            String successUrl) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(String.format(Locale.forLanguageTag(currency),"%.2f", total));
        log.info("Creating payment with amount: {}, currency: {}, method: {}, intent: {}", total, currency, method, intent);

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method);

        Payment payment = new Payment();
        payment.setIntent(intent);
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        Payment createdPayment = payment.create(apiContext);
        log.info("Payment created with ID: {}", createdPayment.getId());
        return createdPayment;
    }
 // there is some issue in this code and there is no use for executing this function

//    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
//        try {
//            Payment payment = new Payment();
//            payment.setId(paymentId);
//            PaymentExecution paymentExecution = new PaymentExecution();
//            paymentExecution.setPayerId(payerId);
//            return payment.execute(apiContext, paymentExecution);
//        } catch (PayPalRESTException e) {
//            // Log the detailed error message
//            log.error("Error executing payment: {}", e.getMessage());
//            log.error("Response code: {}, Error response: {}", e.getResponsecode(), e.getDetails());
//            throw e;
//        }
//    }


}

