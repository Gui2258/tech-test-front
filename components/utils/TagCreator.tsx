export const TagProcesor = (text: string) => {
    const regex =
        /(#\w+|@\w+|\b[\w.-]+@[\w.-]+\.\w+\b|https?:\/\/\S+|www\.\S+)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
        if (!part) return null;

        if (part.match(/^#\w+/)) {
            return (
                <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-purple-600 bg-purple-100"
                >
                    {/* <FaHashtag className="w-3 h-3" />
                     */}{' '}
                    {part}
                </span>
            );
        }
        if (part.match(/^@\w+/)) {
            return (
                <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-green-600 bg-green-100"
                >
                    {/* <FaAt className="w-3 h-3" /> */}
                    {part}
                </span>
            );
        }
        if (part.match(/\b[\w.-]+@[\w.-]+\.\w+\b/)) {
            return (
                <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-orange-500 bg-orange-100"
                >
                    {/* <FaEnvelope className="w-3 h-3" /> */}
                    {part}
                </span>
            );
        }
        if (part.match(/^(https?:\/\/|www\.)/)) {
            return (
                <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-blue-600 bg-blue-100"
                >
                    {/* <FaLink className="w-3 h-3" /> */}
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
