import React from 'react';
import { ExpandButton } from './buttons/ExpandButton';
import { CalendarButton } from './buttons/CalendarButton';
import { LoockButton } from './buttons/LoockButton';

export const AddingTask: React.FunctionComponent = () => {
    return (
        <>
            <div className="bg-white p-4 rounded shadow-lg">
                <ExpandButton />
                <CalendarButton />
                <LoockButton />
            </div>
        </>
    );
};
