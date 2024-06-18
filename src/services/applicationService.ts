import api from './api';

export const getApplications = async () => {
  try {
    const response = await api.get('/aplicacoes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar aplicações', error);
    throw error;
  }
};
