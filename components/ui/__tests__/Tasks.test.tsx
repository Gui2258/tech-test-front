import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Tasks } from '../Tasks';
import '@testing-library/jest-dom';
import { addTask } from '../AddTask';
import { serverFetcher } from '@/components/api/serverFetcher';
import { AlertProvider } from '../AlertContext';

jest.mock('@/components/api/serverFetcher');

const mockTask = {
    id: '123',
    content: 'Test Task',
    checkDone: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

const mockContext = {
    taskText: '',
    getTasks: jest.fn(),
    setInputValue: jest.fn(),
    showDorp: true,
    setTasksList: jest.fn(),
    tasksList: [],
    tasKerror: false,
    taskLoading: false,
};

describe('Tasks', () => {
    const defaultProps = {
        task: mockTask,
        taskFocusedID: '',
        setTaskFocusedID: jest.fn(),
    };

    const renderComponent = (props = defaultProps) => {
        return render(
            <AlertProvider>
                <addTask.Provider value={mockContext}>
                    <Tasks {...props} />
                </addTask.Provider>
            </AlertProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders task content correctly', () => {
        renderComponent();
        expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    it('shows checkbox with correct checked state', () => {
        renderComponent();
        const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
        expect(checkbox.checked).toBe(false);
    });

    it('toggles task when checkbox is clicked', async () => {
        const mockServerFetcher = serverFetcher as jest.Mock;
        mockServerFetcher.mockResolvedValueOnce({});

        renderComponent();
        const checkbox = screen.getByRole('checkbox');

        fireEvent.click(checkbox);

        await waitFor(() => {
            expect(mockServerFetcher).toHaveBeenCalledWith(
                `/tasks/${mockTask.id}/set`
            );
            expect(mockContext.getTasks).toHaveBeenCalled();
        });
    });

    it('handles server error when toggling task', async () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation();
        const mockServerFetcher = serverFetcher as jest.Mock;
        mockServerFetcher.mockRejectedValueOnce(new Error('Server error'));

        renderComponent();
        const checkbox = screen.getByRole('checkbox');

        fireEvent.click(checkbox);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Error al crear tarea'
            );
        });

        consoleErrorSpy.mockRestore();
    });

    it('shows TaskDrop when task is focused', () => {
        renderComponent({
            ...defaultProps,
            taskFocusedID: mockTask.id,
        });

        const taskDiv = screen
            .getByText('Test Task')
            .closest('div[id="task div"]');
        expect(taskDiv).toHaveClass('h-[116px]');
    });

    it('updates task content when editing', () => {
        renderComponent({
            ...defaultProps,
            taskFocusedID: mockTask.id,
        });

        const input = screen.getByDisplayValue('Test Task');
        fireEvent.change(input, { target: { value: 'Updated Task' } });

        expect(input).toHaveValue('Updated Task');
    });

    it('disables checkbox while loading', async () => {
        const mockServerFetcher = serverFetcher as jest.Mock;
        mockServerFetcher.mockImplementationOnce(() => new Promise(() => {}));

        renderComponent();
        const checkbox = screen.getByRole('checkbox');

        fireEvent.click(checkbox);

        expect(checkbox).toBeDisabled();
    });
});
