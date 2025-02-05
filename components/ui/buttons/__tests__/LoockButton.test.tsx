import { render, screen, fireEvent } from '@testing-library/react';
import { LoockButton } from '../LoockButton';
import '@testing-library/jest-dom';
import { addTask } from '../../AddTask';

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

describe('LoockButton', () => {
    const renderComponent = (contextValue = MockTaskContext) => {
        return render(
            <addTask.Provider value={contextValue}>
                <LoockButton />
            </addTask.Provider>
        );
    };

    it('renders lock button with "Public" text in desktop view', () => {
        renderComponent();
        expect(screen.getByText('Public')).toBeInTheDocument();
    });

    it('applies disabled styles when taskText is empty and showDorp is true', () => {
        renderComponent();
        const button = screen.getByRole('button');
        expect(button).toHaveClass('border-[#eaeceb]');
    });

    it('applies enabled styles when taskText is not empty', () => {
        renderComponent({
            ...MockTaskContext,
            taskText: 'New Task',
        });
        const button = screen.getByRole('button');
        expect(button).toHaveClass('border-[#cfd1d0]');
        expect(button).toHaveClass('hover:bg-gray-200');
    });

    it('changes hover state on mouse events', () => {
        renderComponent({
            ...MockTaskContext,
            taskText: 'New Task',
        });
        const button = screen.getByRole('button');

        fireEvent.mouseMove(button);
        expect(button).toHaveClass('hover:bg-gray-200');

        fireEvent.mouseLeave(button);
        expect(button).toHaveClass('border-[#cfd1d0]');
    });

    it('renders LockIcon component', () => {
        renderComponent();
        const button = screen.getByRole('button');
        expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('applies correct text styles for different states', () => {
        const { rerender } = renderComponent();
        const textSpan = screen.getByText('Public');
        expect(textSpan).toHaveClass('text-[#d2d5da]');

        rerender(
            <addTask.Provider
                value={{ ...MockTaskContext, taskText: 'New Task' }}
            >
                <LoockButton />
            </addTask.Provider>
        );
        const enabledTextSpan = screen.getByText('Public');
        expect(enabledTextSpan).toHaveClass('text-[#9296a1]');
    });
});
