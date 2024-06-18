import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/icons/back.svg'
import sairIcon from '../assets/icons/sair.svg'

interface ToolbarProps {
    title: string;
    showBackButton?: boolean;
    showLogoutButton?: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ title, showBackButton = false, showLogoutButton = false }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('credentials');
        navigate('/login');
    };

    return (
        <div className="bg-red-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
                {showBackButton && (
                    <button onClick={() => navigate(-1)} className="mr-4">
                        <img src={backIcon} alt="Voltar" className="mx-auto mb-2 w-8 h-8" />
                    </button>
                )}
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <button onClick={handleLogout} className="ml-4">
                <img src={sairIcon} alt="Voltar" className="mx-auto mb-2 w-8 h-8" />
            </button>
        </div>
    );
};

export default Toolbar;
