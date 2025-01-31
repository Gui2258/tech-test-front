import React, { useEffect, useState } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
    type: AlertType;
    message: string;
    timeout?: number;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({
    type,
    message,
    timeout = 3000,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    const bgColors = {
        success: 'bg-green-100 border-green-500 text-green-700',
        error: 'bg-red-100 border-red-500 text-red-700',
        warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
        info: 'bg-blue-100 border-blue-500 text-blue-700',
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, timeout);

        return () => clearTimeout(timer);
    }, [timeout, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColors[type]} shadow-lg`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <span className="font-medium">{message}</span>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        onClose();
                    }}
                    className="ml-4 text-gray-600 hover:text-gray-800"
                >
                    <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Alert;
