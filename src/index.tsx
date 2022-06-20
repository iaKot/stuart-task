import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app';
import { initMap, InitMapFn, initMarker, InitMarkerFn } from './services/map';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NotificationContextProvider } from './components/notification';
import './index.css';

declare global {
    interface Window {
        initMap: InitMapFn;
        initMarker: InitMarkerFn;
    }
}

window.initMap = initMap;
window.initMarker = initMarker;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <NotificationContextProvider>
                <App />
            </NotificationContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
