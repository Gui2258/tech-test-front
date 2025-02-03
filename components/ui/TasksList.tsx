'use client';
import React, { useContext, useState } from 'react';
import { Tasks } from './Tasks';
import { addTask } from './AddTask';

export const TasksList: React.FunctionComponent = () => {
    const { tasksList, taskLoading, tasKerror } = useContext(addTask);
    const [taskIDfocused, setTaskIDfocused] = useState('');
    return (
        <>
            {taskLoading && !tasKerror && <h1>Loading ...</h1>}
            {!taskLoading && tasKerror && <h1>Error loading task ...</h1>}
            {!taskLoading && !tasKerror && (
                <ul className="">
                    {tasksList?.map((task) => (
                        <Tasks key={task.id} task={task} />
                    ))}
                </ul>
            )}
        </>
    );
};
