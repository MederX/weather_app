// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import HomePage from './pages/HomePage';
import HourlyForecast from './pages/HourlyForecast';
import DailyForecast from './pages/DailyForecast';
import HistoricalData from './pages/HistoricalData';
import UVIndex from './pages/UVIndex';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hourly" element={<HourlyForecast />} />
        <Route path="/daily" element={<DailyForecast />} />
        <Route path="/historical" element={<HistoricalData />} />
        <Route path="/uvindex" element={<UVIndex />} />
      </Routes>
    </Router>
  );
};

export default App;
