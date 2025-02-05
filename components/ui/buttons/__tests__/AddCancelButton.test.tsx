import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddCancelButton } from '../AddCancelButton';
import { serverFetcher } from '@/components/api/serverFetcher';
import '@testing-library/jest-dom';

jest.mock('@/components/api/serverFetcher');

const mockGetTasks = jest.fn();
const mockSetInputValue = jest.fn();

const MockTaskContext = {
    taskText: '',
    getTasks: mockGetTasks,
    setInputValue: mockSetInputValue,
};

describe('AddCancelButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = (contextValue = MockTaskContext) => {
        return render(<AddCancelButton />);
    };

    it('renders both buttons in desktop view', () => {
        renderComponent();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('OK')).toBeInTheDocument();
    });

    it('shows Add button when taskText is not empty', () => {
        renderComponent({
            ...MockTaskContext,
            taskText: 'New Task',
        });
        expect(screen.getByText('Add')).toBeInTheDocument();
    });

    it('clears input on Cancel button click', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Cancel'));
        expect(mockSetInputValue).toHaveBeenCalledWith('');
    });

    it('handles successful task creation', async () => {
        const mockServerFetcher = serverFetcher as jest.Mock;
        mockServerFetcher.mockResolvedValueOnce({});

        renderComponent({
            ...MockTaskContext,
            taskText: 'New Task',
        });

        fireEvent.click(screen.getByText('Add'));

        await waitFor(() => {
            expect(mockServerFetcher).toHaveBeenCalledWith('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: 'New Task',
                }),
            });
            expect(mockGetTasks).toHaveBeenCalled();
            expect(mockSetInputValue).toHaveBeenCalledWith('');
        });
    });

    it('handles error during task creation', async () => {
        const mockServerFetcher = serverFetcher as jest.Mock;
        mockServerFetcher.mockRejectedValueOnce(new Error('API Error'));
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        renderComponent({
            ...MockTaskContext,
            taskText: 'New Task',
        });

        fireEvent.click(screen.getByText('Add'));

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Error al crear tarea');
            expect(mockSetInputValue).toHaveBeenCalledWith('');
        });

        consoleSpy.mockRestore();
    });

    it('shows loading spinner during task creation', async () => {
        const mockServerFetcher = serverFetcher as jest.Mock;
        mockServerFetcher.mockImplementation(
            () => new Promise((resolve) => setTimeout(resolve, 100))
        );

        renderComponent({
            ...MockTaskContext,
            taskText: 'New Task',
        });

        fireEvent.click(screen.getByText('Add'));

        expect(screen.getByRole('button', { name: /add/i })).toBeDisabled();
        expect(screen.getAllByRole('status')[0]).toBeInTheDocument();
    });

    it('handles empty task text submission', () => {
        renderComponent({
            ...MockTaskContext,
            taskText: '',
        });

        fireEvent.click(screen.getByText('OK'));

        expect(mockSetInputValue).toHaveBeenCalledWith('');
        expect(serverFetcher).not.toHaveBeenCalled();
    });
});
