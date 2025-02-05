import { render, screen } from '@testing-library/react';
import { TagProcesor } from '../TagCreator';
import '@testing-library/jest-dom';

describe('TagProcesor', () => {
    it('processes hashtags correctly', () => {
        const { container } = render(<div>{TagProcesor('#test')}</div>);
        const tag = container.querySelector('span');
        expect(tag).toHaveClass('text-purple-600', 'bg-[#e5d6ff]');
        expect(tag).toHaveTextContent('#test');
    });

    it('processes mentions correctly', () => {
        const { container } = render(<div>{TagProcesor('@user')}</div>);
        const tag = container.querySelector('span');
        expect(tag).toHaveClass('text-[#189e71]', 'bg-[#a9f1d9]');
        expect(tag).toHaveTextContent('@user');
    });

    it('processes emails correctly', () => {
        const { container } = render(
            <div>{TagProcesor('test@email.com')}</div>
        );
        const tag = container.querySelector('span');
        expect(tag).toHaveClass('text-orange-500', 'bg-[#ffe6c7]');
        expect(tag).toHaveTextContent('test@email.com');
    });

    it('processes links correctly', () => {
        const { container } = render(
            <div>{TagProcesor('https://test.com')}</div>
        );
        const link = container.querySelector('button');
        expect(link).toHaveClass('text-[#007FFF]', 'bg-[#d3e8fc]');
        expect(link).toHaveTextContent('https://test.com');
    });

    it('processes mixed content correctly', () => {
        const text = 'Hello #world @user test@email.com https://test.com';
        const { container } = render(<div>{TagProcesor(text)}</div>);

        const elements = container.querySelectorAll('span, button');
        expect(elements).toHaveLength(8);

        const hashtag = screen.getByText('#world');
        const mention = screen.getByText('@user');
        const email = screen.getByText((content) =>
            content.includes('test@email.com')
        );
        const link = screen.getByText((content) =>
            content.includes('https://test.com')
        );

        expect(hashtag).toHaveClass('bg-[#e5d6ff]');
        expect(mention).toHaveClass('bg-[#a9f1d9]');
        expect(email.closest('span')).toHaveClass('bg-[#ffe6c7]');
        expect(link.closest('button')).toHaveClass('bg-[#d3e8fc]');
    });
});
