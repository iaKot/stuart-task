import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from './components/input';
import { mapOptions } from './config';
import { PickUpBadgeBlank } from './components/icons/pickup-badge-blank';
import { PickUpBadgeError } from './components/icons/pickup-badge-error';
import { PickUpBadgePresent } from './components/icons/pickup-badge-present';
import { DropOffBadgeBlank } from './components/icons/dropoff-badge-blank';
import { DropOffBadgeError } from './components/icons/dropoff-badge-error';
import { DropOffBadgePresent } from './components/icons/dropoff-badge-present';
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

    useEffect(() => {
        const map = window.initMap(mapOptions);

        setMap(map);
    }, []);

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
                </form>
            </div>
        </div>
    );
};
