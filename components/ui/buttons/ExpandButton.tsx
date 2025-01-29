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
                    'flex font-bold py-2 px-4 rounded',
                    { ' bg-[#ebf0f6] hover:bg-gray-300': !isDisabled },
                    { ' bg-[#f2f6f9]': isDisabled }
                )}
                onMouseMove={() => setisHover(true)}
                onMouseLeave={() => setisHover(false)}
            >
                <Maximize
                    isHover={isHover}
                    isDisabled={taskText.length == 0 && showDorp}
                />
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
