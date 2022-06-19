import { useMutation } from 'react-query';
import { BASE_URL } from '../../config';

type Payload = {
    pickup: string;
    dropoff: string;
};

export const useCreateJob = (onSuccess: () => void) => {
    return useMutation(
        'create-job',
        async (payload: Payload) => {
            const response = await fetch(`${BASE_URL}/jobs`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        },
        {
            onSuccess,
            retry: false
        }
    );
};
