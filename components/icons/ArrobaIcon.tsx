import React from 'react';

interface IArrobaIconProps {
    isHover: boolean;
    isDisabled: boolean;
    size?: string;
}

export const ArrobaIcon: React.FunctionComponent<IArrobaIconProps> = ({
    isDisabled,
    size = '24',
}) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#189e71"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-at-sign"
            >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
            </svg>
        </>
    );
};
