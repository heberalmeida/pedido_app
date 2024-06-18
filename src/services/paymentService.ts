import api from './api';

interface Order {
    orderId: string;
    amount: number;
}

interface PaymentData {
    orders: Order[];
    totalAmount: number;
}

export const sendPayment = async (data: PaymentData) => {
    return await api.post('/financeiro/retorno', data);
};
