'use client';
import { Plus } from '@/components/icons/Plus';
import { useState } from 'react';

export default function Home() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <>
            <main>
                <div className="flex flex-col">
                    <div className="flex">
                        <Plus />
                        <input
                            className="bg-gray-placeholder"
                            placeholder="Type to add new Task"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>

                    <div
                        className={`
                        transform transition-all duration-300 ease-in-out
                        ${
                            isFocused
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
