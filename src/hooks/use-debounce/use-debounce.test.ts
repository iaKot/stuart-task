import { renderHook } from '@testing-library/react-hooks';
import { useDebounce } from './use-debounce';

describe('useDebounce', () => {
    it('updates value only after timeout', async () => {
        let value = 'default';
        const { result, rerender, waitFor } = renderHook(() =>
            useDebounce(value)
        );
        value = 'changed';
        rerender();

        await waitFor(() => expect(result.current).toEqual('default'), {
            timeout: 100
        });

        await waitFor(() => expect(result.current).toEqual('changed'), {
            timeout: 500
        });
    });
});
