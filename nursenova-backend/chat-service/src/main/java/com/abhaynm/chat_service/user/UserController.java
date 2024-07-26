package com.abhaynm.chat_service.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    public User addUser(User user){
        userService.saveUser(user);
        return user;
    }
}
