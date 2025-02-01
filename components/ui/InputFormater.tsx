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
        'w-full font-mono text-base leading-normal whitespace-pre';

    return (
        <div className="relative">
            <div
                className={`absolute pointer-events-none ${commonStyles} text-base leading-6 tracking-wider font-roboto`}
            >
                {isEditing ? processText(value) : TagProcesor(value)}
            </div>

            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type something..."
                className={`relative bg-transparent text-transparent caret-black border border-gray-300 ${commonStyles} text-base leading-6 tracking-wider font-roboto`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
};

export default ColoredInput;
