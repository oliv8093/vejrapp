// assets/js/view/dayCard.js
import { weatherIcon } from "./weatherIcon.js"
import { windArrow } from "./windArrow.js"

// Ét kort for én dag (data-index bruges til at åbne dagsvisningen)
export function dayCard(day) {
    const name = new Date(day.date).toLocaleDateString("da-DK", { weekday: "short" })
    return `
    <article class="day-card" data-index="${day.index}">
        <h3>${name}</h3>
        <div class="day-icon">${weatherIcon(day.code)}</div>
        <p class="day-temp">${Math.round(day.max)}° <span>${Math.round(day.min)}°</span></p>
        <p>${day.rain} mm</p>
        <p>${day.wind} m/s ${windArrow(day.dir)}</p>
    </article>`
}