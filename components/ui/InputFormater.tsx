import { TagProcesor } from '../utils/TagCreator';
import { processText } from '../utils/TextProcesor';
import { useEffect, useRef } from 'react'; // Importar useRef y useEffect

interface ITextFormaterProps {
    value: string;
    setValue: (value: string) => void;
    isFocused: boolean;
    setIsFocused: (value: boolean) => void;
    isEditing?: boolean;
}

const ColoredInput: React.FunctionComponent<ITextFormaterProps> = ({
    value,
    setValue,
    setIsFocused,
    isEditing = true,
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null); // Crear referencia

    // Actualizar altura cada vez que cambia el valor
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    const commonStyles =
        'w-full font-mono text-base leading-[24px] whitespace-pre-wrap break-words tracking-wider font-roboto min-h-[24px] max-w-full overflow-wrap-anywhere';

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className="relative flex-1 w-full">
            <div
                // Añadir h-full para que herede la altura del padre
                className={`absolute w-full h-full pointer-events-none ${commonStyles}`}
            >
                {isEditing ? processText(value) : TagProcesor(value)}
            </div>

            <textarea
                ref={textareaRef} // Asignar la referencia
                value={value}
                onChange={handleInput}
                placeholder="Type to add new task"
                className={`relative w-full resize-none overflow-hidden ${
                    isEditing ? '' : ' cursor-pointer'
                } bg-transparent outline-none border-none text-transparent caret-[#0C66FF] ${commonStyles}`}
                onFocus={() => setIsFocused(true)}
                spellCheck="false"
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
};

export default ColoredInput;
