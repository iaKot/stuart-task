import { render } from '@testing-library/react';
import { PickUpBadgeBlank } from './pickup-badge-blank';

describe('<PickUpBadgeBlank/>', () => {
    it('renders without errors', () => {
        expect(() => render(<PickUpBadgeBlank />)).not.toThrow();
    });
});
