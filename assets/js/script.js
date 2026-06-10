document.addEventListener("DOMContentLoaded", () => {
    const burgerButton = document.querySelector(".burger-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileMenuLinks = Array.from(document.querySelectorAll(".mobile-menu a"));
    const faqItems = Array.from(document.querySelectorAll(".faq-item"));

    if (burgerButton && mobileMenu) {
        const setMenuOpen = (open) => {
            burgerButton.setAttribute("aria-expanded", String(open));
            mobileMenu.classList.toggle("is-open", open);
            document.body.classList.toggle("menu-open", open);
        };

        burgerButton.addEventListener("click", () => {
            const isOpen = burgerButton.getAttribute("aria-expanded") === "true";
            setMenuOpen(!isOpen);
        });

        mobileMenuLinks.forEach((link) => {
            link.addEventListener("click", () => setMenuOpen(false));
        });
    }

    const setExpandedState = (item, expanded) => {
        const answer = item.querySelector(".faq-answer");
        const inner = item.querySelector(".faq-answer-inner");
        if (!answer || !inner) return;

        if (expanded) {
            item.classList.add("is-open");
            answer.style.height = `${inner.scrollHeight}px`;
        } else {
            answer.style.height = `${inner.scrollHeight}px`;
            requestAnimationFrame(() => {
                answer.style.height = "0px";
            });
            const onTransitionEnd = (event) => {
                if (event.propertyName !== "height") return;
                item.classList.remove("is-open");
                answer.removeEventListener("transitionend", onTransitionEnd);
            };
            answer.addEventListener("transitionend", onTransitionEnd);
        }
    };

    faqItems.forEach((item) => {
        const toggle = item.querySelector(".faq-toggle");
        const answer = item.querySelector(".faq-answer");
        const inner = item.querySelector(".faq-answer-inner");
        if (!toggle || !answer || !inner) return;

        if (item.classList.contains("is-open")) {
            answer.style.height = `${inner.scrollHeight}px`;
        } else {
            answer.style.height = "0px";
        }

        toggle.addEventListener("click", () => {
            const isOpen = item.classList.contains("is-open");

            faqItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains("is-open")) {
                    setExpandedState(otherItem, false);
                }
            });

            setExpandedState(item, !isOpen);
        });
    });

    window.addEventListener("resize", () => {
        faqItems.forEach((item) => {
            if (!item.classList.contains("is-open")) return;
            const answer = item.querySelector(".faq-answer");
            const inner = item.querySelector(".faq-answer-inner");
            if (!answer || !inner) return;
            answer.style.height = `${inner.scrollHeight}px`;
        });
    });
});
