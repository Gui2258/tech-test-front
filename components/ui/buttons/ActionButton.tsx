'use client';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { addTask } from '../AddTask';

interface IActionButton {
    children: React.ReactNode;
    buttonName: string;
}
export const ActionButton: React.FunctionComponent<IActionButton> = ({
    children,
    buttonName,
}) => {
    const [isHover, setisHover] = useState(false);
    const { taskText, showDorp } = useContext(addTask);
    const isDisabled = taskText.length === 0 && showDorp;

    return (
        <>
            <button
                className={clsx(
                    'flex font-bold py-2 px-6  justify-center items-center w-28 h-10 rounded border-solid border-2',
                    { ' border-[#cfd1d0] hover:bg-gray-200': !isDisabled },
                    { ' border-[#eaeceb]': isDisabled }
                )}
                onMouseMove={() => setisHover(true)}
                onMouseLeave={() => setisHover(false)}
            >
                {React.cloneElement(children as React.ReactElement, {
                    isHover: isHover,
                    isDisabled: isDisabled,
                })}
                <span
                    className={clsx(
                        { ' text-[#9296a1] ': !isDisabled },
                        { ' text-[#d2d5da]': isDisabled }
                    )}
                >
                    {buttonName}
                </span>
            </button>
        </>
    );
};
