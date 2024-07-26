package com.abhaynm.chat_service.chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/chat-service")
@Slf4j
public class ChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage){
        ChatMessage savedMsg=chatMessageService.saveChat(chatMessage);
        log.info("in processMessage:_________________");
        simpMessagingTemplate.convertAndSendToUser(chatMessage.getRecipientId(),"/queue/messages",
                ChatNotification.builder()
                        .id(savedMsg.getId())
                        .senderId(savedMsg.getSenderId())
                        .recipientId(savedMsg.getRecipientId())
                        .content(savedMsg.getContent())
                        .status(true)
                        .build()
                );
    }

    @GetMapping("/message/{senderId}/{recipientId}")
    public ResponseEntity<List<ChatMessage>>findChatMessage(@PathVariable("senderId")String senderId,
                                                            @PathVariable("recipientId")String recipientId){
        log.info("in findChatMessage_______________________");
          return ResponseEntity.ok(chatMessageService.findChatMessages(senderId,recipientId));
    }
    @PostMapping("/un-read/message/{senderId}/{recipientId}")
    public ResponseEntity<String>updateMessageStatus(@PathVariable("senderId")String senderId,
                                                     @PathVariable("recipientId")String recipientId){
        chatMessageService.updateMessageStatus(senderId,recipientId);
        return ResponseEntity.ok("messageUpdate SuccessFully");
    }
    @GetMapping("/test")
    public ResponseEntity<String>testMethod(){
        log.info("test message hit successfully ");
        return ResponseEntity.ok("hello from chat service");
    }
}
