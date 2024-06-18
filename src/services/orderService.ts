import api from './api';

export const getOrders = async (filters = {}, page = 1, pageSize = 10) => {
  const params = {
    ...filters,
    Page: page,
    PageSize: pageSize,
  };
  return await api.get('/financeiro/faturas', { params });
};
