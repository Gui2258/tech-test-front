import React, { createContext, useContext, useState } from 'react';
import Alert from './Alert';

interface AlertContextType {
    showAlert: (
        type: 'success' | 'error' | 'warning' | 'info',
        message: string,
        timeout?: number
    ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [alerts, setAlerts] = useState<React.ReactElement[]>([]);

    const showAlert = (
        type: 'success' | 'error' | 'warning' | 'info',
        message: string,
        timeout = 3000
    ) => {
        const id = Date.now();
        const newAlert = (
            <Alert
                key={id}
                type={type}
                message={message}
                timeout={timeout}
                onClose={() => {
                    setAlerts((current) =>
                        current.filter((alert) => alert.key !== String(id))
                    );
                }}
            />
        );

        setAlerts((current) => [...current, newAlert]);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <div className="fixed z-50">{alerts}</div>
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
