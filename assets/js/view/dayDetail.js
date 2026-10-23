// assets/js/view/dayDetail.js
import { weatherIcon } from "./weatherIcon.js"
import { windArrow } from "./windArrow.js"

// Én time
function hourRow(hourly, i) {
    return `
    <div class="hour-row">
        <span class="hour-time">${hourly.time[i].slice(11, 16)}</span>
        <span class="hour-icon">${weatherIcon(hourly.weather_code[i])}</span>
        <strong class="hour-temp">${Math.round(hourly.temperature_2m[i])}°</strong>
        <span>${hourly.precipitation[i]} mm</span>
        <span>${hourly.wind_speed_10m[i]} m/s ${windArrow(hourly.wind_direction_10m[i])}</span>
    </div>`
}

// 1-dags view: 24 timer for den valgte dag
export function dayDetail(hourly, dayIndex) {
    const start = dayIndex * 24
    const title = new Date(hourly.time[start]).toLocaleDateString("da-DK", {
        weekday: "long",
        day: "numeric",
        month: "long"
    })

    let rows = ""
    for (let i = start; i < start + 24; i++) {
        rows += hourRow(hourly, i)
    }

    return `
    <section class="day-detail">
        <button id="back-btn">← Tilbage</button>
        <h2>${title}</h2>
        <div class="hour-list">${rows}</div>
    </section>`
}