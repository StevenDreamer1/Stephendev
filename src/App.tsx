import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Using explicit relative paths from src/ for maximum compatibility
import MainEntryPage from "../src/pages/MainEntryPage"; 
import Index from "../src/pages/Index";
import NotFound from "../src/pages/NotFound";
import SamsAiPage from "../src/pages/SamsAiPage";

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
          <Route path="/sams-ai" element={<SamsAiPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
