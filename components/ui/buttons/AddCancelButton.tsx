'use client';
import React, { useContext } from 'react';
import { addTask } from '../AddTask';

interface IAddCancelButtonProps {}

export const AddCancelButton: React.FunctionComponent<
    IAddCancelButtonProps
> = () => {
    const {} = useContext(addTask);

    return <></>;
};
