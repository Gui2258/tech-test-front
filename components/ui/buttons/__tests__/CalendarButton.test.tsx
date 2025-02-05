import { render, screen, fireEvent } from '@testing-library/react';
import { CalendarButton } from '../CalendarButton';
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

describe('CalendarButton', () => {
    const renderComponent = (contextValue = MockTaskContext) => {
        return render(
            <addTask.Provider value={contextValue}>
                <CalendarButton />
            </addTask.Provider>
        );
    };

    it('renders calendar button with "Today" text in desktop view', () => {
        renderComponent();
        expect(screen.getByText('Today')).toBeInTheDocument();
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

    it('renders CalendarIcon component', () => {
        renderComponent();
        const button = screen.getByRole('button');
        expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('applies correct text color for enabled state', () => {
        renderComponent({
            ...MockTaskContext,
            taskText: 'New Task',
        });
        const textSpan = screen.getByText('Today');
        expect(textSpan).toHaveClass('text-[#9296a1]');
    });
});
