'use client';
import React, { useContext } from 'react';
import { Tasks } from './Tasks';
import { addTask } from './AddTask';

export const TasksList: React.FunctionComponent = () => {
    const { tasksList, taskLoading, tasKerror } = useContext(addTask);

    return (
        <>
            {taskLoading && !tasKerror && <h1>Loading ...</h1>}
            {!taskLoading && tasKerror && <h1>Error loading task ...</h1>}
            {!taskLoading && !tasKerror && (
                <ul>
                    {tasksList?.map((task) => (
                        <Tasks key={task.id} task={task} />
                    ))}
                </ul>
            )}
        </>
    );
};
