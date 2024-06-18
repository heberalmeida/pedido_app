import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { getApplications } from '../services/applicationService'; 

const LoginPage: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [applications, setApplications] = useState<any[]>([]);
    const [selectedApplication, setSelectedApplication] = useState('061f92f5-f2a2-410a-8e2b-b3a28132c258');
    const [errors, setErrors] = useState<{ userId?: string, cpfCnpj?: string }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const credentials = localStorage.getItem('credentials');
        if (credentials) {
            navigate('/orders');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getApplications();
                setApplications(data);
            } catch (error) {
                console.error('Erro ao buscar aplicações', error);
            }
        };

        fetchApplications();
    }, []);

    const validateInputs = () => {
        const newErrors: { userId?: string, cpfCnpj?: string } = {};

        if (!userId) {
            newErrors.userId = 'Usuário não pode estar em branco';
        } else if (userId.length < 3) {
            newErrors.userId = 'Usuário deve ter pelo menos 3 caracteres';
        }

        if (!cpfCnpj) {
            newErrors.cpfCnpj = 'Senha não pode estar em branco';
        } else if (cpfCnpj.length < 3) {
            newErrors.cpfCnpj = 'Senha deve ter pelo menos 3 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateInputs()) {
            return;
        }

        try {
            const response = await login({ usuario: userId, senha: cpfCnpj, aplicacaoId: selectedApplication });
            console.log(response);
            if (response.data) {
                const { username, aplicacaoid } = response.data.credenciais[0];
                localStorage.setItem('credentials', JSON.stringify({ username, aplicacaoid }));

                navigate('/orders');
            }
        } catch (error) {
            alert('Erro no login, verifique suas credenciais.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 rounded w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <select
                    value={selectedApplication}
                    onChange={(e) => setSelectedApplication(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                >
                    {applications.map((app) => (
                        <option key={app.id} value={app.id}>
                            {app.nomeReferencia}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Usuário"
                    className={`mb-2 p-2 border border-gray-300 rounded w-full ${errors.userId ? 'border-red-500' : ''}`}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                {errors.userId && <div className="text-red-500 text-sm mb-2">{errors.userId}</div>}
                <input
                    type="password"
                    placeholder="Senha"
                    className={`mb-2 p-2 border border-gray-300 rounded w-full ${errors.cpfCnpj ? 'border-red-500' : ''}`}
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                />
                {errors.cpfCnpj && <div className="text-red-500 text-sm mb-2">{errors.cpfCnpj}</div>}
                <button
                    onClick={handleLogin}
                    className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                    Acessar
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
