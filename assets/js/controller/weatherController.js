// assets/js/controller/weatherController.js
import { getPosition, getWeather } from "../model/weatherModel.js"
import { currentWeather } from "../view/currentWeather.js"
import { forecastList } from "../view/forecastList.js"
import { dayDetail } from "../view/dayDetail.js"

const content = document.querySelector("#content")
let weather // gemmer data, så vi kun henter én gang

// Dato i headeren og klokkeslæt + online/offline i footeren
function showMeta() {
    const date = new Date(weather.current.time)

    document.querySelector("#date").textContent = date.toLocaleDateString("da-DK", {
        weekday: "long",
        day: "numeric",
        month: "long"
    })

    const time = date.toLocaleTimeString("da-DK", {
        hour: "2-digit",
        minute: "2-digit"
    })
    const status = navigator.onLine ? "Online" : "Offline (gemt data)"

    document.querySelector("#updated").textContent = `${status} · Opdateret kl. ${time}`
}

// Side 1: vejret nu
function showHome() {
    content.innerHTML = currentWeather(weather.current)
    document.querySelector("#forecast-btn").addEventListener("click", showForecast)
}

// Side 2: 5 dages udsigt (klik på et kort åbner dagsvisningen)
function showForecast() {
    content.innerHTML = forecastList(weather.daily)
    document.querySelector("#back-btn").addEventListener("click", showHome)

    document.querySelectorAll(".day-card").forEach((card) => {
        card.addEventListener("click", () => showDay(Number(card.dataset.index)))
    })
}

// Side 3: 1-dags view (time for time)
function showDay(index) {
    content.innerHTML = dayDetail(weather.hourly, index)
    document.querySelector("#back-btn").addEventListener("click", showForecast)
}

// Start
async function init() {
    const { lat, lon } = await getPosition()
    weather = await getWeather(lat, lon)
    showMeta()
    showHome()
}

// Opdatér teksten, når nettet kommer og går
window.addEventListener("online", () => weather && showMeta())
window.addEventListener("offline", () => weather && showMeta())

init()