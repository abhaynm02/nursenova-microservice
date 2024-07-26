import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

class WebSocketService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.messageHandlers = [];
  }

  connect(userId) {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:65413/chat-service/ws'),
      connectHeaders: {
        userId: userId,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      this.isConnected = true;
      console.log('Connected: ' + frame);
      this.client.subscribe(`/user/${userId}/queue/messages`, this.onMessageReceived);
    };

    this.client.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  disconnect() {
    if (this.client !== null) {
      this.client.deactivate();
    }
    this.isConnected = false;
  }

  sendMessage(message) {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        this.client.publish({
          destination: '/app/chat',
          body: JSON.stringify(message),
        });
        resolve();
      } else {
        console.log('Not connected');
        reject(new Error('WebSocket is not connected'));
      }
    });
  }

  onMessageReceived = (message) => {
    const notification = JSON.parse(message.body);
    console.log('Received message:', notification);
    this.messageHandlers.forEach(handler => handler(notification));
  };

  addMessageHandler(handler) {
    this.messageHandlers.push(handler);
  }

  removeMessageHandler(handler) {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
  }
}

export default new WebSocketService();