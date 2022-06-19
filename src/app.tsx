import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from './components/input';
import { Button } from './components/button';
import { mapOptions } from './config';
import { PickUpBadgeBlank } from './components/icons/pickup-badge-blank';
import { PickUpBadgeError } from './components/icons/pickup-badge-error';
import { PickUpBadgePresent } from './components/icons/pickup-badge-present';
import { DropOffBadgeBlank } from './components/icons/dropoff-badge-blank';
import { DropOffBadgeError } from './components/icons/dropoff-badge-error';
import { DropOffBadgePresent } from './components/icons/dropoff-badge-present';
import pickUpMarker from './svg/pickUpMarker.svg';
import dropOffMarker from './svg/dropOffMarker.svg';
import { useDebounce } from './hooks/use-debounce';
import { useQueryAdderess } from './hooks/use-query-adderess';
import { FormState, FormKeys } from './types';
import './styles.scss';

const pickUpIconMap = {
    idle: <PickUpBadgeBlank />,
    updating: <PickUpBadgeBlank />,
    error: <PickUpBadgeError />,
    valid: <PickUpBadgePresent />
};

const dropoffIconMap = {
    idle: <DropOffBadgeBlank />,
    updating: <DropOffBadgeBlank />,
    error: <DropOffBadgeError />,
    valid: <DropOffBadgePresent />
};

export const App = () => {
    const formStateInit: FormState = {
        pickup: {
            value: '',
            status: 'idle'
        },
        dropoff: {
            value: '',
            status: 'idle'
        }
    };
    const [map, setMap] = useState<google.maps.Map>();
    const [formState, setFormState] = useState(formStateInit);
    const debouncedPickup = useDebounce(formState.pickup.value);
    const debouncedDropoff = useDebounce(formState.dropoff.value);

    const { status: pickupStatus, data: pickupData } = useQueryAdderess(
        debouncedPickup,
        { enabled: !!debouncedPickup }
    );
    const { status: dropoffStatus, data: dropoffData } = useQueryAdderess(
        debouncedDropoff,
        { enabled: !!debouncedDropoff }
    );

    useEffect(() => {
        const map = window.initMap(mapOptions);

        setMap(map);
    }, []);

    // Setting marker
    useEffect(() => {
        let marker: google.maps.Marker;

        if (pickupStatus === 'success' && map) {
            marker = window.initMarker(
                map,
                {
                    lat: pickupData.latitude,
                    lng: pickupData.longitude
                },
                { url: pickUpMarker }
            );
        }

        setFormState(prev => ({
            ...prev,
            pickup: {
                ...prev.pickup,
                ...(pickupStatus === 'error' && { status: 'error' }),
                ...(pickupStatus === 'success' && { status: 'valid' }),
                ...(marker && { marker })
            }
        }));
    }, [pickupStatus, pickupData, map]);

    useEffect(() => {
        let marker: google.maps.Marker;

        if (dropoffStatus === 'success' && map) {
            marker = window.initMarker(
                map,
                {
                    lat: dropoffData.latitude,
                    lng: dropoffData.longitude
                },
                { url: dropOffMarker }
            );
        }

        setFormState(prev => ({
            ...prev,
            dropoff: {
                ...prev.dropoff,
                ...(dropoffStatus === 'error' && { status: 'error' }),
                ...(dropoffStatus === 'success' && { status: 'valid' }),
                ...(marker && { marker })
            }
        }));
    }, [dropoffStatus, dropoffData, map]);

    // Deleting marker
    useEffect(() => {
        if (formState.pickup.status === 'updating' && formState.pickup.marker) {
            formState.pickup.marker.setMap(null);

            setFormState(prev => ({
                ...prev,
                pickup: {
                    ...prev.pickup,
                    marker: undefined
                }
            }));
        }
    }, [formState.pickup.status, formState.pickup.marker]);

    useEffect(() => {
        if (
            formState.dropoff.status === 'updating' &&
            formState.dropoff.marker
        ) {
            formState.dropoff.marker.setMap(null);

            setFormState(prev => ({
                ...prev,
                dropoff: {
                    ...prev.dropoff,
                    marker: undefined
                }
            }));
        }
    }, [formState.dropoff.status, formState.dropoff.marker]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: {
                ...prev[e.target.name as FormKeys],
                value: e.target.value,
                status: 'updating'
            }
        }));
    };

    return (
        <div className='app'>
            <div id='map' className='map'></div>

            <div className='map-form'>
                <form autoComplete='off' onSubmit={e => e.preventDefault()}>
                    <Input
                        handleChange={onChange}
                        value={formState.pickup.value}
                        name='pickup'
                        placeholder='Pick up address'
                        icon={pickUpIconMap[formState.pickup.status]}
                    />

                    <Input
                        handleChange={onChange}
                        value={formState.dropoff.value}
                        name='dropoff'
                        placeholder='Drop off address'
                        icon={dropoffIconMap[formState.dropoff.status]}
                    />

                    <Button handleClick={() => {}} label='Create job' />
                </form>
            </div>
        </div>
    );
};
