export type AddressStatus = 'idle' | 'updating' | 'error' | 'valid';

export interface AddressState {
    value: string;
    status: AddressStatus;
    marker?: google.maps.Marker;
}

export interface FormState {
    pickup: AddressState;
    dropoff: AddressState;
}

export type FormKeys = 'pickup' | 'dropoff';
