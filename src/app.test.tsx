import {
    render,
    screen,
    fireEvent,
    act,
    waitFor
} from '@testing-library/react';
import { App } from './app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationContextProvider } from './components/notification';

window.initMap = jest.fn();

const mockFetchPromise = Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true
});

const initMapMock = jest.fn();
const initMarkerMock = jest.fn();
const setMapMock = jest.fn();
const mapMock = {} as google.maps.Map;
const markerMock = { setMap: setMapMock };

describe('<App/>', () => {
    beforeEach(() => {
        window.initMap = initMapMock;
        window.initMarker = initMarkerMock;
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('inits the map', () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );
        expect(initMapMock).toBeCalled();
    });

    it('sets and deletes markers after inputs validation', async () => {
        global.fetch = jest
            .fn()
            .mockImplementation(() => mockFetchPromise) as jest.Mock;
        (initMapMock as jest.Mock).mockImplementation(() => mapMock);
        (initMarkerMock as jest.Mock).mockImplementation(() => markerMock);

        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );

        const pickup = screen.getAllByTestId('input')[0];
        const dropoff = screen.getAllByTestId('input')[1];

        fireEvent.change(pickup, { target: { value: 'address' } });
        fireEvent.change(dropoff, { target: { value: 'address' } });

        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => expect(initMarkerMock).toBeCalledTimes(2));

        fireEvent.change(pickup, { target: { value: 'address 1' } });
        fireEvent.change(dropoff, { target: { value: 'address 2' } });

        await waitFor(() => expect(setMapMock).toBeCalledTimes(2));
    });

    it('submits the form successfully and clears the form', async () => {
        global.fetch = jest
            .fn()
            .mockImplementation(() => mockFetchPromise) as jest.Mock;
        (initMapMock as jest.Mock).mockImplementation(() => mapMock);
        (initMarkerMock as jest.Mock).mockImplementation(() => markerMock);

        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <NotificationContextProvider>
                    <App />
                </NotificationContextProvider>
            </QueryClientProvider>
        );

        const pickup = screen.getAllByTestId('input')[0];
        const dropoff = screen.getAllByTestId('input')[1];
        const button = screen.getByTestId('button');

        fireEvent.change(pickup, { target: { value: 'address' } });
        fireEvent.change(dropoff, { target: { value: 'address' } });

        act(() => {
            jest.runAllTimers();
        });
        await waitFor(() => expect(initMarkerMock).toBeCalledTimes(2));

        act(() => {
            button.click();
        });

        await waitFor(() => {
            const notification = screen.getByTestId('notification');
            expect(notification).toBeVisible();
        });

        await waitFor(() => expect(setMapMock).toBeCalledTimes(2));
    });

    it('works when markers are undefined', async () => {
        global.fetch = jest
            .fn()
            .mockImplementation(() => mockFetchPromise) as jest.Mock;
        (initMapMock as jest.Mock).mockImplementation(() => mapMock);
        (initMarkerMock as jest.Mock).mockImplementation(() => undefined);

        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <NotificationContextProvider>
                    <App />
                </NotificationContextProvider>
            </QueryClientProvider>
        );

        const pickup = screen.getAllByTestId('input')[0];
        const dropoff = screen.getAllByTestId('input')[1];
        const button = screen.getByTestId('button');

        fireEvent.change(pickup, { target: { value: 'address' } });
        fireEvent.change(dropoff, { target: { value: 'address' } });

        act(() => {
            jest.runAllTimers();
        });
        await waitFor(() => expect(initMarkerMock).toBeCalledTimes(2));

        act(() => {
            button.click();
        });
        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => {
            const notification = screen.getByTestId('notification');
            expect(notification).toBeVisible();
        });

        await waitFor(() => expect(setMapMock).not.toBeCalledTimes(2));
    });

    it('does not adds marker when addresses are not valid', async () => {
        global.fetch = jest
            .fn()
            .mockImplementationOnce(() => Promise.reject('error')) as jest.Mock;
        (initMapMock as jest.Mock).mockImplementation(() => mapMock);

        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        );

        const pickup = screen.getAllByTestId('input')[0];
        const dropoff = screen.getAllByTestId('input')[1];

        fireEvent.change(pickup, { target: { value: 'address' } });
        fireEvent.change(dropoff, { target: { value: 'address' } });

        act(() => {
            jest.runAllTimers();
        });

        await waitFor(() => {
            const icon = screen.getByTestId('pickup-badge-error');
            expect(icon).toBeVisible();
        });

        await waitFor(() => {
            expect(initMarkerMock).not.toBeCalled();
        });
    });
});
