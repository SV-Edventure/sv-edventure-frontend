import React, { useEffect, useState, Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ActivityProps } from './ActivityCard';
// Custom marker icons based on category
const getMarkerIcon = (category: string = '') => {
    const categoryColors = {
        Space: '#3b82f6',
        Aviation: '#3b82f6',
        Astronomy: '#3b82f6',
        STEM: '#3b82f6',
        Science: '#3b82f6',
        Coding: '#3b82f6',
        Marine: '#06b6d4',
        Ecology: '#06b6d4',
        Engineering: '#06b6d4',
        Sailing: '#06b6d4',
        Conservation: '#06b6d4',
        'Water Sports': '#06b6d4',
        Agriculture: '#22c55e',
        Farming: '#22c55e',
        Hiking: '#22c55e',
        Climbing: '#22c55e',
        Gardening: '#22c55e',
        Geology: '#22c55e',
        default: '#6366f1' // indigo
    };
    const color = categoryColors[category] || categoryColors.default;
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
            <span style="font-size: 16px;">📍</span>
           </div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    });
};
// Custom hook for Leaflet icon initialization
const useLeafletIcons = () => {
    useEffect(() => {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
        });
    }, []);
};
// Component to recenter map
const MapRecenter = ({
    coordinates
}: {
    coordinates: [number, number];
}) => {
    const map = useMap();
    useEffect(() => {
        map.setView(coordinates, 10);
    }, [coordinates, map]);
    return null;
};
interface MapViewProps {
    activities: ActivityProps[];
    onActivityClick?: (activity: ActivityProps) => void;
}
export const MapView = ({
    activities,
    onActivityClick
}: MapViewProps) => {
    // Initialize Leaflet icons
    useLeafletIcons();
    // Default center is the Bay Area
    const defaultCenter: [number, number] = [37.4419, -122.143]; // Palo Alto coordinates
    const [selectedActivity, setSelectedActivity] = useState<ActivityProps | null>(null);
    // Filter out activities without coordinates
    const activitiesWithCoordinates = activities.filter(activity => activity.coordinates && activity.coordinates.length === 2);
    // Handle marker click
    const handleMarkerClick = (activity: ActivityProps) => {
        setSelectedActivity(activity);
    };
    // Handle view details click
    const handleViewDetails = () => {
        if (selectedActivity && onActivityClick) {
            onActivityClick(selectedActivity);
        }
    };
    return <div className="w-full">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-[600px] w-full relative">
                <MapContainer center={defaultCenter} zoom={9} style={{
                    height: '100%',
                    width: '100%'
                }} scrollWheelZoom={true}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {selectedActivity && selectedActivity.coordinates && <MapRecenter coordinates={selectedActivity.coordinates} />}
                    {activitiesWithCoordinates.map(activity => <Marker key={activity.id} position={activity.coordinates as [number, number]} icon={getMarkerIcon(activity.category)} eventHandlers={{
                        click: () => handleMarkerClick(activity)
                    }}>
                        <Popup>
                            <div className="w-64">
                                <img src={activity.imageUrl} alt={activity.title} className="w-full h-32 object-cover rounded-t-lg" />
                                <div className="p-3">
                                    <h3 className="font-bold text-base mb-1">
                                        {activity.title}
                                    </h3>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <span className="text-sm">{activity.location}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="font-medium">${activity.price}</div>
                                        <div className="flex items-center">
                                            <span className="text-yellow-500 mr-1">★</span>
                                            <span className="text-sm">{activity.rating}</span>
                                        </div>
                                    </div>
                                    <button onClick={handleViewDetails} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-3 rounded-md transition-colors text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>)}
                </MapContainer>
            </div>
            <div className="p-4 border-t border-gray-200">
                <h3 className="font-medium mb-2">Map Legend</h3>
                <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Sky Activities</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-cyan-500 mr-2"></div>
                        <span className="text-sm">Sea Activities</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Land Activities</span>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};