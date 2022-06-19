import { FC, ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useQueryAdderess } from './use-query-adderess';

const mockSuccessResponse = {
    address: '29 Rue du 4 Septembre',
    latitude: 48.86982,
    longitude: 2.334579
};
const mockFetchPromise = Promise.resolve({
    json: () => Promise.resolve(mockSuccessResponse),
    ok: true
});

const mockFailedFetchPromise = Promise.resolve({
    json: () => Promise.resolve({}),
    ok: false
});

describe('useQueryAdderess', () => {
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
            () => useQueryAdderess('address'),
            {
                wrapper
            }
        );

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(mockSuccessResponse);
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
            () => useQueryAdderess('address'),
            {
                wrapper
            }
        );

        await waitFor(() => result.current.isError);

        expect(result.current.data).toEqual(undefined);
    });
});
