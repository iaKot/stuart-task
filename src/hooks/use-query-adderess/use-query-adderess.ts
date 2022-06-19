import { useQuery, UseQueryOptions } from 'react-query';
import { BASE_URL } from '../../config';

export const useQueryAdderess = (
    address: string,
    options?: UseQueryOptions<any, Error, any>
) => {
    return useQuery<any, Error>(
        ['address', address],
        async () => {
            const response = await fetch(`${BASE_URL}/geocode`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ address })
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
        {
            ...options,
            retry: false
        }
    );
};
