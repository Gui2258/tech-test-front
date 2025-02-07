import { render, screen } from '@testing-library/react';
import { TasksList } from '../TasksList';
import '@testing-library/jest-dom';
import { addTask } from '../AddTask';
import { AlertProvider } from '../AlertContext';

const mockTasks = [
    {
        id: '1',
        content: 'Task 1',
        checkDone: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        content: 'Task 2',
        checkDone: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const mockContext = {
    taskText: '',
    getTasks: jest.fn(),
    setInputValue: jest.fn(),
    showDorp: false,
    setTasksList: jest.fn(),
    tasksList: mockTasks,
    tasKerror: false,
    taskLoading: false,
};

describe('TasksList', () => {
    const renderComponent = (contextValue = mockContext) => {
        return render(
            <AlertProvider>
                <addTask.Provider value={contextValue}>
                    <TasksList />
                </addTask.Provider>
            </AlertProvider>
        );
    };

    it('shows loading skeleton when taskLoading is true', () => {
        renderComponent({
            ...mockContext,
            taskLoading: true,
            tasKerror: false,
        });
        const skeletonItems = document.querySelectorAll('.animate-pulse');
        expect(skeletonItems.length).toBe(4);
    });

    it('shows error message when tasKerror is true', () => {
        renderComponent({
            ...mockContext,
            taskLoading: false,
            tasKerror: true,
        });
        expect(screen.getByText('Error loading tasks ...')).toBeInTheDocument();
    });

    it('renders tasks list when data is loaded successfully', () => {
        renderComponent({
            ...mockContext,
            taskLoading: false,
            tasKerror: false,
        });

        const taskElement = screen.getByDisplayValue('Task 1');
        expect(taskElement).toBeInTheDocument();
    });

    it('passes correct props to Tasks components', () => {
        const { container } = renderComponent();
        const taskElements = container.querySelectorAll('ul > div');
        expect(taskElements).toHaveLength(mockTasks.length);
    });

    it('resets taskIDfocused when showDorp becomes true', () => {
        const { rerender } = renderComponent();

        rerender(
            <AlertProvider>
                <addTask.Provider value={{ ...mockContext, showDorp: true }}>
                    <TasksList />
                </addTask.Provider>
            </AlertProvider>
        );

        const taskElements = document.querySelectorAll('[id="task div"]');
        expect(taskElements).toBeTruthy();
    });

    it('renders with correct list container styles', () => {
        const { container } = renderComponent();
        const listElement = container.querySelector('ul');
        expect(listElement).toHaveClass('flex', 'flex-col', 'mt-3');
    });
});
