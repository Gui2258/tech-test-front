import { render } from '@testing-library/react';
import RootLayout from '../layout';
import '@testing-library/jest-dom';

describe('RootLayout', () => {
    it('renders with correct base structure', () => {
        const { container } = render(
            <RootLayout>
                <div>Test Content</div>
            </RootLayout>
        );

        const html = container.querySelector('html');
        const body = container.querySelector('body');

        expect(html).toHaveAttribute('lang', 'en');
        expect(body).toBeInTheDocument();
    });

    it('renders children content', () => {
        const { getByText } = render(
            <RootLayout>
                <div>Test Content</div>
            </RootLayout>
        );

        expect(getByText('Test Content')).toBeInTheDocument();
    });
});
