import { render, screen } from '@testing-library/react';
import { TaskButtons } from '../TaskButtons';
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

describe('TaskButtons', () => {
    const renderComponent = () => {
        return render(
            <addTask.Provider value={mockContext}>
                <TaskButtons />
            </addTask.Provider>
        );
    };

    it('renders all buttons correctly', () => {
        renderComponent();
        expect(screen.getByText('Open')).toBeInTheDocument();
        expect(screen.getByText('Today')).toBeInTheDocument();
        expect(screen.getByText('Highlight')).toBeInTheDocument();
    });

    it('renders with correct layout structure', () => {
        const { container } = renderComponent();
        const mainDiv = container.firstChild;
        expect(mainDiv).toHaveClass(
            'bg-white',
            'flex',
            'p-4',
            'rounded',
            'shadow-lg',
            'gap-8'
        );
    });

    it('groups buttons correctly', () => {
        const { container } = renderComponent();
        const buttonGroups = container.querySelectorAll('.flex');
        expect(buttonGroups).toHaveLength(6); // Main container + 2 button groups
    });

    it('renders all button icons', () => {
        const { container } = renderComponent();
        const svgElements = container.querySelectorAll('svg');
        expect(svgElements.length).toBe(3); // One icon for each button
    });
});
