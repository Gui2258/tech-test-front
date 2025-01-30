'use client';
import { Plus } from '@/components/icons/PlusIcon';
import { createContext, useEffect, useState } from 'react';
import { AddingTask } from './AddingTask';
import TextFormater from './TextFormater';
import { serverFetcher } from '../api/serverFetcher';
import { IContext, Itasks } from '@/utils/types';
import { TasksList } from './TasksList';

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
                        <div className="flex">
                            <Plus />
                            <div className="relative flex-1">
                                <TextFormater
                                    setValue={setInputValue}
                                    value={inputValue}
                                    isFocused={isFocused}
                                    setIsFocused={setIsFocused}
                                />
                            </div>
                        </div>

                        <div
                            className={`
                            transform transition-all duration-300 ease-in-out
                            ${
                                showDropdown
                                    ? 'opacity-100 translate-y-2 h-32'
                                    : 'opacity-0 -translate-y-4 h-0'
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
