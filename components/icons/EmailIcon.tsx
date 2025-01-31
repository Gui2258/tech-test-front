import React from 'react';

interface IEmailIconProps {
    isHover: boolean;
    isDisabled: boolean;
    size?: string;
}

export const EmailIcon: React.FunctionComponent<IEmailIconProps> = ({
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
                stroke={isDisabled ? '#c3c6cd' : '#999fab'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-mail"
            >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
        </>
    );
};
