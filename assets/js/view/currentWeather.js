// assets/js/view/currentWeather.js
import { weatherIcon } from "./weatherIcon.js"
import { windArrow } from "./windArrow.js"

// Én flise med label og værdi
function tile(label, value) {
    return `<div class="tile"><span>${label}</span><strong>${value}</strong></div>`
}

// Forside: vejret lige nu
export function currentWeather(current) {
    return `
    <section class="current">
        <div class="current-icon">${weatherIcon(current.weather_code)}</div>
        <p class="current-temp">${Math.round(current.temperature_2m)}°</p>
        <div class="tiles">
            ${tile("Vindstyrke (10 m)", `${current.wind_speed_10m} m/s`)}
            ${tile("Vindretning", windArrow(current.wind_direction_10m))}
            ${tile("Nedbør", `${current.precipitation} mm`)}
        </div>
        <button id="forecast-btn">Næste 5 dage →</button>
    </section>`
}