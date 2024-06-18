import React from 'react';

interface OrdersTableProps {
    orders: any[];
    selectedOrders: any[];
    onCheckboxChange: (order: any) => void;
    onSelectAll: () => void;
    filteredOrders: any[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({
    orders,
    selectedOrders,
    onCheckboxChange,
    onSelectAll,
    filteredOrders,
}) => {
    return (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">
                        <input
                            type="checkbox"
                            checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                            onChange={onSelectAll}
                        />
                    </th>
                    <th className="py-2 px-4 border-b text-left">Nome</th>
                    <th className="py-2 px-4 border-b text-right">Valor (R$)</th>
                </tr>
            </thead>
            <tbody>
                {filteredOrders.map((order) => (
                    <tr
                        key={order.numeroFatura}
                        className={`cursor-pointer ${selectedOrders.includes(order) ? 'bg-gray-200' : ''}`}
                        onClick={() => onCheckboxChange(order)}
                    >
                        <td className="py-2 px-4 border-b text-center">
                            <input
                                type="checkbox"
                                checked={selectedOrders.includes(order)}
                                onChange={() => onCheckboxChange(order)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </td>
                        <td className="py-2 px-4 border-b">{order.pessoa.nome}</td>
                        <td className="py-2 px-4 border-b text-right">{order.valorFatura.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OrdersTable;
