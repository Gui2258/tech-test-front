export const detectAndParseTags = (text: string) => {
    const patterns = {
        url: /(https?:\/\/[^\s]+|www\.[^\s]+\.[^\s]+)/g,
        email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g,
        hashtag: /(#[a-zA-Z0-9_]+)/g,
        username: /(@[a-zA-Z0-9_]+)/g,
    };

    const tags = {
        urls: text.match(patterns.url) || [],
        emails: text.match(patterns.email) || [],
        hashtags: text.match(patterns.hashtag) || [],
        usernames: text.match(patterns.username) || [],
    };

    return tags;
};

export const highlightText = (text: string) => {
    const parts = text.split(/\s+/);

    return parts.map((part, index) => {
        if (part.startsWith('@')) {
            return (
                <span key={index} style={{ color: '#007fff' }}>
                    {part}
                </span>
            );
        }
        if (part.startsWith('#')) {
            return (
                <span key={index} style={{ color: '#00ff00' }}>
                    {part}
                </span>
            );
        }
        if (part.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            return (
                <span key={index} style={{ color: '#ff6b6b' }}>
                    {part}
                </span>
            );
        }
        if (part.match(/^(http|https):\/\/[^\s]+$/)) {
            return (
                <span key={index} style={{ color: '#9775fa' }}>
                    {part}
                </span>
            );
        }
        return <span key={index}>{part} </span>;
    });
};
