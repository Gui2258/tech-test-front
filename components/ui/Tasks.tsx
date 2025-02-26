import React, { useContext, useEffect, useState } from 'react';
import { Itasks } from '@/utils/types';
import TextFormater from './InputFormater';
import { serverFetcher } from '../api/serverFetcher';
import { addTask } from './AddTask';
import { TaskDrop } from './TaskDrop';
import clsx from 'clsx';
import { useAlert } from './AlertContext';

interface ITasksProps {
    task: Itasks;
    taskFocusedID: string;
    setTaskFocusedID: (arg0: string) => void;
}

export const Tasks: React.FunctionComponent<ITasksProps> = ({
    task,
    taskFocusedID,
    setTaskFocusedID,
}) => {
    const [value, setValue] = useState(task.content);
    const [isFocused, setIsFocused] = useState(false);
    const [isEditing, setisEditing] = useState(false);
    const [showDrop, setShowDrop] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { getTasks, setInputValue } = useContext(addTask);
    const { showAlert } = useAlert();
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
        if (taskFocusedID === task.id) {
            setShowDrop(true);
        } else {
            setValue(task.content);
            setShowDrop(false);
        }
    }, [isEditing, task, taskFocusedID]);

    useEffect(() => {
        setisEditing(task.content !== value);
    }, [task.content, value]);

    useEffect(() => {
        if (isFocused) {
            setInputValue('');
            setTaskFocusedID(task.id);
        }
    }, [isFocused, setInputValue, setTaskFocusedID, task]);

    useEffect(() => {
        if (error) {
            showAlert('error', 'Error al procesar la solicitud');
        }
    }, [error, showAlert]);

    /* useEffect(() => {
        if (!isFocused) {
            setValue(task.content);
        }
    }, [isFocused, task.content]); */
    const height =
        ((86 * task.content.length) / 10).toFixed().toString() + 'px';
    console.log('height', height);
    const cancel = () => {
        setTaskFocusedID('');
    };
    return (
        <>
            <div
                id="task div"
                className={clsx(
                    'sm:mx-[40px] mx-2 ',
                    { 'min-h-[56px]': !showDrop },
                    `h-[${height}]`,
                    {
                        'min-h-[116px] m-2 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.04),0px_8px_16px_0px_rgba(0,0,0,0.04)] border-[1px] border-[#F1F3F4]':
                            showDrop,
                    }
                )}
            >
                <div
                    id="task content"
                    className="ml-4 flex-grow overflow-visible  h-auto"
                >
                    <div
                        id="text-wrapper"
                        className="flex items-start   w-full min-h-[56px] gap-3 pt-2 overflow-visible break-words"
                    >
                        <input
                            data-testid="task-checkbox"
                            className={`p-3 w-6 py-4 h-6 border-[#8A94A6] rounded border-[1px] ${
                                showDrop ? '' : 'pt-5'
                            }`}
                            type="checkbox"
                            spellCheck="false"
                            disabled={loading}
                            checked={task.checkDone}
                            onChange={() => {
                                toggleTasks();
                            }}
                        />
                        <TextFormater
                            setValue={setValue}
                            value={value}
                            isFocused={showDrop}
                            setIsFocused={setIsFocused}
                            isEditing={isEditing || showDrop}
                        />
                    </div>
                </div>
                <div
                    className={`h-[1px] bg-[rgba(231,236,239,1)] w-full transition-opacity duration-300 ${
                        showDrop ? 'opacity-100' : 'opacity-0'
                    }`}
                ></div>
                <TaskDrop
                    setTaskFocused={setTaskFocusedID}
                    isEditing={isEditing}
                    isFocused={showDrop}
                    value={value}
                    tasID={task.id}
                    cancelFuction={cancel}
                />
            </div>
        </>
    );
};
