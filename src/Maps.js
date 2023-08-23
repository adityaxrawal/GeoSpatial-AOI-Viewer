import React, { useState, useEffect, useRef } from 'react'
import Style from './Maps.module.css'

import 'leaflet/dist/leaflet.css';
// Maps Imports
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import 'leaflet-draw/dist/leaflet.draw.css';
import { FeatureGroup, LayerGroup, Polygon } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import * as turf from '@turf/turf';

const Maps = () => {
    const tileGeoDataRef = useRef(null);  // Use useRef to store the GeoData

    useEffect(() => {
        import('./geoData.json')
            .then(data => {
                // Store the JSON content in the useRef
                tileGeoDataRef.current = data;
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }, []);
    const [drawnItems, setDrawnItems] = useState([]);
    const [intersectingPolygons, setIntersectingPolygons] = useState([]);

    const handleDrawCreated = (e) => {
        const { layer } = e
        setDrawnItems([...drawnItems, layer]);
        determineIntersectingTiles(layer);
    };
    const determineIntersectingTiles = (drawnLayer) => {
        const drawnCoords = drawnLayer.getLatLngs()[0].map((latLng) => [latLng.lat, latLng.lng]);
        drawnCoords.push(drawnCoords[0]);
        const drawnPolygon = turf.polygon([drawnCoords]);
        const intersectingTiles = tileGeoDataRef.current.features.filter((tile) => {
            const tileCoords = tile.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]); // Swap order to match Leaflet
            const tilePolygon = turf.polygon([tileCoords]);
            const intersect = turf.intersect(drawnPolygon, tilePolygon);
            return intersect !== null; // Filter out null intersects
        });
        // console.log('Intersecting Tiles:', intersectingTiles.length);
        // console.log('Intersecting Tiles:', intersectingTiles);
        setIntersectingPolygons(intersectingTiles)
    };
    // console.log("Intersecting Polygons array", intersectingPolygons)

    const drawOptions = {
        rectangle: {
            shapeOptions: {
                color: 'blue', // Customize the color of the drawn rectangle
            },
        },
        polygon: false,
        circle: false,
        marker: false,
        polyline: false,
        circlemarker: false,
    };

    const colorOption = { color: 'red', fillColor: 'red' }

    const latitude = 12.9716;   // Replace with the actual latitude
    const longitude = 77.5946; // Replace with the actual longitude
    return (
        <div className={Style.Page}>
            <div className={Style.MapsComponent}>
                <div className={Style.MapsHeading}>
                    <div className={Style.Logo}>
                        <img src='/galaxeye.jpg' alt='Logo' />
                    </div>
                    <div className={Style.Content}>
                        <span>GalaxEye</span>
                        <span>Welcome to the World of Maps</span>
                    </div>
                </div>
                <div className={Style.MapsDisplay}>
                    <MapContainer center={[latitude, longitude]} zoom={10} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <FeatureGroup>
                            <EditControl
                                position="topleft"
                                onCreated={handleDrawCreated}
                                draw={drawOptions}
                            />
                        </FeatureGroup>
                        <LayerGroup>
                            {intersectingPolygons.map((poly, index) => {
                                const coordinateOfEachPolygon = poly.geometry.coordinates[0].map(([lng, lat]) => [lat, lng]);
                                return (
                                    <Polygon key={index} positions={coordinateOfEachPolygon} pathOptions={colorOption} />
                                )
                            })}
                        </LayerGroup>
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default Maps