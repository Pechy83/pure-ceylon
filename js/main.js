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

const products = {
    alba: {
        title: "Alba Cinnamon",
        desc: "Highest grade of Ceylon cinnamon with very thin quills.",
        specs: [
            "Diameter: < 6 mm",
            "Color: Light golden",
            "Moisture: Max 13%",
            "Origin: Sri Lanka"
        ]
    },
    c5special: {
        title: "C5 Special",
        desc: "High-quality cinnamon for export markets.",
        specs: [
            "Premium grade",
            "Strong aroma",
            "Export quality"
        ]
    },
    c5: {
        title: "C5",
        desc: "Standard export grade cinnamon.",
        specs: [
            "Good quality",
            "Balanced price"
        ]
    },
    c4: {
        title: "C4",
        desc: "Commercial grade cinnamon.",
        specs: [
            "Widely used",
            "Cost effective"
        ]
    },
    m4: {
        title: "M4",
        desc: "Medium grade cinnamon.",
        specs: [
            "Good availability",
            "Bulk supply"
        ]
    },
    h1: {
        title: "H1",
        desc: "Lower grade cinnamon for industrial use.",
        specs: [
            "Industrial use",
            "Lower cost"
        ]
    },
    h2: {
        title: "H2",
        desc: "Economy grade cinnamon.",
        specs: [
            "Bulk orders",
            "Affordable"
        ]
    }
};

function openProduct(id) {
    const product = products[id];

    document.getElementById("modalTitle").innerText = product.title;
    document.getElementById("modalDesc").innerText = product.desc;

    const specsList = document.getElementById("modalSpecs");
    specsList.innerHTML = "";

    product.specs.forEach(spec => {
        const li = document.createElement("li");
        li.textContent = spec;
        specsList.appendChild(li);
    });

    document.getElementById("productModal").style.display = "block";
}

function closeProduct() {
    document.getElementById("productModal").style.display = "none";
}

/* FILTER */
function filterProducts(category) {
    const cards = document.querySelectorAll(".catalog-card");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    cards.forEach(card => {
        if (category === "all" || card.dataset.category === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}