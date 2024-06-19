package com.abhay.user_service.service.serviceImp;

import com.abhay.user_service.dto.AllUserResponse;
import com.abhay.user_service.model.Role;
import com.abhay.user_service.model.User;
import com.abhay.user_service.repository.UserRepository;
import com.abhay.user_service.service.AdminService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImp implements AdminService {

    private final UserRepository userRepository;

    public AdminServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<AllUserResponse> findAllUsers() {

        Optional<List<User>>users=userRepository.findByRole(Role.USER);
        List<User> userList=users.get();

        return userList.stream().map(user->{
            return  new AllUserResponse(user.getId(),
                    user.getFirstname(),
                    user.getEmail(),
                    user.isStatus());
        }).toList();
    }


    @Override
    @Transactional
    public void blockUser(long id, boolean status) {
        userRepository.updateStatus(id,status);
    }

    @Override
    public void blockNurse(String userName, boolean status) {
        Optional<User>optionalUser=userRepository.findByEmail(userName);
        if (optionalUser.isPresent()){
            long userId=optionalUser.get().getId();
            userRepository.updateStatus(userId,status);
        }
    }
}
