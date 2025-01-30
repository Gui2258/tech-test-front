import AddTask from '@/components/ui/AddTask';
import { TasksList } from '@/components/ui/TasksList';

export default function Home() {
    return (
        <>
            <AddTask />
            <TasksList />
        </>
    );
}
