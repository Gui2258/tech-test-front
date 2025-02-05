interface IPlusIconProps {
    isClosing?: boolean;
}

const PlusIcon: React.FC<IPlusIconProps> = ({ isClosing = false }) => {
    return (
        <div
            className={`transform transition-transform duration-300 ${
                isClosing ? 'rotate-45' : 'rotate-0'
            }`}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current"
            >
                <path
                    d="M12 5V19"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M5 12H19"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default PlusIcon;
