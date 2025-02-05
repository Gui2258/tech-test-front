import { render, screen } from '@testing-library/react';
import { AddingTask } from '../AddingTask';
import '@testing-library/jest-dom';
import { addTask } from '../AddTask';
import { AlertProvider } from '../AlertContext';

const mockContext = {
    taskText: '',
    getTasks: jest.fn(),
    setInputValue: jest.fn(),
    showDorp: false,
    setTasksList: jest.fn(),
    tasksList: [],
    tasKerror: false,
    taskLoading: false,
};

describe('AddingTask', () => {
    const renderComponent = () => {
        return render(
            <AlertProvider>
                <addTask.Provider value={mockContext}>
                    <AddingTask />
                </addTask.Provider>
            </AlertProvider>
        );
    };

    it('renders all action buttons', () => {
        renderComponent();
        expect(screen.getByText('Open')).toBeInTheDocument();
        expect(screen.getByText('Today')).toBeInTheDocument();
        expect(screen.getByText('Highlight')).toBeInTheDocument();
        expect(screen.getByText('Estimation')).toBeInTheDocument();
    });

    it('renders with correct container styles', () => {
        const { container } = renderComponent();
        const mainDiv = container.firstChild;
        expect(mainDiv).toHaveClass(
            'bg-white',
            'flex',
            'p-2',
            'rounded',
            'shadow-lg',
            'gap-8'
        );
    });

    it('has correct button groups structure', () => {
        const { container } = renderComponent();

        const actionButtons = container.querySelector('#action\\ buttons');
        expect(actionButtons).toHaveClass('flex', 'gap-8');

        const ctaButtons = container.querySelector('#add\\ cancel\\ cta');
        expect(ctaButtons).toHaveClass('self-end', 'ml-auto');
    });

    it('renders AddCancelButton component', () => {
        const { container } = renderComponent();
        const addCancelSection = container.querySelector('#add\\ cancel\\ cta');
        expect(addCancelSection).toBeInTheDocument();
    });
});
