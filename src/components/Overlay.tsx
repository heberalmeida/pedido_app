import React from 'react';

interface OverlayProps {
    message: string;
    isVisible: boolean;
    children?: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ message, isVisible, children }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <div className="bg-white p-8 rounded text-center">
                <h2 className="text-2xl font-bold mb-4">{message}</h2>
                {children}
            </div>
        </div>
    );
};

export default Overlay;
