import { render, screen, act, fireEvent } from '@testing-library/react';
import Alert from '../Alert';
import '@testing-library/jest-dom';

describe('Alert', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    const defaultProps = {
        type: 'success' as const,
        message: 'Test message',
        onClose: jest.fn(),
    };

    it('renders with correct message and type', () => {
        const { container } = render(<Alert {...defaultProps} />);
        expect(screen.getByText('Test message')).toBeInTheDocument();
        expect(container.firstChild).toHaveClass(
            'bg-green-100',
            'border-green-500',
            'text-green-700'
        );
    });

    it('renders different alert types with correct styles', () => {
        const types = ['success', 'error', 'warning', 'info'] as const;
        const colorClasses = {
            success: 'bg-green-100 border-green-500 text-green-700',
            error: 'bg-red-100 border-red-500 text-red-700',
            warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
            info: 'bg-blue-100 border-blue-500 text-blue-700',
        };

        types.forEach((type) => {
            const { container } = render(
                <Alert {...defaultProps} type={type} />
            );
            expect(container.firstChild).toHaveClass(colorClasses[type]);
        });
    });

    it('closes after default timeout (3000ms)', () => {
        render(<Alert {...defaultProps} />);
        expect(screen.getByText('Test message')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('closes after custom timeout', () => {
        render(<Alert {...defaultProps} timeout={5000} />);
        expect(screen.getByText('Test message')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(5000);
        });

        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('closes when close button is clicked', () => {
        render(<Alert {...defaultProps} />);
        const closeButton = screen.getByRole('button');

        fireEvent.click(closeButton);

        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it('cleans up timer on unmount', () => {
        const { unmount } = render(<Alert {...defaultProps} />);

        unmount();

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(defaultProps.onClose).not.toHaveBeenCalled();
    });
});
