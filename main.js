/*
         * CONTACT FORM
         */

        const contactForm =
            document.getElementById("contactForm");

        const formMessage =
            document.getElementById("formMessage");


        contactForm.addEventListener("submit", function(event) {

            event.preventDefault();


            /*
             * Check whether the form is valid.
             */

            if (!contactForm.checkValidity()) {

                formMessage.style.display = "block";

                formMessage.textContent =
                    "Please complete all required fields correctly.";

                return;
            }


            /*
             * Display success message.
             *
             * This demonstration does not actually send
             * an email to a server.
             */

            formMessage.style.display = "block";

            formMessage.textContent =
                "Thank you! Your message has been submitted successfully.";

            contactForm.reset();

        });


        /*
         * Keyboard accessibility:
         * Pressing Escape can return focus to the page.
         */

        document.addEventListener("keydown", function(event) {

            if (event.key === "Escape") {

                document.activeElement.blur();

            }

        });

        // =========================================
// DARK / LIGHT MODE
// =========================================

const themeToggle =
    document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {

    const isDark =
        document.body.getAttribute("data-theme")
        === "dark";

    if (isDark) {

        document.body.removeAttribute(
            "data-theme"
        );

        themeToggle.textContent =
            "🌙 Dark Mode";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        document.body.setAttribute(
            "data-theme",
            "dark"
        );

        themeToggle.textContent =
            "☀️ Light Mode";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
    }

});