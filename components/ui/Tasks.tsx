import { Itasks } from '@/utils/types';
import React from 'react';

interface ITasksProps {
    task: Itasks;
}

export const Tasks: React.FunctionComponent<ITasksProps> = ({ task }) => {
    return (
        <>
            <h1>{task.content}</h1>
        </>
    );
};
