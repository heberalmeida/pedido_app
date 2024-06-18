import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../services/orderService';
import Toolbar from '../components/Toolbar';
import OrdersTable from '../components/OrdersTable';

const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrders, setSelectedOrders] = useState<any[]>([]);
    const [filters, setFilters] = useState({ CpfCnpj: '', Nome: '', CodCliente: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);
    const [isApiFilterEnabled, setIsApiFilterEnabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrders(isApiFilterEnabled ? filters : {}, currentPage, pageSize);
                setOrders(response.data.list);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                alert('Erro ao carregar pedidos.');
            }
        };

        fetchOrders();
    }, [filters, currentPage, pageSize, isApiFilterEnabled]);

    const handleCheckboxChange = (order: any) => {
        setSelectedOrders(prevSelectedOrders => {
            if (prevSelectedOrders.includes(order)) {
                return prevSelectedOrders.filter(o => o !== order);
            } else {
                return [...prevSelectedOrders, order];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedOrders.length === orders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(orders);
        }
    };

    const handlePayment = () => {
        const totalAmount = selectedOrders.reduce((sum, order) => sum + order.valorFatura, 0);
        const paymentData = {
            selectedOrders: selectedOrders.map((order) => ({
                orderId: order.numeroFatura,
                amount: order.valorFatura
            })),
            totalAmount
        };
        navigate('/payment', { state: paymentData });
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const handleApiFilterToggle = () => {
        setIsApiFilterEnabled(prev => !prev);
    };

    const filteredOrders = isApiFilterEnabled
        ? orders
        : orders.filter(order =>
            order.pessoa.nome.toLowerCase().includes(filters.Nome.toLowerCase()) &&
            order.pessoa.cpfCnpj.includes(filters.CpfCnpj) &&
            order.pessoa.codigo.includes(filters.CodCliente)
        );

    const totalSelectedAmount = selectedOrders.reduce((sum, order) => sum + order.valorFatura, 0);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Toolbar title="Pedidos Pendentes" showLogoutButton />
            <div className="flex-grow p-8 bg-gray-100">
                <div className="mb-4 flex space-x-4">
                    <input
                        type="text"
                        name="CpfCnpj"
                        placeholder="CNPJ"
                        value={filters.CpfCnpj}
                        onChange={handleFilterChange}
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="text"
                        name="Nome"
                        placeholder="Nome"
                        value={filters.Nome}
                        onChange={handleFilterChange}
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="text"
                        name="CodCliente"
                        placeholder="Código"
                        value={filters.CodCliente}
                        onChange={handleFilterChange}
                        className="p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="api-filter-toggle"
                        checked={isApiFilterEnabled}
                        onChange={handleApiFilterToggle}
                        className="mr-2"
                    />
                    <label htmlFor="api-filter-toggle">Filtrar pela API</label>
                </div>
                <OrdersTable
                    orders={orders}
                    selectedOrders={selectedOrders}
                    onCheckboxChange={handleCheckboxChange}
                    onSelectAll={handleSelectAll}
                    filteredOrders={filteredOrders}
                />
                <div className="mt-4 text-lg">
                    <strong>Total Selecionado:</strong> {totalSelectedAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </div>
                <button
                    onClick={handlePayment}
                    className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    disabled={selectedOrders.length === 0}
                >
                    Pagar Selecionados
                </button>
                {isApiFilterEnabled && (
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-gray-300 p-2 rounded"
                        >
                            Anterior
                        </button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 p-2 rounded"
                        >
                            Próxima
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
