import { createContainer } from './notification-container';

describe('Notification container', () => {
    it('creates the container', () => {
        jest.spyOn(document, 'createElement');
        createContainer();
        expect(document.createElement).toBeCalled();

        createContainer();
        expect(document.createElement).toBeCalledTimes(1);
    });
});
