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
        'w-full font-mono text-base leading-normal whitespace-pre text-base leading-6 tracking-wider font-roboto';

    return (
        <div className="relative flex-1 w-full">
            <div
                className={`absolute w-full pointer-events-none ${commonStyles} '
                `}
            >
                {isEditing ? processText(value) : TagProcesor(value)}
            </div>

            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type to add new task"
                className={`relative w-full ${
                    isEditing ? '' : ' cursor-pointer'
                } bg-transparent outline-none border-none text-transparent caret-[#0C66FF] border border-gray-300 ${commonStyles}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
};

export default ColoredInput;
