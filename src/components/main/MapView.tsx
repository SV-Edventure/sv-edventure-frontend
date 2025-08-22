"use client";

import { useEffect, useRef } from "react";
import L, { Map as LeafletMap, LayerGroup } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Program } from "@/models/program";

const DIRECTUS_BASE = (process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8055").replace(/\/+$/, "");
const assetUrl = (id?: string | null) => (id ? `${DIRECTUS_BASE}/assets/${id}` : "");

// const getMarkerIcon = (type?: string) => {
//   const typeColors: Record<string, string> = {
//     sky: "#3b82f6",
//     sea: "#06b6d4",
//     land: "#22c55e",
//     default: "#6366f1",
//   };
//   const key = (type || "").toLowerCase();
//   const color = typeColors[key] || typeColors.default;
//   return L.divIcon({
//     className: "custom-div-icon",
//     html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><span style="font-size: 16px;">📍</span></div>`,
//     iconSize: [30, 30],
//     iconAnchor: [15, 30],
//     popupAnchor: [0, -30],
//   });
// };

const getMarkerIcon = () => {
  const color = "#6366f1"; // default 색상으로 고정
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><span style="font-size: 16px;">📍</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

interface MapViewProps {
  programs: Program[];
  onActivityClick?: (activityId: number) => void;
}

export const MapView = ({ programs, onActivityClick }: MapViewProps) => {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LayerGroup | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapDivRef.current) return;

    const map = L.map(mapDivRef.current, {
      center: [37.4419, -122.143],
      zoom: 9,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    const layer = markersRef.current;
    layer.clearLayers();

    const items = programs
      .map((a) => ({
        ...a,
        lat: a.latitude != null ? Number(a.latitude) : undefined,
        lng: a.longitude != null ? Number(a.longitude) : undefined,
      }))
      .filter((a) => Number.isFinite(a.lat) && Number.isFinite(a.lng)) as (Program & {
      lat: number;
      lng: number;
    })[];

    items.forEach((a) => {
      const marker = L.marker([a.lat, a.lng], {
        icon: getMarkerIcon(),
      });

      const imgHtml = a.image
        ? `<img src="${assetUrl(a.image)}" alt="${(a.title || "")
            .replace(/"/g, "&quot;")}" style="width:100%;height:128px;object-fit:cover;border-top-left-radius:0.5rem;border-top-right-radius:0.5rem" />`
        : "";

      const priceHtml = a.isFree ? "Free" : `$${a.price ?? 0}`;

      const popupHtml = `
        <div class="w-64">
          ${imgHtml}
          <div class="p-3">
            <h3 class="font-bold text-base mb-1">${a.title ?? ""}</h3>
            <div class="flex items-center text-gray-600 mb-2">
              <span class="text-sm">${a.location ?? ""}</span>
            </div>
            <div class="flex justify-between items-center mb-2">
              <div class="font-medium">${priceHtml}</div>
            </div>
            <button type="button" id="view-${a.id}" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-3 rounded-md transition-colors text-sm">
              View Details
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on("popupopen", () => {
        const btn = document.getElementById(`view-${a.id}`);
        if (btn) btn.onclick = () => onActivityClick?.(a.id);
      });

      marker.addTo(layer);
    });

    if (items.length > 0) {
      const bounds = L.latLngBounds(items.map((i) => [i.lat, i.lng] as [number, number]));
      mapRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [programs, onActivityClick]);

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div ref={mapDivRef} className="h-[600px] w-full relative" />
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
    </div>
  );
};