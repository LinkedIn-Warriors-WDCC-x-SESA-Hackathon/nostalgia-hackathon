import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SetupPage from './pages/SetupPage';
import ListingsPage from './pages/ListingsPage';
import NotFoundPage from './pages/NotFoundPage';

import { UserProvider } from './context/UserProvider'

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App
