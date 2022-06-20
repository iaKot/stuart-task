import { render, screen } from '@testing-library/react';
import { Notification } from './notification';

const onDeleteMock = jest.fn();

describe('<Notification/>', () => {
    const props = {
        message: 'message test',
        id: 'id_mock',
        onDelete: onDeleteMock
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('shows notification', () => {
        render(<Notification {...props} />);
        const notification = screen.getByText('message test');

        expect(notification).toBeVisible();
    });

    it('deletes notification', () => {
        render(<Notification {...props} />);
        const notification = screen.getByText('message test');

        notification.click();

        expect(onDeleteMock).toBeCalled();
    });

    it('deletes notification after timeout', () => {
        jest.useFakeTimers();

        render(<Notification {...props} />);
        jest.runAllTimers();

        expect(onDeleteMock).toBeCalled();
    });
});
