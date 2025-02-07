import { render, screen, fireEvent } from '@testing-library/react';
import ColoredInput from '../InputFormater';
import '@testing-library/jest-dom';

describe('ColoredInput', () => {
    const defaultProps = {
        value: 'Test task',
        setValue: jest.fn(),
        isFocused: false,
        setIsFocused: jest.fn(),
        isEditing: true,
    };

    const renderComponent = (props = defaultProps) => {
        return render(<ColoredInput {...props} />);
    };

    it('renders input with correct value', () => {
        renderComponent();
        const input = screen.getByDisplayValue('Test task');
        expect(input).toBeInTheDocument();
    });

    it('handles focus events', () => {
        const setIsFocused = jest.fn();
        renderComponent({ ...defaultProps, setIsFocused });

        const input = screen.getByDisplayValue('Test task');
        fireEvent.focus(input);
        expect(setIsFocused).toHaveBeenCalledWith(true);

        fireEvent.blur(input);
        expect(setIsFocused).toHaveBeenCalledWith(false);
    });

    it('handles value changes', () => {
        const setValue = jest.fn();
        renderComponent({ ...defaultProps, setValue });

        const input = screen.getByDisplayValue('Test task');
        fireEvent.change(input, { target: { value: 'New task' } });
        expect(setValue).toHaveBeenCalledWith('New task');
    });

    it('applies correct base styles', () => {
        const { container } = renderComponent();
        const textarea = container.querySelector('textarea');
        expect(textarea).toHaveClass(
            'relative',
            'w-full',
            'resize-none',
            'overflow-hidden',
            'bg-transparent',
            'outline-none',
            'border-none',
            'text-transparent'
        );
    });

    it('shows placeholder when value is empty', () => {
        renderComponent({ ...defaultProps, value: '' });
        expect(
            screen.getByPlaceholderText('Type to add new task')
        ).toBeInTheDocument();
    });

    it('applies cursor style based on isEditing prop', () => {
        const { rerender } = renderComponent();
        let input = screen.getByDisplayValue('Test task');
        expect(input).not.toHaveClass('cursor-pointer');

        rerender(<ColoredInput {...defaultProps} isEditing={false} />);
        input = screen.getByDisplayValue('Test task');
        expect(input).toHaveClass('cursor-pointer');
    });
});
