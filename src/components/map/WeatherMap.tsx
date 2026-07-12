"use client";

import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ScaleControl,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import MapToolbar from "./MapToolbar";

interface Props {
  lat: number;
  lon: number;
  city: string;
}

const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const WEATHER_TILE_KEY =
  process.env.NEXT_PUBLIC_OPENWEATHER_MAP_KEY;

export default function WeatherMap({
  lat,
  lon,
  city,
}: Props) {
  const [layer, setLayer] = useState("street");

  const getTileUrl = () => {
    switch (layer) {
      case "satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

      case "rain":
        return `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${WEATHER_TILE_KEY}`;

      case "clouds":
        return `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${WEATHER_TILE_KEY}`;

      case "temp":
        return `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${WEATHER_TILE_KEY}`;

      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-[#111827]">

      <MapToolbar
        layer={layer}
        setLayer={setLayer}
      />

      <MapContainer
        center={[lat, lon]}
        zoom={10}
        zoomControl={false}
        scrollWheelZoom
        className="h-[500px] w-full"
      >
        <ZoomControl position="bottomright" />

        <ScaleControl position="bottomleft" />

        <TileLayer
          attribution="© OpenStreetMap"
          url={getTileUrl()}
        />

        <Marker
          position={[lat, lon]}
          icon={markerIcon}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold">
                {city}
              </h3>

              <p>
                {lat.toFixed(4)}, {lon.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

    </div>
  );
}