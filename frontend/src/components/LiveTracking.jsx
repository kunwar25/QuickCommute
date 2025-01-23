import React, { useState, useEffect } from 'react';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    useEffect(() => {
        // Get the initial position
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude,
            });
        });

        // Watch position for live tracking
        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude,
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        let map;
        let marker;

        const loadMap = () => {
            map = new mapmyindia.Map('mapContainer', {
                center: [currentPosition.lat, currentPosition.lng],
                zoom: 15,
            });

            marker = new mapmyindia.Marker({
                map: map,
                position: [currentPosition.lat, currentPosition.lng],
            });
        };

        loadMap();

        const intervalId = setInterval(() => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                console.log('Position updated:', latitude, longitude);

                setCurrentPosition({
                    lat: latitude,
                    lng: longitude,
                });

                // Update marker position
                if (marker) {
                    marker.setPosition([latitude, longitude]);
                }

                // Center map on new position
                if (map) {
                    map.setCenter([latitude, longitude]);
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [currentPosition]);

    return (
        <div
            id="mapContainer"
            style={containerStyle}
        />
    );
};

export default LiveTracking;
