import api from './api';

interface LoginData {
  usuario: string;
  senha: string;
  aplicacaoId: string;
}

export const login = async (data: LoginData) => {
  return await api.post('/auth', data);
};
