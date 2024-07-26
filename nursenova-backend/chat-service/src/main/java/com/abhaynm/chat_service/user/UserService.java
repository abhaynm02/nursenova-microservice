package com.abhaynm.chat_service.user;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository respository;

    public void saveUser(User user){
        user.setStatus(Status.ONLINE);
        respository.save(user);

    }
    public void  disconnect(User user){
        var storedUser =respository.findById(user.getId()).orElse(null);
        if (storedUser != null){
            storedUser.setStatus(Status.OFFLINE);
            respository.save(storedUser);
        }
    }

    public List<User>findConnectedUsers(){
        return respository.findAllByStatus(Status.ONLINE);
    }
}
