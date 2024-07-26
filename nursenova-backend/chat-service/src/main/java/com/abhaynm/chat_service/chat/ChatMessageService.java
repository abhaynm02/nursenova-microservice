package com.abhaynm.chat_service.chat;

import com.abhaynm.chat_service.chatroom.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;

    public ChatMessage saveChat(ChatMessage chatMessage){
        var chatId =chatRoomService.getChatRoomId(chatMessage.getSenderId()
                ,chatMessage.getRecipientId(),
                true).orElseThrow();
          chatMessage.setChatId(chatId);
          chatMessage.setTimestamp(LocalDateTime.now());
          chatMessageRepository.save(chatMessage);
          return chatMessage;

    }
    public List<ChatMessage>findChatMessages(String senderId,String recipientId){
        var chatId=chatRoomService.getChatRoomId(senderId,recipientId,false);
        return chatId.map(chatMessageRepository::findByChatId).orElse(new ArrayList<>());
    }

    public void updateMessageStatus(String senderId,String recipientId){
        var chatId=chatRoomService.getChatRoomId(senderId,recipientId,false);
        chatId.ifPresent(id -> {
            List<ChatMessage> chatMessages = chatMessageRepository.findByChatId(id);
            chatMessages.stream()
                    .filter(chatMessage -> !chatMessage.isStatus())
                    .forEach(chatMessage -> chatMessage.setStatus(true));
            chatMessageRepository.saveAll(chatMessages);
        });
    }
}
