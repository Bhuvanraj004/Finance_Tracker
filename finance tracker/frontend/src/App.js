import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
