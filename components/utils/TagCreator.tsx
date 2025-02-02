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
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-purple-600 bg-[#e5d6ff]"
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
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-[#189e71] bg-[#a9f1d9]"
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
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-orange-500 bg-[#ffe6c7]"
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
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-xl text-blue-600 bg-[#d3e8fc]"
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
