import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SetupPage from './pages/SetupPage';
import ListingsPage from './pages/ListingsPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <html>
    <Routes>
      <Route path="/" element={<SetupPage />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </html>
  );
}

export default App
