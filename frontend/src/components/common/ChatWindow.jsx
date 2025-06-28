import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const ChatWindow = ({ complaintId, name }) => {
  const [messageInput, setMessageInput] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageWindowRef = useRef(null);

  const fetchMessageList = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/messages/${complaintId}`);
      setMessageList(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [complaintId]);

  useEffect(() => {
    fetchMessageList();
  }, [fetchMessageList]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    if (messageWindowRef.current) {
      messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim()) return;
    try {
      const newMessage = {
        name,
        message: messageInput,
        complaintId,
      };
      const response = await axios.post('http://localhost:8000/messages', newMessage);
      setMessageList((prev) => [...prev, response.data]);
      setMessageInput('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h5 className="chat-header">💬 Message Box</h5>
      <div className="message-window" ref={messageWindowRef}>
        {messageList.slice().reverse().map((msg) => (
          <div
            key={msg._id}
            className={`message ${msg.name === name ? 'sent' : 'received'}`}
          >
            <div className="message-text">{msg.message}</div>
            <div className="message-meta">
              <span className="message-sender">{msg.name}</span>
              <span className="message-time">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{" "}
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container mt-2">
        <textarea
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="btn btn-success mt-2" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
