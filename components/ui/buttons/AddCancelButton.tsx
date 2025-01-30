'use client';
import React, { useContext, useState } from 'react';
import { addTask } from '../AddTask';
import { Itasks } from '@/utils/types';
import { serverFetcher } from '@/components/api/serverFetcher';

interface IAddCancelButtonProps {}

export const AddCancelButton: React.FunctionComponent<
    IAddCancelButtonProps
> = () => {
    const { taskText } = useContext(addTask);
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
            window.location.reload();
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
            <button className="p-6 bg-gray-300" disabled={loading}>
                Cancel
            </button>
            <button
                className="p-6 bg-blue-400"
                disabled={loading}
                onClick={() => postTasks()}
            >
                Add
            </button>
        </>
    );
};
