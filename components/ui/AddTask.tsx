'use client';
import { Plus } from '@/components/icons/PlusSquareIcon';
import { createContext, useEffect, useState } from 'react';
import { AddingTask } from './AddingTask';
import TextFormater from './InputFormater';
import { serverFetcher } from '../api/serverFetcher';
import { IContext, Itasks } from '@/utils/types';
import { TasksList } from './TasksList';
import Image from 'next/image';

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
                <main>
                    <div className="flex flex-col">
                        <div className="flex h-10 p-14 w-full">
                            <div
                                id="input container"
                                className="flex items-center w-full gap-2"
                            >
                                <Plus size="24" />
                                <div className="relative flex flex-1 justify-between gap-3 ">
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
                            className={`
                            transform transition-all duration-300 ease-in-out
                            ${
                                showDropdown
                                    ? 'opacity-100 translate-y-2 h-32 pointer-events-auto'
                                    : 'opacity-0 -translate-y-4 h-0 pointer-events-none'
                            }
                            `}
                        >
                            <AddingTask />
                        </div>
                    </div>
                </main>
                <TasksList />
            </addTask.Provider>
        </>
    );
}
