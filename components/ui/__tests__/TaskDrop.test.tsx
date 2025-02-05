import { render, screen } from '@testing-library/react';
import { TaskDrop } from '../TaskDrop';
import '@testing-library/jest-dom';
import { addTask } from '../AddTask';

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

const defaultProps = {
    isFocused: true,
    isEditing: false,
    value: 'Test Task',
    tasID: '123',
    setTaskFocused: jest.fn(),
    cancelFuction: jest.fn(),
};

describe('TaskDrop', () => {
    const renderComponent = (props = defaultProps) => {
        return render(
            <addTask.Provider value={mockContext}>
                <TaskDrop {...props} />
            </addTask.Provider>
        );
    };

    it('renders with correct visibility when focused', () => {
        const { container } = renderComponent();
        const dropdownElement = container.firstChild;
        expect(dropdownElement).toHaveClass(
            'opacity-100',
            'translate-y-2',
            'pointer-events-auto'
        );
    });

    it('renders with correct visibility when not focused', () => {
        const { container } = renderComponent({
            ...defaultProps,
            isFocused: false,
        });
        const dropdownElement = container.firstChild;
        expect(dropdownElement).toHaveClass(
            'opacity-0',
            '-translate-y-4',
            'pointer-events-none'
        );
    });

    it('renders all action buttons', () => {
        renderComponent();
        expect(screen.getByText('Open')).toBeInTheDocument();
        expect(screen.getByText('Today')).toBeInTheDocument();
        expect(screen.getByText('Comment')).toBeInTheDocument();
        expect(screen.getByText('Highlight')).toBeInTheDocument();
        expect(screen.getByText('Estimation')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('applies correct transition classes', () => {
        const { container } = renderComponent();
        const dropdownElement = container.firstChild;
        expect(dropdownElement).toHaveClass(
            'transform',
            'transition-all',
            'duration-300',
            'ease-in-out'
        );
    });
});
