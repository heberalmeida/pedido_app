import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import PaymentPage from './pages/PaymentPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default App;
