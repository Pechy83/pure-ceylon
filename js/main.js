// HAMBURGER MENU
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("open");
    });
}

// CLOSE MENU AFTER CLICK (mobile UX)
const navLinks = document.querySelectorAll("nav ul li a");

if (navLinks.length && navMenu && menuToggle) {
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("open");
        });
    });
}


// SMOOTH SCROLL (scroll-to-anchor)
const anchors = document.querySelectorAll('a[href^="#"]');

if (anchors.length) {
    anchors.forEach(anchor => {
        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();

                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: "smooth"
                });
            }

        });
    });
}


// CONTACT FORM (jen pokud existuje!)
const contactForm = document.querySelector("#contact form");

if (contactForm) {
    contactForm.addEventListener("submit", async function(e){

        e.preventDefault();

        let formData = new FormData(this);

        try {
            let response = await fetch("contact.php", {
                method: "POST",
                body: formData
            });

            let result = await response.json();

            alert(result.message);

            this.reset();

        } catch (err) {
            console.error("Form error:", err);
            alert("Something went wrong.");
        }

    });
}

window.addEventListener("scroll", () => {
  document.querySelector("header").classList.toggle("scrolled", window.scrollY > 20);
});

        // Funkce pro kontrolu, zda je prvek viditelný na obrazovce
        function animateOnScroll() {
            const triggers = document.querySelectorAll('.js-scroll-trigger');
            
            triggers.forEach(trigger => {
                const triggerTop = trigger.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                // Pokud je vršek prvku v 80% výšky okna, spustíme animaci
                if (triggerTop < windowHeight * 0.85) {
                    trigger.classList.add('animate-in');
                }
            });
        }

        // Spustíme kontrolu při načtení stránky (pro případ, že už tam uživatel je)
        window.addEventListener('load', animateOnScroll);
        // Spustíme kontrolu při každém scrollu
        window.addEventListener('scroll', animateOnScroll);