// HAMBURGER MENU
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("open");
    });
}

// CLOSE MENU AFTER CLICK (mobile UX)
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("open");
    });
});


// SMOOTH SCROLL (scroll-to-anchor)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            e.preventDefault();

            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: "smooth"
            });
        }

    });
});

// CONTACT FORM SUBMISSION
document.querySelector("#contact form").addEventListener("submit", async function(e){

    e.preventDefault();

    let formData = new FormData(this);

    let response = await fetch("contact.php", {
        method: "POST",
        body: formData
    });

    let result = await response.json();

    alert(result.message);

    this.reset();

});