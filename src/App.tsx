import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainEntryPage from "./pages/MainEntryPage"; // Adjusted import path to relative
import Index from "./pages/Index"; // Adjusted import path to relative
import NotFound from "./pages/NotFound"; // Adjusted import path to relative

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* The root path now renders both MainEntryPage and Index on the same page */}
          <Route 
            path="/" 
            element={
              <>
                <MainEntryPage />
                <Index /> {/* Render Index directly after MainEntryPage */}
              </>
            } 
          />
          {/* The /portfolio route is no longer needed as Index is rendered directly */}
          {/* <Route path="/portfolio" element={<Index />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
