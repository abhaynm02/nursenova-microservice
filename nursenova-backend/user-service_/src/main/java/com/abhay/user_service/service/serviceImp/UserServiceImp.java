package com.abhay.user_service.service.serviceImp;

import com.abhay.user_service.dto.PassWordUpdateDto;
import com.abhay.user_service.dto.ProfileDto;
import com.abhay.user_service.exceptions.customexception.IncorrectPasswordException;
import com.abhay.user_service.exceptions.customexception.UserNotFoundExceptions;
import com.abhay.user_service.model.User;
import com.abhay.user_service.repository.UserRepository;
import com.abhay.user_service.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserServiceImp implements UserService {
    private  final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImp(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ProfileDto findProfile(String username) {
        Optional<User> user =userRepository.findByEmail(username);
        if (user.isEmpty()){
            throw new UserNotFoundExceptions("There is some issue please login again ");
        }
     User user1=user.get();
        return new ProfileDto(
                 user1.getFirstname(),
                 user1.getLastname(),
                 user1.getEmail(),
                 user1.getPhone());
    }

    @Override
    public void updateProfile(ProfileDto profileDto) {
        Optional<User> user=userRepository.findByEmail(profileDto.getUsername());
        if (user.isEmpty()){
            throw  new UserNotFoundExceptions("There is some issue please login again");

        }
        User user1=user.get();
        user1.setFirstname(profileDto.getFirstname());
        user1.setLastname(profileDto.getLastname());
        user1.setPhone(profileDto.getPhone());
        userRepository.save(user1);
    }

    @Override
    public void updatePassword(PassWordUpdateDto updateDto) {

        Optional<User>optionalUser=userRepository.findByEmail(updateDto.getUsername());
        if (optionalUser.isEmpty()){
            throw  new UserNotFoundExceptions("There is some issue please login again");
        }
        User user=optionalUser.get();
        if (!passwordEncoder.matches( updateDto.getOldPassword(),user.getPassword())){
            throw new IncorrectPasswordException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(updateDto.getPassword()));
        userRepository.save(user);

    }
}
