import React from 'react';

interface IAddingTaskProps {}

export const AddingTask: React.FunctionComponent<IAddingTaskProps> = () => {
    return (
        <>
            {' '}
            <div className="bg-white p-4 rounded shadow-lg">
                {/* Your dropdown content here */}
                <p>Additional options or content</p>
            </div>
        </>
    );
};
