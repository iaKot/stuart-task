import { render } from '@testing-library/react';
import { DropOffBadgeError } from './dropoff-badge-error';

describe('<DropOffBadgeError/>', () => {
    it('renders without errors', () => {
        expect(() => render(<DropOffBadgeError />)).not.toThrow();
    });
});
