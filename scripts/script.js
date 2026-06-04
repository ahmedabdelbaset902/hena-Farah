const env = document.getElementById("env");
const btn = document.getElementById("btn");
const flash = document.querySelector(".open-flash");

const main = document.getElementById("main");
const scene = document.querySelector(".scene");
const bottomText = document.querySelector(".bottom-text");

/* =========================
   PARTICLES
========================= */

const particles = document.getElementById("particles");

function createParticle() {
    if (!particles) return;

    const p = document.createElement("div");
    p.classList.add("particle");

    p.style.left = Math.random() * 100 + "vw";
    p.style.bottom = "-10px";
    p.style.animationDuration = (4 + Math.random() * 5) + "s";
    p.style.opacity = Math.random();

    particles.appendChild(p);

    setTimeout(() => p.remove(), 9000);
}

if (particles) {
    setInterval(createParticle, 180);
}

/* =========================
   ELEMENTS
========================= */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const heroVideo = document.querySelector(".hero-video");
const cardVideo = document.querySelector(".card-video");
const bgVideo = document.querySelector(".bg-video");

/* =========================
   VIDEO FIX
========================= */

const prepareVideo = (v) => {
    if (!v) return;

    v.muted = true;
    v.playsInline = true;

    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
};

const playVideo = (v) => {
    if (!v) return;

    try {
        prepareVideo(v);

        v.currentTime = 0;

        const p = v.play();
        if (p !== undefined) {
            p.catch((e) => {
                console.log("Video blocked:", e);
            });
        }

    } catch (e) {
        console.log("Video error:", e);
    }
};

/* =========================
   STOP ON LOAD
========================= */

window.addEventListener("load", () => {

    [heroVideo, cardVideo, bgVideo].forEach(v => {
        if (!v) return;

        try {
            prepareVideo(v);
            v.pause();
            v.currentTime = 0;
        } catch (e) {}
    });

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";

    if (music) {
        music.pause();
        music.currentTime = 0;
        music.volume = 0;
        music.muted = true; // 🔥 مهم للأندرويد
    }

    if (main) {
        main.style.opacity = "0";
        main.style.transform = "translateY(40px)";
        main.style.visibility = "hidden";
    }

    if (scene) {
        scene.style.opacity = "1";
        scene.style.pointerEvents = "auto";
    }
});

/* =========================
   🔥 FIXED AUDIO START (ANDROID + IOS SAFE)
========================= */

let opened = false;

function startAudio() {
    if (!music) return;

    try {
        music.pause();
        music.currentTime = 0;

        music.muted = false;
        music.volume = 0;

        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {

                    let v = 0;

                    const fade = setInterval(() => {
                        v += 0.03;
                        music.volume = Math.min(v, 0.4);

                        if (v >= 0.4) clearInterval(fade);
                    }, 50);

                })
                .catch((e) => {
                    console.log("Audio blocked:", e);
                });
        }

    } catch (e) {
        console.log("Audio error:", e);
    }
}

/* =========================
   OPEN ENVELOPE
========================= */

function openEnvelope() {

    if (opened) return;
    opened = true;

    /* 🎬 تشغيل الفيديو أولاً */
    playVideo(bgVideo);
    playVideo(heroVideo);
    playVideo(cardVideo);

    /* 🔥 تشغيل الصوت بعد الفيديو بـ delay بسيط (مهم جداً للأندرويد) */
    setTimeout(() => {
        startAudio();
    }, 200);

    /* 🎛️ زر الموسيقى */
    if (musicBtn) {
        musicBtn.classList.add("playing");
        musicBtn.innerHTML = `
            <div class="music-disc">
                <i class="fa-solid fa-pause"></i>
            </div>
        `;
    }

    /* ✨ إخفاء المشهد */
    if (scene) {
        scene.style.transition = "opacity 1.2s ease";
        scene.style.opacity = "0";
        scene.style.pointerEvents = "none";
    }

    /* ✨ إظهار المحتوى */
    setTimeout(() => {

        if (main) {
            main.style.transition = "opacity 1.5s ease, transform 1.5s ease";
            main.style.opacity = "1";
            main.style.transform = "translateY(0)";
            main.style.visibility = "visible";
            main.classList.add("show");
        }

        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
        document.documentElement.style.height = "auto";
        document.body.style.height = "auto";

        window.scrollTo({ top: 0, behavior: "smooth" });

    }, 1000);
}

/* =========================
   EVENTS (FIXED - NO DOUBLE TRIGGER BUG)
========================= */

function startSite(e) {
    e?.preventDefault?.();
    openEnvelope();
}

document.addEventListener("touchstart", startSite, { once: true });
document.addEventListener("click", startSite, { once: true });

if (btn) btn.addEventListener("click", openEnvelope);
if (bgVideo) bgVideo.addEventListener("click", openEnvelope);

/* =========================
   MUSIC CONTROL
========================= */

if (musicBtn && music) {

    musicBtn.addEventListener("click", (e) => {

        e.stopPropagation();

        if (music.paused) {

            music.muted = false;
            music.volume = 0.4;

            music.play().catch(() => {});

            musicBtn.classList.add("playing");
            musicBtn.innerHTML = `
                <div class="music-disc">
                    <i class="fa-solid fa-pause"></i>
                </div>
            `;

        } else {

            music.pause();

            musicBtn.classList.remove("playing");
            musicBtn.innerHTML = `
                <div class="music-disc">
                    <i class="fa-solid fa-music"></i>
                </div>
            `;
        }
    });
}


function addToCalendar() {

    const title = "حفل زفاف محمد & مروه";
    const details = "نتشرف بحضوركم حفل زفافنا";
    const location = "قاعة دايموند - قطور غربيه";

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (!isIOS) {

        // Android + Desktop → Google Calendar (timezone-safe)
        const start = "20260605T203000";
const end   = "20260606T010000";

        const googleUrl =
            "https://www.google.com/calendar/render?action=TEMPLATE" +
            "&text=" + encodeURIComponent(title) +
            "&details=" + encodeURIComponent(details) +
            "&location=" + encodeURIComponent(location) +
            "&dates=" + start + "/" + end +
            "&ctz=Africa/Cairo";   // 🔥 أهم سطر

        window.open(googleUrl, "_blank");
        return;
    }

    // iOS → ICS file with timezone
    const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding//EN
CALSCALE:GREGORIAN
BEGIN:VTIMEZONE
TZID:Africa/Cairo
END:VTIMEZONE
BEGIN:VEVENT
UID:123456
DTSTAMP:20260601T120000Z
SUMMARY:${title}
DTSTART;TZID=Africa/Cairo:20260605T203000
DTEND;TZID=Africa/Cairo:20260606T010000
LOCATION:${location}
DESCRIPTION:${details}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding.ics";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}