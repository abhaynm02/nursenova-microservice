import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import WebSocketService from '../service/WebSocketService';

const ChatModal = ({ senderId, recipientId, isOpen, onClose}) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const fetchChatHistory = async () => {
        try {
          const response1 = await axios.get(`http://localhost:65413/chat-service/message/${senderId}/${recipientId}`);
          const response2 = await axios.get(`http://localhost:65413/chat-service/message/${recipientId}/${senderId}`);
          const response3= await axios.post(`http://localhost:65413/chat-service/un-read/message/${recipientId}/${senderId}`);
          
          const allMessages = [...response1.data, ...response2.data];
          const sortedMessages = allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          
          setMessages(sortedMessages);
        } catch (error) {
          console.error('Error fetching chat history:', error);
        }
      };

      fetchChatHistory();

      WebSocketService.connect(senderId);
      WebSocketService.addMessageHandler(handleMessage);

      return () => {
        WebSocketService.removeMessageHandler(handleMessage);
        WebSocketService.disconnect();
      };
    }
  }, [isOpen, senderId, recipientId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessage = (message) => {
    console.log(message);
    setMessages(prevMessages => {
      const newMessage = {
        ...message,
        timestamp: new Date().toISOString(),
        status:true
      };
      const updatedMessages = [...prevMessages, newMessage];
      return updatedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const message = {
      senderId: senderId,
      recipientId: recipientId,
      content: inputMessage,
    };
    WebSocketService.sendMessage(message);
    setMessages(prevMessages => {
      const newMessage = {
        ...message,
        timestamp: new Date().toISOString()
      };
      const updatedMessages = [...prevMessages, newMessage];
      return updatedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    });
    setInputMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[80vh] flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-3">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-semibold">{recipientId}</h2>
            {/* <p className="text-sm text-gray-500">Online</p> */}
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={msg.id || index} className={`flex ${msg.senderId === senderId ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] px-4 py-2 rounded-lg ${
              msg.senderId === senderId ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}>
              <p className="break-words">{msg.content}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs opacity-70">{formatTime(msg.timestamp)}</p>
                {msg.senderId === senderId && (
                  <span className={`text-xs ${msg.status ? 'text-green-500' : 'text-gray-500'}`}>
                    {msg.status ? 'Read' : 'Sent'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ChatModal;