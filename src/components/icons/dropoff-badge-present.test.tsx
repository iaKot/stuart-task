import { render } from '@testing-library/react';
import { DropOffBadgePresent } from './dropoff-badge-present';

describe('<DropOffBadgePresent/>', () => {
    it('renders without errors', () => {
        expect(() => render(<DropOffBadgePresent />)).not.toThrow();
    });
});
