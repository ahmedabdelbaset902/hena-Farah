const form = document.getElementById("rsvpForm");

const guestsInput = document.getElementById("guests");
const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");

// رسالة نجاح (هتضيفها في HTML أو ننشئها هنا)
let toast = document.getElementById("toast");

if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.85);
        color: #fff;
        padding: 12px 20px;
        border-radius: 12px;
        font-size: 14px;
        opacity: 0;
        pointer-events: none;
        transition: 0.4s ease;
        z-index: 999999;
    `;
    document.body.appendChild(toast);
}

function showToast(msg) {
    toast.textContent = msg;
    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 2500);
}

// =========================
// COUNTER LOGIC
// =========================

minusBtn.addEventListener("click", () => {
    let value = parseInt(guestsInput.value);

    if (value > 1) guestsInput.value = value - 1;
});

plusBtn.addEventListener("click", () => {
    let value = parseInt(guestsInput.value);

    if (value < 10) guestsInput.value = value + 1;
});

guestsInput.addEventListener("input", () => {
    let value = parseInt(guestsInput.value);

    if (isNaN(value) || value < 1) guestsInput.value = 1;
    if (value > 10) guestsInput.value = 10;
});

// =========================
// FORM SUBMIT
// =========================

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", document.getElementById("name").value);
    formData.append("guests", guestsInput.value);
    formData.append("attendance", document.getElementById("attendance").value);

    showToast("جارٍ إرسال التأكيد 🤍");

    fetch("https://script.google.com/macros/s/AKfycbwJHKhSfvMXalLOerc3H8FxvcmeOF9AyHyYgoEhOikheujyX3AWxt53pJDZHTUx0bhI/exec", {
        method: "POST",
        body: formData,
        mode: "no-cors"
    });

    setTimeout(() => {
        showToast("تم تأكيد الحضور بنجاح 🤍");
        form.reset();
        guestsInput.value = 1;
    }, 1200);
});