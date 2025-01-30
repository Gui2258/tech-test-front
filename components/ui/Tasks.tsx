'use client';
import React, { useEffect, useState } from 'react';
import { serverFetcher } from '../api/serverFetcher';
import { Itasks } from '@/utils/types';

export const Tasks: React.FunctionComponent = () => {
    const [tasks, setTasks] = useState<Itasks[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getTasks = async () => {
        setLoading(true);
        setError(false);
        try {
            setTasks(await serverFetcher<Itasks[]>('/tasks'));
            setError(false);
        } catch (error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            {loading && !error && <h1>Loading ...</h1>}
            {!loading && error && <h1>Error loading task ...</h1>}
            {!loading && !error && (
                <ul>
                    {tasks?.map((task) => (
                        <li key={task.id}>{task.content}</li>
                    ))}
                </ul>
            )}
        </>
    );
};
