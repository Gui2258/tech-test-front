import React from 'react';
import { ExpandButton } from './buttons/ExpandButton';
import { CalendarButton } from './buttons/CalendarButton';
import { LoockButton } from './buttons/LoockButton';
import { SunButton } from './buttons/SunButton';

export const AddingTask: React.FunctionComponent = () => {
    return (
        <>
            <div className="bg-white flex p-4 rounded shadow-lg">
                <ExpandButton />
                <CalendarButton />
                <LoockButton />
                <SunButton />
            </div>
        </>
    );
};
