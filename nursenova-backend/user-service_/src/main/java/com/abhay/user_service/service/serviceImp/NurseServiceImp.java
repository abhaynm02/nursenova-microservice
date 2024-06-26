package com.abhay.user_service.service.serviceImp;

import com.abhay.user_service.dto.ProfileDto;
import com.abhay.user_service.exceptions.customexception.InternalServiceDownException;
import com.abhay.user_service.exceptions.customexception.UserNotFoundExceptions;
import com.abhay.user_service.feignclient.NurseClient;
import com.abhay.user_service.model.User;
import com.abhay.user_service.repository.UserRepository;
import com.abhay.user_service.service.NurseService;
import feign.FeignException;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Slf4j
public class NurseServiceImp implements NurseService {
    private final UserRepository userRepository;
    private  final NurseClient nurseClient;

    public NurseServiceImp(UserRepository userRepository, NurseClient nurseClient) {
        this.userRepository = userRepository;
        this.nurseClient = nurseClient;
    }

    @Override
    @CircuitBreaker(name = "nurseServiceCircuitBreaker",fallbackMethod = "fallbackMethod")
    @Retry(name = "nurseServiceRetry",fallbackMethod = "fallbackMethod")
    public void updateProfile(ProfileDto profileDto) {
        Optional<User>optionalUser =userRepository.findByEmail(profileDto.getUsername());
        if (optionalUser.isPresent()){
            User user =optionalUser.get();
            try {
                nurseClient.updateNurseProfile(new ProfileDto(
                        profileDto.getFirstname(),
                        profileDto.getLastname(),
                        profileDto.getUsername(),
                        profileDto.getPhone()));
                user.setFirstname(profileDto.getFirstname());
                user.setLastname(profileDto.getLastname());
                user.setPhone(profileDto.getPhone());
                userRepository.save(user);

            }catch (FeignException ex) {
                throw new RuntimeException("Failed to block/unblock user", ex);
            } catch (Exception ex) {
                throw new RuntimeException("An unexpected error occurred", ex);
            }
        }else {
            throw new UserNotFoundExceptions("user not found with username");
        }
    }

    public boolean fallbackMethod(long nurseId, boolean status, Exception ex) {
        log.error("Circuit breaker fallback: Failed to block/unblock nurse. NurseId: {}, Status: {}", nurseId, status, ex);
        throw new InternalServiceDownException("Internal service is down please try again ");
    }
    }

