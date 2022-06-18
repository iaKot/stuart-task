import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('<Button/>', () => {
    const props = {
        label: 'button text',
        handleClick: jest.fn()
    };

    it('calls hanldeClick when the use clicks on button', () => {
        render(<Button {...props} />);
        const button = screen.getByRole('button');

        fireEvent.click(button);

        expect(screen.getByText('button text')).toBeVisible();
        expect(props.handleClick).toBeCalled();
    });

    it('disables the button', () => {
        const updatedProps = { ...props, disabled: true };
        render(<Button {...updatedProps} />);

        const button = screen.getByRole('button');

        expect(button).toBeDisabled();
    });
});
