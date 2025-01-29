import React from 'react';

interface ImaximizeProps {
    isHover: boolean;
    isDisabled: boolean;
}

export const Maximize: React.FunctionComponent<ImaximizeProps> = ({
    isDisabled,
}) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDisabled ? '#404040' : '#f04040'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-maximize-2"
            >
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
        </>
    );
};
