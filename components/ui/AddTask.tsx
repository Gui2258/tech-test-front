'use client';
import { Plus } from '@/components/icons/Plus';
import { useEffect, useState } from 'react';

export default function AddTask() {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        setShowDropdown(isFocused || inputValue.length > 0);
    }, [inputValue, isFocused]);

    return (
        <>
            <main>
                <div className="flex flex-col">
                    <div className="flex">
                        <Plus />
                        <input
                            className="bg-gray-placeholder focus:outline-none"
                            placeholder="Type to add new Task"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>

                    <div
                        className={`
                        transform transition-all duration-300 ease-in-out
                        ${
                            showDropdown
                                ? 'opacity-100 translate-y-2 h-32'
                                : 'opacity-0 -translate-y-4 h-0'
                        }
                    `}
                    >
                        <div className="bg-white p-4 rounded shadow-lg">
                            {/* Your dropdown content here */}
                            <p>Additional options or content</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
