import React, { useContext, useState } from 'react';
import { Itasks } from '@/utils/types';
import TextFormater from './InputFormater';
import { serverFetcher } from '../api/serverFetcher';
import { addTask } from './AddTask';
import { EliminateSaveButton } from './buttons/EliminateSaveButton';

interface ITasksProps {
    task: Itasks;
}

export const Tasks: React.FunctionComponent<ITasksProps> = ({ task }) => {
    const [value, setValue] = useState(task.content);
    const [isFocused, setIsFocused] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { getTasks } = useContext(addTask);
    const toggleTasks = async () => {
        setLoading(true);
        setError(false);
        try {
            await serverFetcher<Itasks>(
                `/tasks/${task.id}/${task.checkDone ? 'unset' : 'set'}`
            );
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
            <div className="flex w-full">
                <input
                    type="checkbox"
                    checked={task.checkDone}
                    onChange={() => {
                        toggleTasks();
                    }}
                />
                <TextFormater
                    setValue={setValue}
                    value={value}
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                />
            </div>
            <EliminateSaveButton
                id={task.id}
                original={task.content}
                value={value}
            />
        </>
    );
};
