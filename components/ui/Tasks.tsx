import React, { useState } from 'react';
import { Itasks } from '@/utils/types';
import TextFormater from './TextFormater';

interface ITasksProps {
    task: Itasks;
}

export const Tasks: React.FunctionComponent<ITasksProps> = ({ task }) => {
    const [value, setValue] = useState(task.content);
    const [isFocused, setIsFocused] = useState(false);
    return (
        <>
            <TextFormater
                setValue={setValue}
                value={value}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
            />
        </>
    );
};
