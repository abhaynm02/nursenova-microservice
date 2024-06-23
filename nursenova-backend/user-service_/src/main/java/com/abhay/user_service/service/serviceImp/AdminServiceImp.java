package com.abhay.user_service.service.serviceImp;

import com.abhay.user_service.dto.AllUserResponse;
import com.abhay.user_service.model.Role;
import com.abhay.user_service.model.User;
import com.abhay.user_service.repository.UserRepository;
import com.abhay.user_service.service.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<AllUserResponse> findAllUsers(Pageable pageable) {

       Page<User> users=userRepository.findByRole(pageable,Role.USER);
        return users.map(user->{
            return  new AllUserResponse(user.getId(),
                    user.getFirstname(),
                    user.getEmail(),
                    user.isStatus());
        });
    }


    @Override
    @Transactional
    public void blockUser(long id, boolean status) {
        userRepository.updateStatus(id,status);
    }

    @Override
    @Transactional
    public boolean blockNurse(String userName, boolean status) {
        Optional<User>optionalUser=userRepository.findByEmail(userName);
        if (optionalUser.isPresent()){
            long userId=optionalUser.get().getId();
            userRepository.updateStatus(userId,status);
            return true;
        }
        return false;
    }

    @Override
    public Page<AllUserResponse> searchUsers(Pageable pageable, String searchKey) {
        Page<User>users=userRepository.searchUsers(pageable, searchKey,Role.USER);
        return users.map(user->{
            return  new AllUserResponse(user.getId(),
                    user.getFirstname(),
                    user.getEmail(),
                    user.isStatus());
        });
    }
}
