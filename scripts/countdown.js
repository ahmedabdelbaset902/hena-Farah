const weddingDate = new Date("2026-06-18T00:00:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let timer;

function updateCountdown() {

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {

        clearInterval(timer);

        document.querySelector(".timer").innerHTML =
            `<div class="wedding-finished">🎉 تم الزفاف 🎉</div>`;

        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const m = Math.floor((distance / (1000 * 60)) % 60);
    const s = Math.floor((distance / 1000) % 60);

    daysEl.innerHTML = String(d).padStart(2, "0");
    hoursEl.innerHTML = String(h).padStart(2, "0");
    minutesEl.innerHTML = String(m).padStart(2, "0");
    secondsEl.innerHTML = String(s).padStart(2, "0");
}

updateCountdown();
timer = setInterval(updateCountdown, 1000);

function updateFlip(el, newValue) {

    if (el.innerText === newValue) return;

    el.classList.add("flip-out");

    setTimeout(() => {

        el.innerText = newValue;

        el.classList.remove("flip-out");
        el.classList.add("flip-in");

        setTimeout(() => {
            el.classList.remove("flip-in");
        }, 350);

    }, 350);
}