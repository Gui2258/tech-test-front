import { render, screen, fireEvent } from '@testing-library/react';
import { ExpandButton } from '../ExpandButton';
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

describe('ExpandButton', () => {
    const renderComponent = (contextValue = MockTaskContext) => {
        return render(
            <addTask.Provider value={contextValue}>
                <ExpandButton />
            </addTask.Provider>
        );
    };

    it('renders expand button with "Open" text in desktop view', () => {
        renderComponent();
        expect(screen.getByText('Open')).toBeInTheDocument();
    });

    it('applies disabled styles when taskText is empty and showDorp is true', () => {
        renderComponent();
        const button = screen.getByRole('button');
        expect(button).toHaveClass('opacity-50');
    });

    it('applies enabled styles when taskText is not empty', () => {
        renderComponent({
            ...MockTaskContext,
            taskText: 'New Task',
        });
        const button = screen.getByRole('button');
        expect(button).toHaveClass('hover:bg-gray-300');
    });

    it('changes hover state on mouse events', () => {
        renderComponent({
            ...MockTaskContext,
            taskText: 'New Task',
        });
        const button = screen.getByRole('button');

        fireEvent.mouseMove(button);
        expect(button).toHaveClass('hover:bg-gray-300');

        fireEvent.mouseLeave(button);
        expect(button).toHaveClass('bg-[#EAF0F5]');
    });

    it('renders Maximize icon component', () => {
        renderComponent();
        const button = screen.getByRole('button');
        expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('applies correct text styles for different states', () => {
        const { rerender } = renderComponent();
        const textSpan = screen.getByText('Open');
        expect(textSpan).toHaveClass(
            'font-roboto',
            'text-base',
            'text-[#04142F]',
            'opacity-50'
        );

        rerender(
            <addTask.Provider
                value={{ ...MockTaskContext, taskText: 'New Task' }}
            >
                <ExpandButton />
            </addTask.Provider>
        );
        const enabledTextSpan = screen.getByText('Open');
        expect(enabledTextSpan).not.toHaveClass('opacity-50');
    });
});
