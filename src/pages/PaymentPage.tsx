import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendPayment } from '../services/paymentService';
import Toolbar from '../components/Toolbar';
import Overlay from '../components/Overlay';
import processingIcon from '../assets/icons/processing.svg';
import successIcon from '../assets/icons/success.svg';
import cashIcon from '../assets/icons/cash.svg';
import creditCardIcon from '../assets/icons/credit-card.svg';
import linkIcon from '../assets/icons/link.svg';
import pixIcon from '../assets/icons/pix.svg';

interface Order {
    orderId: string;
    amount: number;
}

interface PaymentData {
    selectedOrders: Order[];
    totalAmount: number;
}

const PaymentPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedOrders, totalAmount } = location.state as PaymentData;
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePayment = async () => {
        setProcessing(true);
        setTimeout(async () => {
            try {
                await sendPayment({
                    orders: selectedOrders.map((order) => ({
                        orderId: order.orderId,
                        amount: order.amount
                    })),
                    totalAmount
                });
                setPaymentSuccess(true);
                setTimeout(() => {
                    setProcessing(false);
                    navigate('/orders');
                }, 3000);
            } catch (error) {
                setProcessing(false);
                alert('Erro no pagamento, tente novamente.');
            }
        }, 2000);
    };

    const handlePaymentMethodSelect = (method: string) => {
        setPaymentMethod(method);
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCardNumber(value.slice(0, 16));
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setExpiryDate(value.slice(0, 4));
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setCvv(value.slice(0, 3));
    };

    return (
        <div className="min-h-screen">
            <Toolbar title="Pagamento" showBackButton showLogoutButton />
            <div className="p-4 bg-gray-100 flex flex-col items-center">
                <div className="text-lg mb-8">
                    <strong>Total a pagar:</strong> {totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8 w-full">
                    {[
                        { method: 'Dinheiro', icon: cashIcon },
                        { method: 'Débito', icon: creditCardIcon },
                        { method: 'Crédito', icon: creditCardIcon },
                        { method: 'Link', icon: linkIcon },
                        { method: 'Pix', icon: pixIcon }
                    ].map(({ method, icon }) => (
                        <div
                            key={method}
                            className={`p-4 bg-white shadow rounded text-center cursor-pointer ${paymentMethod === method ? 'border-2 border-red-500' : ''}`}
                            onClick={() => handlePaymentMethodSelect(method)}
                        >
                            <img src={icon} alt={method} className="mx-auto mb-2 w-8 h-8" />
                            <span className="text-sm">{method}</span>
                        </div>
                    ))}
                </div>
                {paymentMethod && (
                    <div className="w-full max-w-sm">
                        {(paymentMethod === 'Crédito' || paymentMethod === 'Débito') && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Número do Cartão"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    maxLength={16}
                                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Validade (MMYY)"
                                    value={expiryDate}
                                    onChange={handleExpiryDateChange}
                                    maxLength={4}
                                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="CVV"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    maxLength={3}
                                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                                />
                            </>
                        )}
                        <button
                            onClick={handlePayment}
                            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        >
                            Confirmar Pagamento
                        </button>
                    </div>
                )}
                {processing && (
                    <Overlay message="Processando pagamento..." isVisible={processing}>
                        <img src={processingIcon} alt="Processando pagamento" className="mx-auto mb-2 w-8 h-8 animate-spin" />
                    </Overlay>
                )}
                {paymentSuccess && (
                    <Overlay message="Pagamento aprovado!" isVisible={paymentSuccess}>
                        <img src={successIcon} alt="Pagamento aprovado" className="mx-auto mb-2 w-8 h-8" />
                    </Overlay>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;
