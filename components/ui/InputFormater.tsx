import { TagProcesor } from '../utils/TagCreator';
import { processText } from '../utils/TextProcesor';

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
    const commonStyles =
        'w-full font-mono  text-base leading-normal whitespace-pre-wrap break-words text-base leading-6 tracking-wider font-roboto min-h-[24px]';

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    return (
        <div className="relative flex-1 w-full">
            <div
                className={`absolute w-full pointer-events-none ${commonStyles}`}
            >
                {isEditing ? processText(value) : TagProcesor(value)}
            </div>

            <textarea
                value={value}
                onChange={handleInput}
                placeholder="Type to add new task"
                className={`relative w-full resize-none overflow-visible ${
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
