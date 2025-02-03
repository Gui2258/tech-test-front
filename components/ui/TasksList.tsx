'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Tasks } from './Tasks';
import { addTask } from './AddTask';

export const TasksList: React.FunctionComponent = () => {
    const { tasksList, taskLoading, tasKerror, showDorp } = useContext(addTask);
    const [taskIDfocused, setTaskIDfocused] = useState('');

    useEffect(() => {
        if (showDorp) setTaskIDfocused('');
    }, [showDorp]);

    return (
        <>
            {taskLoading && !tasKerror && <h1>Loading ...</h1>}
            {!taskLoading && tasKerror && <h1>Error loading task ...</h1>}
            {!taskLoading && !tasKerror && (
                <ul className="">
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
