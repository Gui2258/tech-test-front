const TasksListSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
                <div
                    key={index}
                    className="h-14 mx-14 mt-2 bg-gray-200 rounded-lg animate-pulse"
                />
            ))}
        </div>
    );
};

export default TasksListSkeleton;
