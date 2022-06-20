import { render } from '@testing-library/react';
import { PickUpBadgePresent } from './pickup-badge-present';

describe('<PickUpBadgePresent/>', () => {
    it('renders without errors', () => {
        expect(() => render(<PickUpBadgePresent />)).not.toThrow();
    });
});
