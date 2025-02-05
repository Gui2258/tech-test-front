import { render, screen, fireEvent } from '@testing-library/react';
import { ZeroButton } from '../ZeroButton';
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

describe('ZeroButton', () => {
    const renderComponent = (contextValue = MockTaskContext) => {
        return render(
            <addTask.Provider value={contextValue}>
                <ZeroButton />
            </addTask.Provider>
        );
    };

    it('renders zero button with "Estimation" text in desktop view', () => {
        renderComponent();
        expect(screen.getByText('Estimation')).toBeInTheDocument();
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

    it('renders ZeroIcon component', () => {
        renderComponent();
        const button = screen.getByRole('button');
        expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('applies correct text styles for different states', () => {
        const { rerender } = renderComponent();
        const textSpan = screen.getByText('Estimation');
        expect(textSpan).toHaveClass('text-[#d2d5da]');

        rerender(
            <addTask.Provider
                value={{ ...MockTaskContext, taskText: 'New Task' }}
            >
                <ZeroButton />
            </addTask.Provider>
        );
        const enabledTextSpan = screen.getByText('Estimation');
        expect(enabledTextSpan).toHaveClass('text-[#9296a1]');
    });
});
