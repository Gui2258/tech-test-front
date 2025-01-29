'use client';
import React, { useState } from 'react';
import { Maximize } from '@/components/icons/Maximize';
import clsx from 'clsx';

interface IExpandButtonProps {
    isDisabled: boolean;
}

export const ExpandButton: React.FunctionComponent<IExpandButtonProps> = ({
    isDisabled,
}) => {
    const [isHover, setisHover] = useState(false);
    return (
        <>
            <button
                className={clsx(
                    'flex font-bold py-2 px-4 rounded',
                    { ' bg-[#ebf0f6] hover:bg-gray-300': !isDisabled },
                    { ' bg-[#f2f6f9]': isDisabled }
                )}
                onMouseMove={() => setisHover(true)}
                onMouseLeave={() => setisHover(false)}
            >
                <Maximize isHover={isHover} isDisabled={true} />
                <span
                    className={clsx(
                        { ' text-[#182338] hover:bg-gray-300': !isDisabled },
                        { ' text-[#8a8e98]': isDisabled }
                    )}
                >
                    Open
                </span>
            </button>
        </>
    );
};
