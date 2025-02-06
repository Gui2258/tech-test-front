import React from 'react';
import { EliminateSaveButton } from './buttons/EliminateSaveButton';
import { ExpandButton } from './buttons/ExpandButton';
import { CalendarButton } from './buttons/CalendarButton';
import { SunButton } from './buttons/SunButton';
import { ZeroButton } from './buttons/ZeroButton';
import { MessageButton } from './buttons/MessageButton';
import { TrashButton } from './buttons/TrashButton';

interface ITaskDropProps {
    isFocused: boolean;
    isEditing: boolean;
    value: string;
    tasID: string;
    setTaskFocused: (arg0: string) => void;
    cancelFuction: () => void;
}

export const TaskDrop: React.FunctionComponent<ITaskDropProps> = ({
    isEditing,
    isFocused,
    value,
    tasID,
    setTaskFocused,
    cancelFuction,
}) => {
    return (
        <>
            <div
                className={`transform h-[56px] transition-all duration-300 ease-in-out mb-3
                                    ${
                                        isFocused
                                            ? 'opacity-100 translate-y-2  pointer-events-auto'
                                            : 'opacity-0 -translate-y-4 h-0 pointer-events-none'
                                    }
                                    `}
            >
                <div className="bg-white flex p-2 rounded shadow-lg gap-8">
                    <div id="action buttons" className="flex gap-8">
                        <div>
                            <ExpandButton />
                        </div>
                        <div className="flex gap-1">
                            <CalendarButton />
                            <MessageButton />
                            <SunButton />
                            <ZeroButton />
                            <TrashButton />
                        </div>
                    </div>
                    <div id="add cancel cta" className="self-end ml-auto">
                        <EliminateSaveButton
                            setTaskFocused={setTaskFocused}
                            id={tasID}
                            isEditing={isEditing}
                            value={value}
                            cancelFunction={cancelFuction}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
