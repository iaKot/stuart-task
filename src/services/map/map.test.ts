import { initMap, initMarker } from './map';

const googleMapMock = jest.fn();
const googleMarkerMock = jest.fn();
const mapMock = {} as google.maps.Map;

describe('Map service', () => {
    beforeEach(() => {
        global.window.google = {
            maps: {
                Map: googleMapMock,
                Marker: googleMarkerMock
            } as any
        };
    });

    it('calls the map init', () => {
        initMap({});

        expect(googleMapMock).toBeCalled();
    });

    it('calls the marker init', () => {
        initMarker(mapMock, { lat: 0, lng: 0 });

        expect(googleMarkerMock).toBeCalled();
    });
});
