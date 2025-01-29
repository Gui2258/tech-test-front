import React, { useContext } from 'react';
import { ExpandButton } from './buttons/ExpandButton';
import { addTask } from './AddTask';

export const AddingTask: React.FunctionComponent = () => {
    const showDorp = useContext(addTask);
    return (
        <>
            <div className="bg-white p-4 rounded shadow-lg">
                <ExpandButton
                    isDisabled={
                        showDorp.showDorp && showDorp.taskText.length == 0
                    }
                />
            </div>
        </>
    );
};
