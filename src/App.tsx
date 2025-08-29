import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Hello World from App.tsx!</div>} />
      {/* Temporarily remove other routes for debugging */}
      {/* <Route path="/sams-ai" element={<SamsAiPage />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </BrowserRouter>
);

export default App;
