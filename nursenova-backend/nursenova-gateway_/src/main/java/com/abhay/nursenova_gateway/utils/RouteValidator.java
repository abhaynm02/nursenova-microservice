package com.abhay.nursenova_gateway.utils;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouteValidator {

    public static final List<String>ALLOWED =List.of("/register/details","/register/all","/register/test/services");

    public Predicate<ServerHttpRequest>isSecured=serverHttpRequest -> ALLOWED
            .stream()
            .noneMatch(uri->serverHttpRequest.getURI().getPath().startsWith(uri));
}
