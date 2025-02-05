import { EmailIcon } from '../icons/EmailIcon';
import { LinkIcon } from '../icons/LinkIcon';

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
                    className="inline-flex font-medium  items-center gap-1 px-2 py-1 rounded-xl text-purple-600 bg-[#e5d6ff]"
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
                    className="inline-flex font-medium  items-center gap-1 px-2 py-1 rounded-xl text-[#189e71] bg-[#a9f1d9]"
                >
                    {part}
                </span>
            );
        }
        if (part.match(/\b[\w.-]+@[\w.-]+\.\w+\b/)) {
            return (
                <span
                    key={index}
                    className="inline-flex font-medium  items-center gap-1 px-2 py-1 rounded-xl text-orange-500 bg-[#ffe6c7]"
                >
                    <EmailIcon size="16" isDisabled={false} isHover={false} />
                    {part}
                </span>
            );
        }
        if (part.match(/^(https?:\/\/|www\.)/)) {
            return (
                <button
                    key={index}
                    className="inline-flex font-medium items-center gap-1 px-2 py-1 rounded-xl text-[#007FFF] bg-[#d3e8fc]"
                >
                    <LinkIcon size="16" isDisabled={false} isHover={false} />
                    {part}
                </button>
            );
        }

        return (
            <span key={index} className="text-black">
                {part}
            </span>
        );
    });
};
