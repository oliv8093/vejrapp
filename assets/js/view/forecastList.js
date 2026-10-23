// assets/js/view/forecastList.js
import { dayCard } from "./dayCard.js"

// 5 kort fra i morgen (index 1-5 i daily-arrays)
export function forecastList(daily) {
    const cards = daily.time.slice(1, 6).map((date, i) => {
        const n = i + 1
        return dayCard({
            index: n,
            date: date,
            code: daily.weather_code[n],
            max: daily.temperature_2m_max[n],
            min: daily.temperature_2m_min[n],
            rain: daily.precipitation_sum[n],
            wind: daily.wind_speed_10m_max[n],
            dir: daily.wind_direction_10m_dominant[n]
        })
    })
    return `
    <section class="forecast">
        <button id="back-btn">← Tilbage</button>
        <div class="forecast-list">${cards.join("")}</div>
    </section>`
}