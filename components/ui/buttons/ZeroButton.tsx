'use client';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { addTask } from '../AddTask';
import { ZeroIcon } from '@/components/icons/ZeroIcon';

export const ZeroButton: React.FunctionComponent = ({}) => {
    const [isHover, setisHover] = useState(false);
    const { taskText, showDorp } = useContext(addTask);
    const isDisabled = taskText.length === 0 && showDorp;
    return (
        <>
            <button
                className={clsx(
                    'flex font-bold p-2 xl:py-2 xl:pl-4 xl:pr-6 gap-3 justify-center items-center h-10 rounded xl:border-solid xl:border-2',
                    { ' border-[#cfd1d0] hover:bg-gray-200': !isDisabled },
                    { ' border-[#eaeceb]': isDisabled }
                )}
                onMouseMove={() => setisHover(true)}
                onMouseLeave={() => setisHover(false)}
            >
                <ZeroIcon
                    isHover={isHover}
                    isDisabled={taskText.length == 0 && showDorp}
                />
                <span
                    className={clsx(
                        'hidden xl:block',
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
