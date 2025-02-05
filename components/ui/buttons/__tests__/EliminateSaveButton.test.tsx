import { render, screen, fireEvent } from '@testing-library/react';
import { EliminateSaveButton } from '../EliminateSaveButton';
import '@testing-library/jest-dom';
import { addTask } from '../../AddTask';
import { serverFetcher } from '@/components/api/serverFetcher';

// Mock the serverFetcher
jest.mock('@/components/api/serverFetcher');

const MockTaskContext = {
    taskText: '',
    getTasks: jest.fn(),
    setInputValue: jest.fn(),
    showDorp: true,
    setTasksList: jest.fn(),
    tasksList: [],
    tasKerror: false,
    taskLoading: false,
};

const mockProps = {
    value: 'Test task',
    isEditing: true,
    id: '123',
    setTaskFocused: jest.fn(),
    cancelFunction: jest.fn(),
};

describe('EliminateSaveButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = (
        props = mockProps,
        contextValue = MockTaskContext
    ) => {
        return render(
            <addTask.Provider value={contextValue}>
                <EliminateSaveButton {...props} />
            </addTask.Provider>
        );
    };

    it('renders cancel and save buttons', () => {
        renderComponent();
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
        expect(screen.getByText('Guardar')).toBeInTheDocument();
    });

    it('calls cancelFunction when cancel button is clicked', () => {
        renderComponent();
        fireEvent.click(screen.getByText('Cancelar'));
        expect(mockProps.cancelFunction).toHaveBeenCalledTimes(1);
    });

    it('updates task when save button is clicked', async () => {
        const mockServerFetcher = serverFetcher as jest.Mock;
        mockServerFetcher.mockResolvedValueOnce({});

        renderComponent();

        fireEvent.click(screen.getByText('Guardar'));

        expect(mockServerFetcher).toHaveBeenCalledWith(
            `/tasks/${mockProps.id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: mockProps.value,
                }),
            }
        );

        // Wait for async operations
        await screen.findByText('Guardar');

        expect(MockTaskContext.getTasks).toHaveBeenCalled();
        expect(mockProps.setTaskFocused).toHaveBeenCalledWith('');
    });

    it('handles server error when updating task', async () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation();
        const mockServerFetcher = serverFetcher as jest.Mock;
        mockServerFetcher.mockRejectedValueOnce(new Error('Server error'));

        renderComponent();

        fireEvent.click(screen.getByText('Guardar'));

        // Wait for async operations
        await screen.findByText('Guardar');

        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Error al actualizar tarea'
        );
        consoleErrorSpy.mockRestore();
    });

    it('renders SaveIcon with correct props', () => {
        const { rerender } = renderComponent();
        const saveButton = screen.getByText('Guardar').parentElement;
        expect(saveButton?.querySelector('svg')).toBeInTheDocument();

        rerender(
            <addTask.Provider value={MockTaskContext}>
                <EliminateSaveButton {...mockProps} isEditing={false} />
            </addTask.Provider>
        );
    });
});
