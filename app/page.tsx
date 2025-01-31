'use client';
import AddTask from '@/components/ui/AddTask';
import { AlertProvider } from '@/components/ui/AlertContext';

export default function Home() {
    return (
        <>
            <AlertProvider>
                <AddTask />
            </AlertProvider>
        </>
    );
}
