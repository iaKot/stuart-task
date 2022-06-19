import { render } from '@testing-library/react';
import { DropOffBadgeBlank } from './dropoff-badge-blank';

describe('<DropOffBadgeBlank/>', () => {
    it('renders without errors', () => {
        expect(() => render(<DropOffBadgeBlank />)).not.toThrow();
    });
});
