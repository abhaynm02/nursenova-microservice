package com.abhay.nursenova_gateway.filter;

import com.abhay.nursenova_gateway.exceptions.AuthHeaderNotFoundException;
import com.abhay.nursenova_gateway.exceptions.TokenInvalidException;
import com.abhay.nursenova_gateway.service.JwtService;
import com.abhay.nursenova_gateway.utils.RouteValidator;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    private final RouteValidator routeValidator;
    private final JwtService jwtService;

    public AuthenticationFilter(RouteValidator routeValidator, JwtService jwtService) {
        super(Config.class);
        this.routeValidator = routeValidator;
        this.jwtService = jwtService;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            log.info("inside the gateway filter");
            if (routeValidator.isSecured.test(exchange.getRequest())){
                try {
                    if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                        throw  new AuthHeaderNotFoundException("missing Authorization header");
                    }
                }catch (AuthHeaderNotFoundException ignored){

                }

                String authHeader =exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeader != null && authHeader.startsWith("Bearer ")){
                    authHeader=authHeader.substring(7);
                }

                try {
                    jwtService.validateToken(authHeader);
                }catch (ExpiredJwtException e){
                    throw new TokenInvalidException("Token expired");
                }catch (Exception e){
                    throw new RuntimeException(e.getMessage());
                }

            }
            return chain.filter(exchange);

        });
    }

    public static class Config{

    }
}
