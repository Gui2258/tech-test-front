import React from 'react';
import { ExpandButton } from './buttons/ExpandButton';

export const AddingTask: React.FunctionComponent = () => {
    return (
        <>
            <div className="bg-white p-4 rounded shadow-lg">
                <ExpandButton isDisabled={true} />
            </div>
        </>
    );
};
