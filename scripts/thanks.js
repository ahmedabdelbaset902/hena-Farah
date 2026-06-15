window.addEventListener("DOMContentLoaded", () => {

    const thanksSection = document.getElementById("thanks");
    const title = document.getElementById("thanksTitle");
    const english = document.getElementById("thanksEn");
    const arabic = document.getElementById("thanksAr");

   

const englishText =
`توديع عزوبية البت وفاء
حشي بليمين وسيبي هموم الدنيا شمال`;

    const arabicText =
`  شرفتونا ونورتونا ♥️`;

    function typeText(element, text, speed, callback) {

        let i = 0;

        element.textContent = "";

        element.classList.add("typing-cursor");

        function typing() {

            if (i < text.length) {

                element.textContent += text.charAt(i);

                i++;

                setTimeout(typing, speed);

            } else {

                element.classList.remove("typing-cursor");

                if (callback) callback();
            }
        }

        typing();
    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                title.classList.add("show");

                setTimeout(() => {

                    typeText(
                        english,
                        englishText,
                        35,
                        () => {

                            setTimeout(() => {

                                typeText(
                                    arabic,
                                    arabicText,
                                    60
                                );

                            }, 500);

                        }
                    );

                }, 700);

                observer.unobserve(thanksSection);
            }

        });

    }, {
        threshold: 0.1
    });

    observer.observe(thanksSection);

});