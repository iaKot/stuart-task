import { render } from '@testing-library/react';
import { PickUpBadgeError } from './pickup-badge-error';

describe('<PickUpBadgeError/>', () => {
    it('renders without errors', () => {
        expect(() => render(<PickUpBadgeError />)).not.toThrow();
    });
});
