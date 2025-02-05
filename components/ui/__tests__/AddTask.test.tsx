import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddTask, { addTask } from '../AddTask';
import '@testing-library/jest-dom';
import { AlertProvider } from '../AlertContext';
import { serverFetcher } from '@/components/api/serverFetcher';

jest.mock('@/components/api/serverFetcher');

describe('AddTask', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <AlertProvider>
                <AddTask />
            </AlertProvider>
        );
    };

    it('renders input field with placeholder', () => {
        renderComponent();
        expect(
            screen.getByPlaceholderText('Type to add new task')
        ).toBeInTheDocument();
    });

    it('shows dropdown when input is focused', () => {
        renderComponent();
        const input = screen.getByPlaceholderText('Type to add new task');
        fireEvent.focus(input);

        const dropdown = screen.getByText('Open').closest('.bg-white');
        expect(dropdown).toHaveClass('flex', 'p-2', 'rounded', 'shadow-lg');
    });

    it('shows dropdown when input has value', () => {
        renderComponent();
        const input = screen.getByPlaceholderText('Type to add new task');
        fireEvent.change(input, { target: { value: 'New task' } });

        const dropdown = screen.getByText('Open').closest('.bg-white');
        expect(dropdown).toBeVisible();
    });

    it('fetches tasks on mount', async () => {
        const mockServerFetcher = serverFetcher as jest.Mock;
        mockServerFetcher.mockResolvedValueOnce([]);

        renderComponent();

        await waitFor(() => {
            expect(mockServerFetcher).toHaveBeenCalledWith('/tasks');
        });
    });

    it('shows avatar when dropdown is visible', () => {
        renderComponent();
        const input = screen.getByPlaceholderText('Type to add new task');
        fireEvent.focus(input);

        const avatar = screen.getByAltText('User avatar');
        expect(avatar).toBeInTheDocument();
    });

    it('applies correct styles when dropdown is shown', () => {
        renderComponent();
        const input = screen.getByPlaceholderText('Type to add new task');
        fireEvent.focus(input);

        const container = screen.getByText('Open').closest('#main\\ container');
        expect(container).toHaveClass('h-[116px]');
    });

    it('handles task loading state', async () => {
        const mockServerFetcher = serverFetcher as jest.Mock;
        mockServerFetcher.mockImplementationOnce(() => new Promise(() => {}));

        renderComponent();

        const skeletonItems = document.querySelectorAll('.animate-pulse');
        expect(skeletonItems.length).toBe(4);
    });
});
