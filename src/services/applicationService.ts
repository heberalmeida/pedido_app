import axios from 'axios';

export const getApplications = async () => {
    const response = await axios.get('https://api-pedido-erp-gateway-prod.saurus.net.br/api/v2/aplicacoes');
    return response.data;
};
