interface WeatherDataInterface {
  weather: {
    timestamp: string;
    source_id: number;
    cloud_cover: number | null;
    condition:
      | "dry"
      | "fog"
      | "rain"
      | "sleet"
      | "snow"
      | "hail"
      | "thunderstorm"
      | null;
    dew_point: number | null;
    icon:
      | "clear-day"
      | "clear-night"
      | "partly-cloudy-day"
      | "partly-cloudy-night"
      | "cloudy"
      | "fog"
      | "wind"
      | "rain"
      | "sleet"
      | "snow"
      | "hail"
      | "thunderstorm"
      | null;
    precipitation: number | null;
    pressure_msl: number | null;
    relative_humidity: number | null;
    sunshine: number | null;
    temperature: number | null;
    visibility: number | null;
    wind_direction: number | null;
    wind_speed: number | null;
    wind_gust_direction: number | null;
    wind_gust_speed: number | null;
    fallback_source_ids: number | null;
  };
  sources: {
    id: number;
    dwd_station_id: string | null;
    wmo_station_id: string | null;
    station_name: string | null;
    observation_type: "forecast" | "synop" | "current" | "historical";
    first_record: string;
    last_record: string;
    lat: number;
    lon: number;
    height: number;
    distance: number;
  };
}
export default function useWeather() {
  const loading = ref(true);
  const notSupported = ref(false);
  const weather = reactive<{ data: WeatherDataInterface | null }>({
    data: null,
  });

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      const checkPermission = await navigator.permissions.query({
        name: "geolocation",
      });
      if (checkPermission.state === "denied") {
        loading.value = false;
      }
    } else {
      alert("Geolocation is not supported by this browser.");
      notSupported.value = true;
      loading.value = false;
    }
  };

  const showPosition = async (position) => {
    loading.value = true;
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    try {
      weather.data = await $fetch<WeatherDataInterface>(
        `https://api.brightsky.dev/current_weather?lat=${lat}&lon=${lng}`
      );
    } catch (e) {
      console.log("Error getting weather", e);
    }
    loading.value = false;
  };

  const icon = computed(() => {
    if (!weather.data?.weather?.icon) return "clear-day";
    switch (weather.data.weather.icon) {
      case "clear-day":
        return "clear-day";
      case "clear-night":
        return "clear-night";
      case "partly-cloudy-day":
        return "partly-cloudy-day";
      case "partly-cloudy-night":
        return "partly-cloudy-night";
      case "cloudy":
        return "cloudy";
      case "fog":
        return "fog";
      case "wind":
        return "wind";
      case "rain":
        return "rain";
      case "sleet":
        return "sleet";
      case "snow":
        return "snow";
      case "hail":
        return "hail";
      case "thunderstorm":
        return "thunderstorm";
    }
  });

  const name = computed(() => {
    if (!weather.data?.weather?.icon) return "Dry";
    switch (weather.data.weather.icon) {
      case "clear-day":
        return "Clear day";
      case "clear-night":
        return "Clear night";
      case "partly-cloudy-day":
        return "Partly cloudy day";
      case "partly-cloudy-night":
        return "Partly cloudy night";
      case "cloudy":
        return "Cloudy";
      case "fog":
        return "Foggy";
      case "wind":
        return "Windy";
      case "rain":
        return "Rainy";
      case "sleet":
        return "Sleet";
      case "snow":
        return "Snowy";
      case "hail":
        return "Hail";
      case "thunderstorm":
        return "Thunderstorm";
    }
  });

  return { weather, getLocation, icon, name, loading, notSupported };
}
