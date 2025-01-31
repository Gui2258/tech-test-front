import React from 'react';

interface IPlusWhithoutBorderProps {
    isHover: boolean;
    isDisabled: boolean;
    size?: string;
}

export const PlusWhithoutBorder: React.FunctionComponent<
    IPlusWhithoutBorderProps
> = ({ isDisabled, size = '24' }) => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDisabled ? '#c3c6cd' : '#999fab'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-plus"
            >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        </>
    );
};
