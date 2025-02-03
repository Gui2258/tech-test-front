import React, { useContext } from 'react';
import { serverFetcher } from '@/components/api/serverFetcher';
import { addTask } from '../AddTask';
import { Itasks } from '@/utils/types';
import { SaveIcon } from '@/components/icons/SaveIcon';

interface IEliminateSaveButtonProps {
    value: string;
    isEditing: boolean;
    id: string;
    setTaskFocused: (arg0: string) => void;
    cancelFunction: () => void;
}

export const EliminateSaveButton: React.FunctionComponent<
    IEliminateSaveButtonProps
> = ({ value, id, isEditing, setTaskFocused, taskID, cancelFunction }) => {
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
            console.error('Error al eliminar tarea');
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
            setTaskFocused('');
        } catch (error) {
            console.error('Error al actualizar tarea');
            console.error(error);
        }
    };
    return (
        <>
            <div className="flex gap-1">
                <button
                    onClick={() => {
                        cancelFunction();
                    }}
                    className="py-3 px-6 bg-[#EAF0F5] rounded hidden xl:flex h-10 disabled:opacity-50 relative"
                >
                    Cancelar
                </button>
                <button
                    className="p-2 xl:py-3 xl:px-6 bg-[#0D55CF] rounded text-white h-10 disabled:opacity-50 relative flex items-center"
                    onClick={() => {
                        updateTasks();
                    }}
                >
                    <span className="hidden xl:inline-block">Guardar</span>
                    <SaveIcon isDisabled={!isEditing} isHover={isEditing} />
                </button>
            </div>
        </>
    );
};
