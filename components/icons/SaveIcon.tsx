import React from 'react';

interface ISaveIconProps {
    isHover: boolean;
    isDisabled: boolean;
    size?: string;
}

export const SaveIcon: React.FunctionComponent<ISaveIconProps> = ({
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
                className="feather feather-save"
            >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
        </>
    );
};
