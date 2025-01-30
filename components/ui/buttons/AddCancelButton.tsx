'use client';
import React, { useContext, useState } from 'react';
import { addTask } from '../AddTask';
import { Itasks } from '@/utils/types';
import { serverFetcher } from '@/components/api/serverFetcher';

interface IAddCancelButtonProps {}

export const AddCancelButton: React.FunctionComponent<
    IAddCancelButtonProps
> = () => {
    const { taskText, getTasks, setInputValue, showDorp } = useContext(addTask);
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
            <button
                className="p-6 bg-gray-300 disabled:opacity-50 relative"
                disabled={loading}
                onClick={() => {
                    setInputValue('');
                }}
            >
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-700"></div>
                    </div>
                ) : (
                    'Cancel'
                )}
            </button>
            <button
                className="p-6 bg-blue-400 disabled:opacity-50 relative"
                disabled={loading}
                onClick={() => postTasks()}
            >
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    </div>
                ) : (
                    'Add'
                )}
            </button>
        </>
    );
};
