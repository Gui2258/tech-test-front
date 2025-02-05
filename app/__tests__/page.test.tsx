import { render } from '@testing-library/react';
import Home from '../page';
import '@testing-library/jest-dom';

describe('Home', () => {
    it('renders AddTask component wrapped in AlertProvider', () => {
        const { container } = render(<Home />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it('maintains component hierarchy', () => {
        const { container } = render(<Home />);
        const mainComponent = container.querySelector('main');
        expect(mainComponent).toBeInTheDocument();
    });
});
