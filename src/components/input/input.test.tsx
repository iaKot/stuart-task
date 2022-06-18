import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './input';

const inputTargetValueMock = 'new value';

describe('<Input/>', () => {
    const props = {
        name: 'input-name',
        placeholder: 'placeholder',
        handleChange: jest.fn()
    };

    it('fires the event on click', () => {
        render(<Input {...props} />);
        const input = screen.getByTestId('input');

        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: inputTargetValueMock } });

        expect(input).toBeVisible();
        expect(props.handleChange).toBeCalled();
    });

    it('renders icon correctly', () => {
        const updatedProps = { ...props, icon: <div>Icon</div> };
        render(<Input {...updatedProps} />);

        expect(screen.getByTestId('input-icon')).toBeVisible();
    });
});
