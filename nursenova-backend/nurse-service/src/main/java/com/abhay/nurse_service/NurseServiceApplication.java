package com.abhay.nurse_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class NurseServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(NurseServiceApplication.class, args);
	}

}
