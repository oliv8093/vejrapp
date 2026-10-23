// assets/js/view/weatherIcon.js

// Laver SVG-ikon (farve styres med CSS)
function svg(paths, label) {
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        role="img" aria-label="${label}">${paths}</svg>`
}

const SUN = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>`
const PARTLY = `<path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41M15.95 12.65a4 4 0 0 0-5.93-4.13M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>`
const CLOUD = `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`
const CLOUD_TOP = `<path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2"/>`
const FOG = CLOUD_TOP + `<path d="M16 17H7M17 21H9"/>`
const RAIN = CLOUD_TOP + `<path d="M16 14v6M8 14v6M12 16v6"/>`
const SNOW = CLOUD_TOP + `<path d="M8 15h.01M8 19h.01M12 17h.01M12 21h.01M16 15h.01M16 19h.01"/>`
const STORM = `<path d="M6 16.33A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.97M13 12l-3 5h4l-3 5"/>`

// weather_code (WMO) -> ikon
export function weatherIcon(code) {
    if (code === 0) return svg(SUN, "Klart")
    if (code <= 2) return svg(PARTLY, "Delvist skyet")
    if (code === 3) return svg(CLOUD, "Overskyet")
    if (code <= 48) return svg(FOG, "Tåge")
    if (code <= 67) return svg(RAIN, "Regn")
    if (code <= 77) return svg(SNOW, "Sne")
    if (code <= 82) return svg(RAIN, "Byger")
    if (code <= 86) return svg(SNOW, "Snebyger")
    return svg(STORM, "Torden")
}