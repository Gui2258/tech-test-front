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
            <div className="bg-white flex p-2 rounded shadow-lg gap-8">
                <div id="action buttons" className="flex gap-8">
                    <div>
                        <ExpandButton />
                    </div>
                    <div className="flex gap-1">
                        <CalendarButton />
                        <LoockButton />
                        <SunButton />
                        <ZeroButton />
                    </div>
                </div>
                <div id="add cancel cta" className="self-end ml-auto">
                    <AddCancelButton />
                </div>
            </div>
        </>
    );
};
