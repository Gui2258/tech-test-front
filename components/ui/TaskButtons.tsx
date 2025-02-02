import { ExpandButton } from './buttons/ExpandButton';
import { CalendarButton } from './buttons/CalendarButton';
import { SunButton } from './buttons/SunButton';

export const TaskButtons: React.FunctionComponent = () => {
    return (
        <>
            <div className="bg-white flex p-4 rounded shadow-lg gap-8">
                <div className="flex">
                    <ExpandButton />
                </div>
                <div className="flex gap-1">
                    <CalendarButton />
                    <SunButton />
                </div>
            </div>
        </>
    );
};
