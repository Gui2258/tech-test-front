import { render } from '@testing-library/react';
import TasksListSkeleton from '../TaskListSkeleton';
import '@testing-library/jest-dom';

describe('TaskListSkeleton', () => {
    it('renders correct number of skeleton items', () => {
        const { container } = render(<TasksListSkeleton />);
        const skeletonItems = container.querySelectorAll('.animate-pulse');
        expect(skeletonItems).toHaveLength(4);
    });

    it('applies correct styling to skeleton items', () => {
        const { container } = render(<TasksListSkeleton />);
        const firstSkeletonItem = container.querySelector('.animate-pulse');
        expect(firstSkeletonItem).toHaveClass(
            'h-14',
            'mx-14',
            'mt-2',
            'bg-gray-200',
            'rounded-lg'
        );
    });

    it('has correct container styling', () => {
        const { container } = render(<TasksListSkeleton />);
        const skeletonContainer = container.firstChild;
        expect(skeletonContainer).toHaveClass('space-y-4');
    });
});
