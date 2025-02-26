'use client';
import { Plus } from '@/components/icons/PlusSquareIcon';
import { createContext, useEffect, useState } from 'react';
import { AddingTask } from './AddingTask';
import TextFormater from './InputFormater';
import { serverFetcher } from '../api/serverFetcher';
import { IContext, Itasks } from '@/utils/types';
import { TasksList } from './TasksList';
import Image from 'next/image';
import clsx from 'clsx';

export const addTask = createContext<IContext>({
    showDorp: false,
    taskText: '',
    setTasksList: () => {},
    tasksList: [
        {
            id: '',
            content: '',
            checkDone: false,
            isDeleted: false,
        },
    ],
    tasKerror: false,
    taskLoading: true,
    getTasks: () => {},
    setInputValue: () => {},
});
export default function AddTask() {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [tasks, setTasks] = useState<Itasks[]>();
    const [taskLoading, setTaskLoading] = useState(true);
    const [tasKerror, setTaskError] = useState(false);

    const getTasks = async () => {
        setTaskLoading(true);
        setTaskError(false);
        try {
            setTasks(await serverFetcher<Itasks[]>('/tasks'));
            setTaskError(false);
        } catch (error) {
            console.error(error);
            setTaskError(true);
        } finally {
            setTaskLoading(false);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        setShowDropdown(isFocused || inputValue.length > 0);
    }, [inputValue, isFocused]);

    return (
        <>
            <addTask.Provider
                value={{
                    showDorp: showDropdown,
                    taskText: inputValue,
                    setTasksList: setTasks,
                    tasksList: tasks!,
                    tasKerror,
                    taskLoading,
                    getTasks,
                    setInputValue,
                }}
            >
                <main className="mt-14">
                    <div
                        id="main container"
                        className={clsx(
                            'flex sm:mx-10 mx-2 flex-col',
                            { 'h-[40px]': !showDropdown },
                            {
                                'min-h-[116px] mb-4 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04),0px_8px_16px_0px_rgba(0,0,0,0.04)] border-[1px] border-[#F1F3F4]':
                                    showDropdown,
                            }
                        )}
                    >
                        <div
                            id="newTask and avatar div"
                            className="flex min-h-[40px] mb-3 flex-grow"
                        >
                            <div
                                id="input container"
                                className="flex items-start ml-4 mr-2 mt-2 w-full gap-3 relative flex-grow"
                            >
                                <Plus size="24" />
                                <div
                                    id="text container"
                                    className="relative flex flex-1 justify-between gap-3 overflow-hidden break-words whitespace-normal"
                                >
                                    <TextFormater
                                        setValue={setInputValue}
                                        value={inputValue}
                                        isFocused={isFocused}
                                        setIsFocused={setIsFocused}
                                    />
                                </div>

                                {showDropdown && (
                                    <div className="relative">
                                        <div
                                            className={`
                                        absolute inset-0 z-10 rounded-full
                                        ${
                                            inputValue.length === 0
                                                ? 'bg-gray-300/70'
                                                : ''
                                        }  // Overlay gris con 50% de opacidad
                                    `}
                                        ></div>
                                        <Image
                                            src="/avatar-r.jpeg"
                                            alt="User avatar"
                                            className="rounded-full relative "
                                            width={24}
                                            height={24}
                                            style={{
                                                width: '24px',
                                                height: '24px',
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div
                            className={`h-[1px] bg-[rgba(231,236,239,1)] w-full transition-opacity duration-300 ${
                                isFocused ? 'opacity-100' : 'opacity-0'
                            }`}
                        ></div>

                        <div
                            className={`
                            transform transition-all duration-120 h-1/2 ease-in-out
                            ${
                                showDropdown
                                    ? 'opacity-100 translate-y-2  pointer-events-auto'
                                    : 'opacity-0 -translate-y-4 h-0 pointer-events-none'
                            }
                            `}
                        >
                            <AddingTask />
                        </div>
                    </div>
                    <TasksList />
                </main>
            </addTask.Provider>
        </>
    );
}
