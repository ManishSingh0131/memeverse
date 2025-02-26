// src/hooks/useWebSocket.js
import { useState, useEffect } from 'react';

const useWebSocket = (url) => {
  const [message, setMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create WebSocket connection
    const socket = new WebSocket(url);
    setSocket(socket);

    // Connection opened
    socket.onopen = () => {
      console.log('WebSocket is connected!');
      setConnected(true);
    };

    // Listen for messages
    socket.onmessage = (event) => {
      setMessage(event.data);
      console.log('Received message: ', event.data);
    };

    // Handle connection close
    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setConnected(false);
    };

    // Handle errors
    socket.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, [url]);

  return { message, connected, socket };
};

export default useWebSocket;
