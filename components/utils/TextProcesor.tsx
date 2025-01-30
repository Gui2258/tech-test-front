export const processText = (text: string) => {
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
