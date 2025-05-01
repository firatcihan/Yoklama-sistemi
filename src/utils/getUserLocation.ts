// src/utils/getUserLocation.ts
import axios from "axios";

import { getCurrentPosition } from "@/utils/getCurrentPosition";
import { API_URL } from "@/api/getBackendUrl.ts";

interface LatLon {
  latitude: number;
  longitude: number;
}

export async function getUserLocation(): Promise<LatLon> {
  const ua = navigator.userAgent || "";
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(ua);

  if (isMobile) {
    const pos = await getCurrentPosition({
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    });
    return {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };
  } else {
    const { data } = await axios.get<LatLon>(`${API_URL}/api/attendance/gps`);
    return {
      latitude: data.latitude,
      longitude: data.longitude,
    };
  }
}
