import { render, screen } from '@testing-library/react';
import { processText } from '../TextProcesor';
import '@testing-library/jest-dom';

describe('processText', () => {
    it('processes hashtags with correct color', () => {
        const { container } = render(<div>{processText('#test')}</div>);
        const tag = container.querySelector('span');
        expect(tag).toHaveClass('text-purple-600');
        expect(tag).toHaveTextContent('#test');
    });

    it('processes mentions with correct color', () => {
        const { container } = render(<div>{processText('@user')}</div>);
        const tag = container.querySelector('span');
        expect(tag).toHaveClass('text-green-600');
        expect(tag).toHaveTextContent('@user');
    });

    it('processes emails with correct color', () => {
        const { container } = render(
            <div>{processText('test@email.com')}</div>
        );
        const tag = container.querySelector('span');
        expect(tag).toHaveClass('text-orange-500');
        expect(tag).toHaveTextContent('test@email.com');
    });

    it('processes links with correct color', () => {
        const { container } = render(
            <div>{processText('https://test.com')}</div>
        );
        const link = container.querySelector('span');
        expect(link).toHaveClass('text-blue-600');
        expect(link).toHaveTextContent('https://test.com');
    });

    it('processes regular text with black color', () => {
        const { container } = render(<div>{processText('regular text')}</div>);
        const text = container.querySelector('span');
        expect(text).toHaveClass('text-black');
        expect(text).toHaveTextContent('regular text');
    });

    it('processes mixed content correctly', () => {
        const text = 'Hello #world @user test@email.com https://test.com';
        const { container } = render(<div>{processText(text)}</div>);

        const elements = container.querySelectorAll('span');
        expect(elements).toHaveLength(8);

        const hashtag = screen.getByText('#world');
        const mention = screen.getByText('@user');
        const email = screen.getByText('test@email.com');
        const link = screen.getByText('https://test.com');

        expect(hashtag).toHaveClass('text-purple-600');
        expect(mention).toHaveClass('text-green-600');
        expect(email).toHaveClass('text-orange-500');
        expect(link).toHaveClass('text-blue-600');
    });
});
