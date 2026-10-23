// assets/js/view/windArrow.js

// Pil der peger den vej, vinden blæser hen (+180)
export function windArrow(deg) {
    return `<span class="wind-arrow" style="transform: rotate(${deg + 180}deg)">↑</span>`
}