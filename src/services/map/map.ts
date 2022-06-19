export type InitMapFn = (options: google.maps.MapOptions) => google.maps.Map;

export const initMap: InitMapFn = options => {
    const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        options
    );

    return map;
};

type Position = {
    lat: number;
    lng: number;
};

export type InitMarkerFn = (
    map: google.maps.Map,
    position: Position,
    icon?: google.maps.Icon
) => google.maps.Marker;

export const initMarker: InitMarkerFn = (map, position, icon) => {
    const marker = new google.maps.Marker({
        position,
        map: map,
        icon
    });

    return marker;
};
