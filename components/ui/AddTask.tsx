'use client';
import { Plus } from '@/components/icons/PlusIcon';
import { createContext, useEffect, useState } from 'react';
import { AddingTask } from './AddingTask';
import { highlightText } from '@/utils/TagDecoder';

export const addTask = createContext({
    showDorp: false,
    taskText: '',
});
export default function AddTask() {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        setShowDropdown(isFocused || inputValue.length > 0);
    }, [inputValue, isFocused]);

    return (
        <>
            <addTask.Provider
                value={{ showDorp: showDropdown, taskText: inputValue }}
            >
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
                            <div>{highlightText(inputValue)}</div>
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
                            <AddingTask />
                        </div>
                    </div>
                </main>
            </addTask.Provider>
        </>
    );
}
