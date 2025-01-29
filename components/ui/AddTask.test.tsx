import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from '@/components/ui/AddTask';

describe('AddTask', () => {
    test('renders input with correct placeholder', () => {
        render(<AddTask />);
        const input = screen.getByPlaceholderText('Type to add new Task');
        expect(input).toBeInTheDocument();
    });

    test('shows dropdown when input receives focus', () => {
        render(<AddTask />);
        const input = screen.getByPlaceholderText('Type to add new Task');
        fireEvent.focus(input);
        const dropdownContent = screen.getByText(
            'Additional options or content'
        );
        const dropdownContainer = dropdownContent.closest(
            'div[class*="transform"]'
        );
        expect(dropdownContainer).toHaveClass('opacity-100');
    });

    test('keeps dropdown visible when typing', () => {
        render(<AddTask />);
        const input = screen.getByPlaceholderText('Type to add new Task');
        fireEvent.change(input, { target: { value: 'New task' } });
        const dropdownContent = screen.getByText(
            'Additional options or content'
        );
        const dropdownContainer = dropdownContent.closest(
            'div[class*="transform"]'
        );
        expect(dropdownContainer).toHaveClass('opacity-100');
    });

    test('hides dropdown when input loses focus and is empty', () => {
        render(<AddTask />);
        const input = screen.getByPlaceholderText('Type to add new Task');
        fireEvent.focus(input);
        fireEvent.blur(input);
        const dropdownContent = screen.getByText(
            'Additional options or content'
        );
        const dropdownContainer = dropdownContent.closest(
            'div[class*="transform"]'
        );
        expect(dropdownContainer).toHaveClass('opacity-0');
    });
});
