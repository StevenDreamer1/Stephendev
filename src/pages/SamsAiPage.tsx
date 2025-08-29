import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, MessageSquare, Code, Terminal, X } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Keep alias for UI components
import { Textarea } from '@/components/ui/textarea'; // Corrected typo: removed 's' after Textarea
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Keep alias for UI components
import { ScrollArea } from '@/components/ui/scroll-area'; // Keep alias for UI components
import ParticleBackground from '../components/animations/ParticleBackground'; // Explicit relative path

// Define the chat message type
interface ChatMessage {
  role: 'user' | 'model' | 'code';
  parts: { text: string; language?: string }[];
}

const SamsAiPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const codeOutputRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (codeOutputRef.current) {
      codeOutputRef.current.scrollTop = codeOutputRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessageToGemini = async (userMessage: string) => {
    setIsLoading(true);
    const newMessages = [...messages, { role: 'user', parts: [{ text: userMessage }] }];
    setMessages(newMessages);
    setInput('');

    try {
      const payload = {
        contents: newMessages,
      };
      const apiKey = "AIzaSyAKcfLWFxjVe3TeUdF2BX8bqp2DsHneRRM"; 
      
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
        const modelResponsePart = result.candidates[0].content.parts[0];
        
        const codeMatch = modelResponsePart.text.match(/```(\w+)\n([\s\S]*?)```/);
        if (codeMatch) {
          const language = codeMatch[1];
          const code = codeMatch[2];
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'code', parts: [{ text: code, language: language }] }
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'model', parts: [{ text: modelResponsePart.text }] }
          ]);
        }
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

  const copyToClipboard = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background text-foreground overflow-hidden font-mono">
      <ParticleBackground />
      <Card className="relative z-10 w-[90vw] h-[90vh] max-w-5xl bg-card shadow-xl flex flex-col border border-card-border rounded-lg overflow-hidden animate-fade-in-scale">
        <CardHeader className="bg-muted p-4 flex flex-row items-center justify-between border-b border-card-border">
          <CardTitle className="text-lg font-bold text-primary flex items-center">
            <Terminal className="w-5 h-5 mr-2 text-accent" /> SAMS.ai Console
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={() => window.location.href = '/'} aria-label="Close Console">
            <X className="w-5 h-5 text-text-secondary" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col-reverse" ref={scrollRef}>
          {isLoading && (
            <div className="mb-3 p-3 rounded-lg bg-muted text-text-secondary mr-auto rounded-bl-none max-w-[85%]">
              <div className="flex space-x-1">
                <span className="animate-bounce-dot delay-0">.</span>
                <span className="animate-bounce-dot delay-100">.</span>
                <span className="animate-bounce-dot delay-200">.</span>
              </div>
            </div>
          )}
          {messages.slice().reverse().map((msg, index) => (
            <div key={index} className="mb-3">
              {msg.role === 'user' && (
                <div className="flex justify-end">
                  <div className="p-3 rounded-lg bg-primary/10 text-text-primary rounded-br-none max-w-[85%]">
                    <p className="text-sm leading-relaxed">{msg.parts[0].text}</p>
                  </div>
                </div>
              )}
              {msg.role === 'model' && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-lg bg-muted text-text-secondary rounded-bl-none max-w-[85%]">
                    <p className="text-sm leading-relaxed">{msg.parts[0].text}</p>
                  </div>
                </div>
              )}
              {msg.role === 'code' && (
                <div className="flex justify-start">
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg rounded-bl-none max-w-[95%] overflow-x-auto text-sm relative">
                    <pre ref={codeOutputRef} className="whitespace-pre-wrap"><code>{msg.parts[0].text}</code></pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard(msg.parts[0].text)}
                    >
                      <Code className="w-4 h-4 mr-1" /> Copy
                    </Button>
                    <div className="text-right text-gray-500 text-xs mt-1">Language: {msg.parts[0].language || 'unknown'}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center text-text-secondary mt-10">
              Hi there! I'm SAMS.ai, your personal AI assistant. Ask me to generate code, answer questions, or just chat!
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted p-4 border-t border-card-border flex items-center">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask SAMS.ai anything..."
            className="flex-1 resize-none h-10 min-h-[40px] max-h-[120px] bg-input text-foreground border-border mr-2"
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground w-10 h-10 p-0 flex-shrink-0">
            <Send className="w-5 h-5" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SamsAiPage;
