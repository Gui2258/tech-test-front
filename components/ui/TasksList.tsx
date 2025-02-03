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
            {!taskLoading && tasKerror && <h1>Error loading task ...</h1>}
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
