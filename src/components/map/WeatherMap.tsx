"use client";

import { useEffect, useState } from "react";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ScaleControl,
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import {
  Loader2,
  LocateFixed,
} from "lucide-react";

import MapToolbar, {
  type MapLayer,
} from "./MapToolbar";

import { getCurrentWeather } from "@/services/weatherApi";

import { WeatherData } from "@/types/weather";

import { useSettingsStore } from "@/store/settingsStore";

import {
  formatTemperature,
  formatWindSpeed,
} from "@/utils/weatherUnits";

/*
 * Weather Map Props
 */
interface Props {
  lat: number;
  lon: number;

  city: string;
  country: string;

  /*
   * Raw Celsius values from WeatherAPI.
   *
   * Conversion is handled inside
   * this component using Settings Store.
   */
  temperature: number;
  feelsLike: number;

  condition: string;
  icon: string;

  humidity: number;

  /*
   * Raw km/h value from WeatherAPI.
   */
  windSpeed: number;

  comparisonCities: string[];

  onCitySelect?: (
    city: string
  ) => void;

  onLocationSelect?: (
    lat: number,
    lon: number
  ) => void;

  onCurrentLocation?: () =>
    Promise<void> | void;

  locationLoading?: boolean;
}

/*
 * Main Weather Marker
 */
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

/*
 * Comparison City Marker
 */
const comparisonMarkerIcon =
  new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",

    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [25, 41],

    iconAnchor: [12, 41],

    popupAnchor: [1, -34],

    shadowSize: [41, 41],
  });

/*
 * OpenWeatherMap API Key
 *
 * Used only for weather map layers:
 * - Rain
 * - Clouds
 * - Temperature
 */
const WEATHER_TILE_KEY =
  process.env
    .NEXT_PUBLIC_OPENWEATHER_MAP_KEY;

/*
 * Detect Clicks Anywhere
 * On The Map
 */
function MapClickHandler({
  onLocationSelect,
}: {
  onLocationSelect?: (
    lat: number,
    lon: number
  ) => void;
}) {
  useMapEvents({
    click(event) {
      const {
        lat,
        lng,
      } = event.latlng;

      onLocationSelect?.(
        lat,
        lng
      );
    },
  });

  return null;
}

/*
 * Automatically Update
 * Map Position
 *
 * If comparison cities exist:
 * - Fit all markers on screen
 *
 * Otherwise:
 * - Center current city
 */
function MapBoundsUpdater({
  lat,
  lon,
  comparisonWeather,
}: {
  lat: number;
  lon: number;

  comparisonWeather:
    WeatherData[];
}) {
  const map =
    useMap();

  useEffect(() => {
    /*
     * Comparison Cities Exist
     */
    if (
      comparisonWeather.length >
      0
    ) {
      const positions:
        L.LatLngExpression[] =
        [
          /*
           * Current City
           */
          [
            lat,
            lon,
          ],

          /*
           * Comparison Cities
           */
          ...comparisonWeather.map(
            (item) =>
              [
                item.location
                  .lat,

                item.location
                  .lon,
              ] as L.LatLngExpression
          ),
        ];

      /*
       * Create Map Bounds
       */
      const bounds =
        L.latLngBounds(
          positions
        );

      /*
       * Fit All Markers
       */
      map.fitBounds(
        bounds,
        {
          padding: [
            50,
            50,
          ],

          maxZoom: 10,

          animate: true,
        }
      );

      return;
    }

    /*
     * No Comparison Cities
     *
     * Fly To Current City
     */
    map.flyTo(
      [
        lat,
        lon,
      ],

      10,

      {
        animate: true,

        duration: 1,
      }
    );
  }, [
    lat,
    lon,
    comparisonWeather,
    map,
  ]);

  return null;
}

/*
 * Weather Map Component
 */
export default function WeatherMap({
  lat,
  lon,

  city,
  country,

  temperature,
  feelsLike,

  condition,
  icon,

  humidity,
  windSpeed,

  comparisonCities,

  onCitySelect,

  onLocationSelect,

  onCurrentLocation,

  locationLoading = false,
}: Props) {
  /*
   * Map Layer
   */
  const [
    layer,
    setLayer,
  ] =
    useState<MapLayer>(
      "street"
    );

  /*
   * Comparison City Weather
   */
  const [
    comparisonWeather,
    setComparisonWeather,
  ] =
    useState<
      WeatherData[]
    >([]);

  /*
   * Comparison Loading
   */
  const [
    comparisonLoading,
    setComparisonLoading,
  ] =
    useState(false);

  /*
   * Global Settings
   *
   * Changes automatically update:
   * - Temperature display
   * - Wind speed display
   */
  const {
    temperatureUnit,
    windUnit,
  } =
    useSettingsStore();

  /*
   * Fetch Comparison
   * City Weather
   */
  useEffect(() => {
    let cancelled =
      false;

    async function loadComparisonCities() {
      /*
       * Clear Comparison
       * Markers If Empty
       */
      if (
        !comparisonCities ||
        comparisonCities.length ===
          0
      ) {
        setComparisonWeather(
          []
        );

        return;
      }

      try {
        setComparisonLoading(
          true
        );

        /*
         * Avoid Fetching
         * Current City Twice
         */
        const citiesToFetch =
          comparisonCities.filter(
            (item) =>
              item
                .toLowerCase()
                .trim() !==
              city
                .toLowerCase()
                .trim()
          );

        /*
         * Fetch All Comparison
         * Cities
         */
        const results =
          await Promise.allSettled(
            citiesToFetch.map(
              (
                cityName
              ) =>
                getCurrentWeather(
                  cityName
                )
            )
          );

        /*
         * Effect Already
         * Cleaned Up
         */
        if (cancelled) {
          return;
        }

        /*
         * Keep Only Successful
         * API Requests
         */
        const successfulResults =
          results
            .filter(
              (
                result
              ): result is PromiseFulfilledResult<WeatherData> =>
                result.status ===
                "fulfilled"
            )
            .map(
              (result) =>
                result.value
            );

        /*
         * Save Comparison
         * Weather
         */
        setComparisonWeather(
          successfulResults
        );
      } catch (error) {
        console.error(
          "Unable to load comparison cities:",
          error
        );
      } finally {
        if (
          !cancelled
        ) {
          setComparisonLoading(
            false
          );
        }
      }
    }

    loadComparisonCities();

    /*
     * Cleanup
     */
    return () => {
      cancelled = true;
    };
  }, [
    comparisonCities,
    city,
  ]);

  /*
   * Fix WeatherAPI
   * Current Weather Icon URL
   */
  const weatherIcon =
    icon.startsWith(
      "//"
    )
      ? `https:${icon}`
      : icon;

  /*
   * Get Selected
   * Map Layer URL
   */
  const getTileUrl =
    () => {
      switch (layer) {
        /*
         * Satellite
         */
        case "satellite":
          return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

        /*
         * Rain
         */
        case "rain":
          return `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${WEATHER_TILE_KEY}`;

        /*
         * Clouds
         */
        case "clouds":
          return `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${WEATHER_TILE_KEY}`;

        /*
         * Temperature
         */
        case "temp":
          return `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${WEATHER_TILE_KEY}`;

        /*
         * Street
         */
        default:
          return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      }
    };

  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white/90
        shadow-lg
        backdrop-blur-xl
        transition-all
        duration-300
        dark:border-slate-700
        dark:bg-[#111827]/90
        dark:shadow-xl
      "
    >
      {/* Map Toolbar */}

      <div className="border-b border-slate-200 dark:border-slate-700">
        <MapToolbar
          layer={layer}
          setLayer={
            setLayer
          }
        />
      </div>

      {/* Map Wrapper */}

      <div className="relative">
        <MapContainer
          center={[
            lat,
            lon,
          ]}
          zoom={10}
          zoomControl={
            false
          }
          scrollWheelZoom
          className="h-[500px] w-full"
        >
          {/* Update Map Bounds */}

          <MapBoundsUpdater
            lat={lat}
            lon={lon}
            comparisonWeather={
              comparisonWeather
            }
          />

          {/* Detect Map Click */}

          <MapClickHandler
            onLocationSelect={
              onLocationSelect
            }
          />

          {/* Map Controls */}

          <ZoomControl
            position="bottomright"
          />

          <ScaleControl
            position="bottomleft"
          />

          {/* Map Layer */}

          <TileLayer
            key={layer}
            attribution="© OpenStreetMap contributors"
            url={
              getTileUrl()
            }
          />

          {/* Current Weather Marker */}

          <Marker
            position={[
              lat,
              lon,
            ]}
            icon={
              markerIcon
            }
          >
            <Popup
              minWidth={
                240
              }
              maxWidth={
                280
              }
            >
              <div className="p-1">
                {/* Location */}

                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900">
                    {city}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {country}
                  </p>
                </div>

                {/* Weather */}

                <div className="mt-3 flex items-center justify-center gap-3">
                  <img
                    src={
                      weatherIcon
                    }
                    alt={
                      condition
                    }
                    className="h-16 w-16"
                  />

                  <div>
                    {/* Converted Temperature */}

                    <p className="text-3xl font-bold text-slate-900">
                      {formatTemperature(
                        temperature,
                        temperatureUnit
                      )}
                    </p>

                    <p className="text-sm text-slate-600">
                      {
                        condition
                      }
                    </p>
                  </div>
                </div>

                {/* Feels Like */}

                <p className="mt-2 text-center text-sm text-slate-500">
                  Feels like{" "}

                  <span className="font-semibold text-slate-700">
                    {formatTemperature(
                      feelsLike,
                      temperatureUnit
                    )}
                  </span>
                </p>

                {/* Weather Details */}

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {/* Humidity */}

                  <div className="rounded-lg bg-blue-50 p-2 text-center">
                    <p className="text-xs text-slate-500">
                      Humidity
                    </p>

                    <p className="mt-1 font-bold text-slate-800">
                      💧{" "}
                      {
                        humidity
                      }
                      %
                    </p>
                  </div>

                  {/* Wind */}

                  <div className="rounded-lg bg-cyan-50 p-2 text-center">
                    <p className="text-xs text-slate-500">
                      Wind
                    </p>

                    <p className="mt-1 font-bold text-slate-800">
                      💨{" "}
                      {formatWindSpeed(
                        windSpeed,
                        windUnit
                      )}
                    </p>
                  </div>
                </div>

                {/* Coordinates */}

                <div className="mt-4 border-t border-slate-200 pt-3">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>
                      Lat:{" "}
                      {lat.toFixed(
                        4
                      )}
                    </span>

                    <span>
                      Lon:{" "}
                      {lon.toFixed(
                        4
                      )}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-center text-xs text-slate-400">
                  Click anywhere
                  on the map to
                  view weather
                </p>
              </div>
            </Popup>
          </Marker>

          {/* Comparison City Markers */}

          {comparisonWeather.map(
            (item) => {
              /*
               * Fix Comparison
               * Weather Icon URL
               */
              const itemIcon =
                item.current.condition.icon.startsWith(
                  "//"
                )
                  ? `https:${item.current.condition.icon}`
                  : item
                      .current
                      .condition
                      .icon;

              return (
                <Marker
                  key={`${item.location.name}-${item.location.lat}-${item.location.lon}`}
                  position={[
                    item
                      .location
                      .lat,

                    item
                      .location
                      .lon,
                  ]}
                  icon={
                    comparisonMarkerIcon
                  }
                >
                  <Popup
                    minWidth={
                      210
                    }
                    maxWidth={
                      250
                    }
                  >
                    <div className="p-1 text-center">
                      {/* City */}

                      <h3 className="text-lg font-bold text-slate-900">
                        {
                          item
                            .location
                            .name
                        }
                      </h3>

                      {/* Country */}

                      <p className="text-xs text-slate-500">
                        {
                          item
                            .location
                            .country
                        }
                      </p>

                      {/* Weather */}

                      <div className="mt-3 flex items-center justify-center gap-2">
                        <img
                          src={
                            itemIcon
                          }
                          alt={
                            item
                              .current
                              .condition
                              .text
                          }
                          className="h-14 w-14"
                        />

                        <div className="text-left">
                          {/* Converted Temperature */}

                          <p className="text-2xl font-bold text-slate-900">
                            {formatTemperature(
                              item
                                .current
                                .temp_c,
                              temperatureUnit
                            )}
                          </p>

                          <p className="text-xs text-slate-500">
                            {
                              item
                                .current
                                .condition
                                .text
                            }
                          </p>
                        </div>
                      </div>

                      {/* Weather Details */}

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {/* Humidity */}

                        <div className="rounded-lg bg-blue-50 p-2">
                          <p className="text-xs text-slate-500">
                            Humidity
                          </p>

                          <p className="font-semibold text-slate-800">
                            {
                              item
                                .current
                                .humidity
                            }
                            %
                          </p>
                        </div>

                        {/* Wind */}

                        <div className="rounded-lg bg-cyan-50 p-2">
                          <p className="text-xs text-slate-500">
                            Wind
                          </p>

                          <p className="font-semibold text-slate-800">
                            {formatWindSpeed(
                              item
                                .current
                                .wind_kph,
                              windUnit
                            )}
                          </p>
                        </div>
                      </div>

                      {/* View Full Weather */}

                      <button
                        type="button"
                        onClick={() =>
                          onCitySelect?.(
                            item
                              .location
                              .name
                          )
                        }
                        className="
                          mt-4
                          w-full
                          rounded-xl
                          bg-blue-600
                          px-4
                          py-2.5
                          text-sm
                          font-semibold
                          text-white
                          transition-all
                          duration-300
                          hover:bg-blue-700
                          hover:shadow-lg
                        "
                      >
                        View Full
                        Weather
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            }
          )}
        </MapContainer>

        {/* My Location Button */}

        {onCurrentLocation && (
          <button
            type="button"
            onClick={
              onCurrentLocation
            }
            disabled={
              locationLoading
            }
            className="
              absolute
              left-4
              top-4
              z-[1000]
              flex
              items-center
              gap-2
              rounded-xl
              bg-white
              px-4
              py-3
              font-semibold
              text-slate-700
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-blue-50
              hover:text-blue-600
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {locationLoading ? (
              <>
                <Loader2
                  size={
                    18
                  }
                  className="animate-spin"
                />

                Locating...
              </>
            ) : (
              <>
                <LocateFixed
                  size={
                    18
                  }
                />

                My Location
              </>
            )}
          </button>
        )}

        {/* Comparison Loading */}

        {comparisonLoading && (
          <div className="absolute bottom-4 left-4 z-[1000] flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-xl">
            <Loader2
              size={
                16
              }
              className="animate-spin"
            />

            Loading cities...
          </div>
        )}
      </div>
    </div>
  );
}