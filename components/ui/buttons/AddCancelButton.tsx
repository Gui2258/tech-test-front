'use client';
import React, { useContext, useState } from 'react';
import { addTask } from '../AddTask';
import { Itasks } from '@/utils/types';
import { serverFetcher } from '@/components/api/serverFetcher';
import PlusIcon from '../PlusIcon';

interface IAddCancelButtonProps {}

export const AddCancelButton: React.FunctionComponent<
    IAddCancelButtonProps
> = () => {
    const { taskText, getTasks, setInputValue } = useContext(addTask);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const postTasks = async () => {
        setLoading(true);
        setError(false);
        try {
            await serverFetcher<Itasks>('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: taskText,
                }),
            });
            setError(false);
            getTasks();
        } catch (error) {
            console.error('Error al crear tarea');
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex gap-1 ">
                <button
                    className="py-3 px-6 bg-[#EAF0F5] rounded hidden xl:flex h-10 disabled:opacity-50 relative"
                    disabled={loading}
                    onClick={() => {
                        setInputValue('');
                    }}
                >
                    {loading ? (
                        <div className="absolute inset-0  justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-700"></div>
                        </div>
                    ) : (
                        'Cancel'
                    )}
                </button>
                <button
                    className="p-2 xl:py-3 xl:px-6 bg-[#0D55CF] rounded text-white h-10 disabled:opacity-50 relative flex items-center"
                    disabled={loading}
                    onClick={() => {
                        if (taskText.length === 0) {
                            setInputValue('');
                            return;
                        }
                        postTasks();
                        setInputValue('');
                    }}
                >
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        </div>
                    ) : taskText.length > 0 ? (
                        <>
                            <span className="hidden xl:block mr-2">Add</span>
                            <span className="block xl:hidden z-20 relative">
                                <PlusIcon isClosing={false} />
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="hidden xl:block mr-2">OK</span>
                            <span className="z-20 relative block xl:hidden">
                                <PlusIcon isClosing={true} />
                            </span>
                        </>
                    )}
                </button>
            </div>
        </>
    );
};
