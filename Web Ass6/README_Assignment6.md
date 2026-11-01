## Assignment 6 — jQuery

jQuery 4.0.0 is loaded from the CDN in the `<head>` of every page (before `script.js`).
All jQuery code is at the bottom of `script.js` inside `$(document).ready(...)`.

| Task | Feature | Where to see it |
|------|---------|-----------------|
| 0 | Setup, "jQuery is ready!" in the console | any page (open DevTools → Console) |
| 1 | Real-time search / live filter (`.filter()`, `input keyup`) | Services → Game Library |
| 2 | Autocomplete suggestions (keyboard ↑ ↓ Enter Esc, click) | Home → "Search the cafe" |
| 3 | Search highlighting (regex + `.html()`, `<mark>`) | Home → FAQ search box |
| 4 | Colorful scroll progress bar | top of every page (scroll down) |
| 5 | Animated number counters (`.animate()` with `step`) | Home → "Our cafe in numbers" |
| 6 | Loading spinner on submit, button disabled, restored after delay | Contact → Submit Booking Request (fill the form correctly) |
| 7 | Toast notifications (`fadeIn`, `delay`, `fadeOut`) | booking submit, subscription, copy, "Select" buttons on Services |
| 8 | Copy to clipboard buttons with check icon + tooltip (`.on('copy')`) | Home → "Handy info" |
| 9 | Image lazy loading (`scroll`, `.offset()`, `.attr('src')`) | Home → gallery (watch the console / Network tab while scrolling) |

Notes
- Assignment 4/5 features are kept (validation, accordion, popup, themes, gallery viewer, etc.).
- The old vanilla booking-form handler was replaced by a jQuery version (same validation rules) so the spinner could be added.
- The gallery preview reads the real image from `data-src`, so it also works for images that were not lazy-loaded yet.

