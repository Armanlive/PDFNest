import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm NestBot, your PDF assistant. How can I help you today?",
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickReplies = [
    "Which tool should I use?",
    "How do I merge PDFs?",
    "Is my data secure?",
    "Are there any file size limits?"
  ];

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: getBotResponse(inputMessage),
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('merge')) {
      return "To merge PDFs, use our PDF Merge tool. Just upload your files, arrange them in the order you want, and download the combined document!";
    } else if (lowerMessage.includes('split')) {
      return "Our PDF Split tool lets you extract specific pages or split your document into multiple files. Perfect for organizing large documents!";
    } else if (lowerMessage.includes('compress')) {
      return "Use PDF Compress to reduce file size while maintaining quality. Great for email attachments or saving storage space!";
    } else if (lowerMessage.includes('secure') || lowerMessage.includes('safe')) {
      return "Absolutely! We use enterprise-grade encryption and delete all files after processing. Your documents are completely secure with us.";
    } else if (lowerMessage.includes('limit')) {
      return "We don't impose file size limits on our tools. You can process documents of any size, completely free!";
    } else {
      return "I'm here to help with any questions about our PDF tools. You can ask me about merging, splitting, compressing, converting, or securing your documents!";
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    handleSendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-theme-primary-btn hover:bg-theme-primary-btn text-white p-4 rounded-full shadow-theme-lg transition-all duration-200 transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-theme-card rounded-lg shadow-theme-lg border border-theme-border w-80 h-96 flex flex-col">
          {/* Header */}
          <div className="bg-theme-primary-btn text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              <span className="font-semibold">NestBot</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-theme-primary-btn text-white'
                      : 'bg-theme-secondary text-theme-primary'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs bg-theme-secondary hover:bg-theme-hover text-theme-secondary px-3 py-1 rounded-full transition-colors duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-theme-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-theme-card border border-theme-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-theme-primary"
              />
              <button
                onClick={handleSendMessage}
                className="bg-theme-primary-btn hover:bg-theme-primary-btn text-white p-2 rounded-lg transition-colors duration-200"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;