// assets/js/model/weatherModel.js

// Open-Meteo endpoint
const BASE_URL = "https://api.open-meteo.com/v1/forecast"

// Aalborg bruges, hvis brugeren siger nej til position
const FALLBACK = { lat: 57.048, lon: 9.919 }

// Henter brugerens position (eller fallback)
export function getPosition() {
    return new Promise((resolve) => {
        // Browseren understøtter ikke geolocation
        if (!("geolocation" in navigator)) {
            resolve(FALLBACK)
            return
        }
        navigator.geolocation.getCurrentPosition(
            // Succes: brug brugerens koordinater
            (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            // Fejl eller afvist: brug fallback
            () => resolve(FALLBACK),
            // Giv op efter 5 sek., og brug en position op til 10 min. gammel
            { timeout: 5000, maximumAge: 600000 }
        )
    })
}

// Henter vejrdata for en position
export async function getWeather(lat, lon) {
    // Bygger URL'ens parametre
    const params = new URLSearchParams({
        // Afrundet til 2 decimaler, så adressen er ens hver gang (cache)
        latitude: lat.toFixed(2),
        longitude: lon.toFixed(2),
        timezone: "auto",
        forecast_days: 7,
        wind_speed_unit: "ms", // m/s
        // Vejret lige nu
        current: "temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,precipitation",
        // Dage (5 dages udsigt)
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant",
        // Timer (1 dags view)
        hourly: "temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,precipitation"
    })

    const res = await fetch(`${BASE_URL}?${params}`)

    // Stop hvis svaret ikke er ok
    if (!res.ok) throw new Error("Vejrdata kunne ikke hentes")

    return res.json()
}