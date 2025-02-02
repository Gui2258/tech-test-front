import React from 'react';
import { ExpandButton } from './buttons/ExpandButton';
import { CalendarButton } from './buttons/CalendarButton';
import { LoockButton } from './buttons/LoockButton';
import { SunButton } from './buttons/SunButton';
import { AddCancelButton } from './buttons/AddCancelButton';
import { ZeroButton } from './buttons/ZeroButton';

export const AddingTask: React.FunctionComponent = () => {
    return (
        <>
            <div className="bg-white flex p-4 rounded shadow-lg gap-8">
                <div className="flex">
                    <ExpandButton />
                </div>
                <div className="flex gap-1">
                    <CalendarButton />
                    <LoockButton />
                    <SunButton />
                    <ZeroButton />
                    <AddCancelButton />
                </div>
            </div>
        </>
    );
};
