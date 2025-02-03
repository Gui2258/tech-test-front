import React, { useContext, useEffect, useState } from 'react';
import { Itasks } from '@/utils/types';
import TextFormater from './InputFormater';
import { serverFetcher } from '../api/serverFetcher';
import { addTask } from './AddTask';
import { TaskDrop } from './TaskDrop';
import clsx from 'clsx';

interface ITasksProps {
    task: Itasks;
}

export const Tasks: React.FunctionComponent<ITasksProps> = ({ task }) => {
    const [value, setValue] = useState(task.content);
    const [isFocused, setIsFocused] = useState(false);
    const [isEditing, setisEditing] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { getTasks, setInputValue } = useContext(addTask);
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
    useEffect(() => {
        setisEditing(task.content !== value);
    }, [task.content, value]);

    useEffect(() => {
        if (isFocused) {
            setInputValue('');
        }
    }, [isFocused]);

    useEffect(() => {
        if (!isFocused) {
            setValue(task.content);
        }
    }, [isFocused, task.content]);

    return (
        <>
            <div
                id="task div"
                className={clsx(
                    'mx-[40px]',
                    { ' h-[40px]': !isFocused },

                    {
                        'h-[116px] m-2 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04),0px_8px_16px_0px_rgba(0,0,0,0.04)] border-[1px] border-[#F1F3F4]':
                            isFocused,
                    }
                )}
            >
                <div
                    id="task content"
                    className={clsx('ml-4', {
                        'h-1/2': !isFocused,
                    })}
                >
                    <div className="flex items-center w-full h-[56px] gap-3 pt-2">
                        <input
                            className="p-3 w-6 py-4 h-6 border-[#8A94A6] rounded border-[1px]"
                            type="checkbox"
                            disabled={loading}
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
                            isEditing={isEditing || isFocused}
                        />
                    </div>
                </div>
                <div
                    className={`h-[1px] bg-[rgba(231,236,239,1)] w-full transition-opacity duration-300 ${
                        isFocused ? 'opacity-100' : 'opacity-0'
                    }`}
                ></div>
                <TaskDrop
                    isEditing={isEditing}
                    isFocused={isFocused}
                    value={value}
                    tasID={task.id}
                />
            </div>
        </>
    );
};
