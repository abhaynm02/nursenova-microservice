package com.abhay.booking_service.feignclient;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class FeignClientInterceptor implements RequestInterceptor {
    private static final String AUTHORIZATION_HEADER="Authorization";
    @Override
    public void apply(RequestTemplate requestTemplate) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            log.info("Authentication object: {}", authentication);
            if (authentication.getCredentials() instanceof String) {
                String jwtToken = (String) authentication.getCredentials();
                log.info("JWT token: {}", jwtToken);
                requestTemplate.header(AUTHORIZATION_HEADER, "Bearer " + jwtToken);
            } else {
                log.warn("Authentication credentials are not a String, unable to extract JWT token");
            }
        } else {
            log.warn("Authentication object is null");
        }
    }
}
