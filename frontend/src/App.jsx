import React from "react";
import { Routes, Route } from "react-router-dom";
import SetupPage from "./pages/SetupPage";
import ListingsPage from "./pages/ListingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import TradingPage from "./pages/TradingPage";
import OffersPage from "./pages/OffersPage";
import PanicPage from "./pages/PanicPage";

import { UserProvider } from "./context/UserProvider";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/trading/:name" element={<TradingPage />} />
        <Route path="/offers/:id" element={<OffersPage />} />
        <Route path="/panic" element={<PanicPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
