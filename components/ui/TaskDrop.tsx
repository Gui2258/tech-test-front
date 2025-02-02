import React from 'react';
import { EliminateSaveButton } from './buttons/EliminateSaveButton';
import { TaskButtons } from './TaskButtons';

interface ITaskDropProps {
    isFocused: boolean;
    isEditing: boolean;
    value: string;
    tasID: string;
}

export const TaskDrop: React.FunctionComponent<ITaskDropProps> = ({
    isEditing,
    isFocused,
    value,
    tasID,
}) => {
    return (
        <>
            <div
                className={`transform mt-2 transition-all duration-300 ease-in-out
                                    ${
                                        isFocused
                                            ? 'opacity-100 translate-y-2 h-32  pointer-events-auto'
                                            : 'opacity-0 -translate-y-4 h-0 pointer-events-none'
                                    }
                                    `}
            >
                <div className="flex">
                    <TaskButtons />
                    <EliminateSaveButton
                        id={tasID}
                        isEditing={isEditing}
                        value={value}
                    />
                </div>
            </div>
        </>
    );
};
