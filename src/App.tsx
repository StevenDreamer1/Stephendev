import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainEntryPage from "@/pages/MainEntryPage"; // Adjusted import path to use alias
import Index from "@/pages/Index"; // Adjusted import path to use alias
import NotFound from "@/pages/NotFound"; // Adjusted import path to use alias
import ChatbotWidget from "@/components/chatbot/ChatbotWidget"; // Adjusted import path to use alias

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <MainEntryPage />
                <Index />
              </>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Render the ChatbotWidget outside of Routes so it's always present */}
        <ChatbotWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
