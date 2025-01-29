import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AddingTask } from './AddingTask';

describe('Page', () => {
    it('renders a heading', () => {
        render(<AddingTask />);

        const heading = screen.getByRole('main');

        expect(heading).toBeInTheDocument();
    });
});
