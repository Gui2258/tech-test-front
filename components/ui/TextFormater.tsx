interface ITextFormaterProps {
    value: string;
    setValue: (value: string) => void;
    isFocused: boolean;
    setIsFocused: (value: boolean) => void;
}

const ColoredInput: React.FunctionComponent<ITextFormaterProps> = ({
    value,
    setValue,
    setIsFocused,
}) => {
    const commonStyles =
        'p-2 w-full font-mono text-base leading-normal whitespace-pre';

    const processText = (text: string) => {
        const regex =
            /(#\w+|@\w+|\b[\w.-]+@[\w.-]+\.\w+\b|https?:\/\/\S+|www\.\S+)/g;
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (!part) return null;

            if (part.match(/^#\w+/)) {
                return (
                    <span key={index} className="text-purple-600">
                        {part}
                    </span>
                );
            }
            if (part.match(/^@\w+/)) {
                return (
                    <span key={index} className="text-green-600">
                        {part}
                    </span>
                );
            }
            if (part.match(/\b[\w.-]+@[\w.-]+\.\w+\b/)) {
                return (
                    <span key={index} className="text-orange-500">
                        {part}
                    </span>
                );
            }
            if (part.match(/^(https?:\/\/|www\.)/)) {
                return (
                    <span key={index} className="text-blue-600">
                        {part}
                    </span>
                );
            }

            return (
                <span key={index} className="text-black">
                    {part}
                </span>
            );
        });
    };

    return (
        <div className="relative">
            <div className={`absolute pointer-events-none ${commonStyles}`}>
                {processText(value)}
            </div>

            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type something..."
                className={`relative bg-transparent text-transparent caret-black border border-gray-300 ${commonStyles}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
};

export default ColoredInput;
