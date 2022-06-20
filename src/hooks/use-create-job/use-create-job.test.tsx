import { FC, ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useCreateJob } from './use-create-job';

const mockSuccessResponse = { pickup: 'address', dropoff: 'address' };
const mockFetchPromise = Promise.resolve({
    json: () => Promise.resolve(mockSuccessResponse),
    ok: true
});

const mockFailedFetchPromise = Promise.resolve({
    json: () => Promise.resolve(mockSuccessResponse),
    ok: false
});

const onSuccessMock = jest.fn();

describe('useCreateJob', () => {
    it('returns data when api call is succesfull', async () => {
        global.fetch = jest
            .fn()
            .mockImplementation(() => mockFetchPromise) as jest.Mock;

        const queryClient = new QueryClient();

        const wrapper: FC<{ children: Readonly<ReactNode> }> = ({
            children
        }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        const { result, waitFor } = renderHook(
            () => useCreateJob(onSuccessMock),
            { wrapper }
        );

        act(() => {
            result.current.mutate({ pickup: 'address', dropoff: 'address' });
        });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(mockSuccessResponse);
        expect(onSuccessMock).toBeCalled();
    });

    it('returns undefined when api call is failed', async () => {
        global.fetch = jest
            .fn()
            .mockImplementation(() => mockFailedFetchPromise) as jest.Mock;

        const queryClient = new QueryClient();

        const wrapper: FC<{ children: Readonly<ReactNode> }> = ({
            children
        }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

        const { result, waitFor } = renderHook(
            () => useCreateJob(onSuccessMock),
            {
                wrapper
            }
        );

        act(() => {
            result.current.mutate({ pickup: 'address', dropoff: 'address' });
        });
        await waitFor(() => result.current.isError);

        expect(result.current.data).toEqual(undefined);
    });
});
