'use client';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { addTask } from '../AddTask';
import { SunIcon } from '@/components/icons/SunIcon';

export const SunButton: React.FunctionComponent = ({}) => {
    const [isHover, setisHover] = useState(false);
    const { taskText, showDorp } = useContext(addTask);
    const isDisabled = taskText.length === 0 && showDorp;
    return (
        <>
            <button
                className={clsx(
                    'flex font-bold py-2 pl-4 pr-6 gap-3   justify-center items-center w-32 h-10 rounded border-solid border-2',
                    { ' border-[#cfd1d0] hover:bg-gray-200': !isDisabled },
                    { ' border-[#eaeceb]': isDisabled }
                )}
                onMouseMove={() => setisHover(true)}
                onMouseLeave={() => setisHover(false)}
            >
                <SunIcon
                    isHover={isHover}
                    isDisabled={taskText.length == 0 && showDorp}
                />
                <span
                    className={clsx(
                        { ' text-[#9296a1] ': !isDisabled },
                        { ' text-[#d2d5da]': isDisabled }
                    )}
                >
                    Normal
                </span>
            </button>
        </>
    );
};
