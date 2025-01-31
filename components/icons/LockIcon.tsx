import React from 'react';

interface ILockIconProps {
    isHover: boolean;
    isDisabled: boolean;
    size?: string;
}

export const LockIcon: React.FunctionComponent<ILockIconProps> = ({
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-unlock"
            >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
            </svg>
        </>
    );
};
