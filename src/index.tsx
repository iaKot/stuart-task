import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { initMap, InitMapFn, initMarker } from './services/map';
import './index.css';

declare global {
    interface Window {
        initMap: InitMapFn;
        initMarker: (map: any, icon: any, options?: any) => google.maps.Marker;
    }
}

window.initMap = initMap;
window.initMarker = initMarker;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
