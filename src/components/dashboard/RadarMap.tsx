"use client";

import {
  MapContainer,
  TileLayer,
  LayersControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const { BaseLayer, Overlay } = LayersControl;

export default function RadarMap() {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-2xl">

      <MapContainer
        center={[23.8315, 91.2868]} // Agartala
        zoom={6}
        scrollWheelZoom
        className="h-full w-full"
      >

        <LayersControl position="topright">

          {/* OpenStreetMap */}

          <BaseLayer checked name="Street">

            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

          </BaseLayer>

          {/* Satellite */}

          <BaseLayer name="Satellite">

            <TileLayer
              attribution="Google"
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />

          </BaseLayer>

          {/* OpenWeather Clouds */}

          <Overlay checked name="Clouds">

            <TileLayer
              opacity={0.6}
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
            />

          </Overlay>

          {/* OpenWeather Precipitation */}

          <Overlay name="Rain">

            <TileLayer
              opacity={0.6}
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
            />

          </Overlay>

          {/* Wind */}

          <Overlay name="Wind">

            <TileLayer
              opacity={0.6}
              url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`}
            />

          </Overlay>

        </LayersControl>

      </MapContainer>

    </div>
  );
}