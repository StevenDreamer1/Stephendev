import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define the chat message type
interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to call the Gemini API
  const sendMessageToGemini = async (userMessage: string) => {
    setIsLoading(true);
    const newMessages = [...messages, { role: 'user', parts: [{ text: userMessage }] }];
    setMessages(newMessages);
    setInput('');

    try {
      const payload = {
        contents: newMessages,
      };
      // IMPORTANT: Paste your actual Google Gemini API key here.
      // Example: const apiKey = "YOUR_GEMINI_API_KEY_HERE";
      const apiKey = ""; // Replace this empty string with your API Key
      
      if (!apiKey) {
        throw new Error("Google Gemini API Key is missing. Please provide it in ChatbotWidget.tsx");
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Failed to fetch from Gemini API');
      }

      const result = await response.json();
      
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const modelResponseText = result.candidates[0].content.parts[0].text;
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'model', parts: [{ text: modelResponseText }] }
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'model', parts: [{ text: 'Sorry, I could not get a response.' }] }
        ]);
      }
    } catch (error: any) {
      console.error('Error sending message to Gemini:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'model', parts: [{ text: `Error: ${error.message || 'Something went wrong.'}` }] }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() && !isLoading) {
      sendMessageToGemini(input.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close Chatbot' : 'Open Chatbot'}
      >
        {isOpen ? <X className="w-6 h-6 text-primary-foreground" /> : <MessageSquare className="w-6 h-6 text-primary-foreground" />}
      </Button>

      {isOpen && (
        <Card className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-card shadow-xl flex flex-col border border-card-border rounded-lg overflow-hidden animate-fade-in-scale">
          <CardHeader className="bg-muted p-4 flex flex-row items-center justify-between border-b border-card-border">
            <CardTitle className="text-lg font-bold text-text-primary">AI Assistant</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close Chatbot">
              <X className="w-5 h-5 text-text-secondary" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-y-auto custom-scrollbar" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="text-center text-text-secondary mt-10">
                Hi there! How can I help you today?
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 p-3 rounded-lg max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-primary/10 text-text-primary ml-auto rounded-br-none'
                      : 'bg-muted text-text-secondary mr-auto rounded-bl-none'
                  }`}
                >
                  {msg.parts.map((part, pIndex) => (
                    <p key={pIndex} className="text-sm leading-relaxed">{part.text}</p>
                  ))}
                </div>
              ))
            )}
            {isLoading && (
              <div className="mb-3 p-3 rounded-lg bg-muted text-text-secondary mr-auto rounded-bl-none max-w-[85%]">
                <div className="flex space-x-1">
                  <span className="animate-bounce-dot delay-0">.</span>
                  <span className="animate-bounce-dot delay-100">.</span>
                  <span className="animate-bounce-dot delay-200">.</span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-muted p-4 border-t border-card-border flex items-center">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 resize-none h-10 min-h-[40px] max-h-[120px] bg-input text-foreground border-border mr-2"
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground w-10 h-10 p-0 flex-shrink-0">
              <Send className="w-5 h-5" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ChatbotWidget;
