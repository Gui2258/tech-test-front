import { Itasks } from '@/utils/types';
import React from 'react';

interface ITasksProps {
    tasks: Itasks[];
}

export const Tasks: React.FunctionComponent<ITasksProps> = ({ tasks }) => {
    return (
        <>
            {' '}
            <ul>
                {tasks?.map((task) => (
                    <li key={task.id}>{task.content}</li>
                ))}
            </ul>
        </>
    );
};
