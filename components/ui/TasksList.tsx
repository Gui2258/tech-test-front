'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Tasks } from './Tasks';
import { addTask } from './AddTask';
import TasksListSkeleton from './TaskListSkeleton';

export const TasksList: React.FunctionComponent = () => {
    const { tasksList, taskLoading, tasKerror, showDorp } = useContext(addTask);
    const [taskIDfocused, setTaskIDfocused] = useState('');

    useEffect(() => {
        if (showDorp) setTaskIDfocused('');
    }, [showDorp]);

    return (
        <>
            {taskLoading && !tasKerror && <TasksListSkeleton />}
            {!taskLoading && tasKerror && (
                <h1 className="mx-[56px] w-60 px-8 py-1 rounded border-solid border-2 border-red-600 h-10 bg-red-200 text-red-500">
                    Error loading tasks ...
                </h1>
            )}
            {!taskLoading && !tasKerror && (
                <ul className="flex flex-col gap-2">
                    {tasksList?.map((task) => (
                        <Tasks
                            key={task.id}
                            task={task}
                            setTaskFocusedID={setTaskIDfocused}
                            taskFocusedID={taskIDfocused}
                        />
                    ))}
                </ul>
            )}
        </>
    );
};
