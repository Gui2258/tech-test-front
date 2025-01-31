import React, { useEffect, useState } from 'react';

interface IEliminateSaveButtonProps {
    value: string;
    original: string;
    id: string;
}

export const EliminateSaveButton: React.FunctionComponent<
    IEliminateSaveButtonProps
> = ({ original, value }) => {
    const [isEditing, setisEditing] = useState(false);
    useEffect(() => {
        setisEditing(original !== value);
    }, [original, value]);

    return (
        <>
            <button>{isEditing ? 'Save' : 'Eliminar'}</button>
        </>
    );
};
