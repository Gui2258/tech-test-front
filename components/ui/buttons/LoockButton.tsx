'use client';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { addTask } from '../AddTask';
import { LockIcon } from '@/components/icons/LockIcon';

export const LoockButton: React.FunctionComponent = ({}) => {
    const [isHover, setisHover] = useState(false);
    const { taskText, showDorp } = useContext(addTask);
    const isDisabled = taskText.length === 0 && showDorp;
    return (
        <>
            <button
                className={clsx(
                    'flex font-bold py-2 px-4 rounded border-solid border-2',
                    { ' border-[#cfd1d0] hover:bg-gray-200': !isDisabled },
                    { ' border-[#eaeceb]': isDisabled }
                )}
                onMouseMove={() => setisHover(true)}
                onMouseLeave={() => setisHover(false)}
            >
                <LockIcon
                    isHover={isHover}
                    isDisabled={taskText.length == 0 && showDorp}
                />
                <span
                    className={clsx(
                        { ' text-[#9296a1] ': !isDisabled },
                        { ' text-[#d2d5da]': isDisabled }
                    )}
                >
                    Public
                </span>
            </button>
        </>
    );
};
