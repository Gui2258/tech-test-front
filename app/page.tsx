import AddTask from '@/components/ui/AddTask';
import { Tasks } from '@/components/ui/Tasks';

export default function Home() {
    return (
        <>
            <AddTask />
            <Tasks />
        </>
    );
}
