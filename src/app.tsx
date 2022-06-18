import { useEffect, useState } from 'react';
import { mapOptions } from './config';
import './styles.scss';

export const App = () => {
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        const map = window.initMap(mapOptions);

        setMap(map);
    }, []);

    return (
        <div className='app'>
            <div id='map' className='map'></div>
        </div>
    );
};
