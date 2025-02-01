import React from 'react';
import { ExpandButton } from './buttons/ExpandButton';
import { CalendarButton } from './buttons/CalendarButton';
import { LoockButton } from './buttons/LoockButton';
import { SunButton } from './buttons/SunButton';
import { AddCancelButton } from './buttons/AddCancelButton';

export const AddingTask: React.FunctionComponent = () => {
    return (
        <>
            <div className="bg-white flex p-4 rounded shadow-lg gap-8">
                <div className="flex">
                    <ExpandButton />
                </div>
                <div className="flex">
                    <CalendarButton />
                    <LoockButton />
                    <SunButton />
                    <AddCancelButton />
                </div>
            </div>
        </>
    );
};
