// src/utils/getCurrentPosition.ts
export function getCurrentPosition(
  options: PositionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 10000,
  },
): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Tarayıcı konumu desteklemiyor"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
