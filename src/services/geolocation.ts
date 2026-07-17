export interface Coordinates {
  latitude: number;
  longitude: number;
}

export class GeolocationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeolocationError";
  }
}

/**
 * Get user's current GPS coordinates.
 */
export const getCurrentPosition =
  (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(
          new GeolocationError(
            "Geolocation is only available in the browser."
          )
        );
        return;
      }

      if (!navigator.geolocation) {
        reject(
          new GeolocationError(
            "Geolocation is not supported by this browser."
          )
        );
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(
                new GeolocationError(
                  "Location permission denied."
                )
              );
              break;

            case error.POSITION_UNAVAILABLE:
              reject(
                new GeolocationError(
                  "Location information is unavailable."
                )
              );
              break;

            case error.TIMEOUT:
              reject(
                new GeolocationError(
                  "Location request timed out."
                )
              );
              break;

            default:
              reject(
                new GeolocationError(
                  "Unable to determine your location."
                )
              );
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  };