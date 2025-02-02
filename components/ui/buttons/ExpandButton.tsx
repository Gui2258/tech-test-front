'use client';
import React, { useContext, useState } from 'react';
import { Maximize } from '@/components/icons/MaximizeIcon';
import clsx from 'clsx';
import { addTask } from '../AddTask';

export const ExpandButton: React.FunctionComponent = ({}) => {
    const [isHover, setisHover] = useState(false);
    const { taskText, showDorp } = useContext(addTask);
    const isDisabled = taskText.length === 0 && showDorp;
    return (
        <>
            <button
                className={clsx(
                    'flex font-bold py-2 pl-4 pr-6 rounded justify-center items-center w-28 h-10 gap-2 bg-[#EAF0F5]',
                    { ' hover:bg-gray-300': !isDisabled },
                    { ' opacity-50': isDisabled }
                )}
                onMouseMove={() => setisHover(true)}
                onMouseLeave={() => setisHover(false)}
            >
                <Maximize
                    isHover={isHover}
                    isDisabled={taskText.length == 0 && showDorp}
                />
                <span
                    className={clsx('font-roboto text-base text-[#04142F]', {
                        ' opacity-50': isDisabled,
                    })}
                >
                    Open
                </span>
            </button>
        </>
    );
};
