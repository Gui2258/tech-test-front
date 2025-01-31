import { serverFetcher } from '@/components/api/serverFetcher';
import React, { useContext, useEffect, useState } from 'react';
import { addTask } from '../AddTask';
import { Itasks } from '@/utils/types';

interface IEliminateSaveButtonProps {
    value: string;
    original: string;
    id: string;
}

export const EliminateSaveButton: React.FunctionComponent<
    IEliminateSaveButtonProps
> = ({ original, value, id }) => {
    const [isEditing, setisEditing] = useState(false);
    const { getTasks } = useContext(addTask);
    const deleteTasks = async () => {
        try {
            await serverFetcher<Itasks>(`/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            getTasks();
        } catch (error) {
            console.error('Error al crear tarea');
            console.error(error);
        }
    };
    const updateTasks = async () => {
        try {
            await serverFetcher<Itasks>(`/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: value,
                }),
            });
            getTasks();
        } catch (error) {
            console.error('Error al crear tarea');
            console.error(error);
        }
    };
    useEffect(() => {
        setisEditing(original !== value);
    }, [original, value]);

    return (
        <>
            <button
                onClick={() => {
                    if (isEditing) updateTasks();
                    else deleteTasks();
                }}
            >
                {isEditing ? 'Save' : 'Eliminar'}
            </button>
        </>
    );
};
