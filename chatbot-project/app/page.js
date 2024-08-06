'use client';

import { useState, useRef, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Box, CircularProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatMessage from '../components/ChatMessage';
import ErrorMessage from '../components/ErrorMessage';

const quickReplies = [
  "How do I start a practice interview?",
  "What programming languages are covered?",
  "How can I track my progress?",
  "Is Headstarter really free?",
];

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to Headstarter Support! How can I assist you with our free interview preparation platform today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([
      { role: 'assistant', content: 'Chat history cleared. How can I assist you with Headstarter today?' },
    ]);
  };

  const handleQuickReply = (message) => {
    setInput(message);
    handleSubmit({ preventDefault: () => {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = { role: 'assistant', content: '' };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        assistantMessage.content += chunk;
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          assistantMessage,
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <a href="#chat-input" className="sr-only focus:not-sr-only">
        Skip to chat input
      </a>
      <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">
            Headstarter Free Support Assistant
          </Typography>
          <IconButton onClick={clearChat} aria-label="Clear chat history">
            <DeleteIcon />
          </IconButton>
        </Box>
        {error && <ErrorMessage message={error} />}
        <Paper
          ref={chatContainerRef}
          elevation={3}
          sx={{ height: 400, overflowY: 'auto', padding: 2, marginBottom: 2 }}
          aria-live="polite"
          aria-label="Chat messages"
        >
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}
        </Paper>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Quick Questions:
          </Typography>
          {quickReplies.map((reply, index) => (
            <Button
              key={index}
              variant="outlined"
              size="small"
              onClick={() => handleQuickReply(reply)}
              sx={{ mr: 1, mb: 1 }}
            >
              {reply}
            </Button>
          ))}
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            id="chat-input"
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
            aria-label="Chat input"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 1 }}
            disabled={isLoading}
            aria-label="Send message"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </Box>
    </>
  );
}