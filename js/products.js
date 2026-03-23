// počkej na načtení DOM
document.addEventListener("DOMContentLoaded", function () {

  const productData = {
    alba: {
      title: "Alba",
      desc: "Premium grade cinnamon quills with the highest quality and elegant appearance.",
      specs: [
        "Very thin and smooth quills",
        "Premium export quality",
        "Light color and refined aroma",
        "Ideal for high-end buyers"
      ],
      moq: "100 kg",
      packaging: "Bales / Cartons"
    },
    c5: {
      title: "C5 / C5 Special",
      desc: "Export standard cinnamon with excellent balance of quality and price.",
      specs: [
        "Good quill structure",
        "Suitable for export market",
        "Popular commercial grade",
        "Stable aroma and appearance"
      ],
      moq: "100 kg",
      packaging: "Bales / Cartons"
    },
    c4: {
      title: "C4",
      desc: "Commercial grade cinnamon for standard export and bulk supply.",
      specs: [
        "Practical commercial quality",
        "Bulk export suitable",
        "Reliable aroma",
        "Competitive price segment"
      ],
      moq: "100 kg",
      packaging: "Bales / Cartons"
    },
    m4: {
      title: "M4",
      desc: "Mid-tier export cinnamon grade with strong market demand.",
      specs: [
        "Mid-range export quality",
        "Good for wholesale buyers",
        "Balanced price and quality",
        "Suitable for large orders"
      ],
      moq: "100 kg",
      packaging: "Bales / Cartons"
    },
    h1: {
      title: "H1 / H2",
      desc: "Industrial grade cinnamon used for lower-end processing or bulk applications.",
      specs: [
        "Industrial use",
        "Bulk processing grade",
        "Economical option",
        "Consistent supply"
      ],
      moq: "100 kg",
      packaging: "Bales / Cartons"
    },
    leafoil: {
      title: "Leaf Oil",
      desc: "Essential oil extracted from cinnamon leaves.",
      specs: [
        "Natural essential oil",
        "Aromatic profile",
        "Suitable for industrial and cosmetic use"
      ],
      moq: "100 kg",
      packaging: "Drums / Canisters"
    },
    barkoil50: {
      title: "Bark Oil 50%",
      desc: "High cinnamaldehyde cinnamon bark oil.",
      specs: [
        "50% cinnamaldehyde",
        "Strong aroma",
        "High-value oil"
      ],
      moq: "100 kg",
      packaging: "Drums / Canisters"
    },
    barkoil30: {
      title: "Bark Oil 30%",
      desc: "Cinnamon bark oil with 30% cinnamaldehyde.",
      specs: [
        "30% cinnamaldehyde",
        "Balanced strength",
        "Export ready"
      ],
      moq: "100 kg",
      packaging: "Drums / Canisters"
    },
    pepper: {
      title: "Black Pepper",
      desc: "Premium export quality black pepper.",
      specs: [
        "Strong flavor",
        "Clean export quality",
        "Bulk supply"
      ],
      moq: "100 kg",
      packaging: "Bales / Cartons"
    },
    clove: {
      title: "Clove",
      desc: "High aroma clove spice.",
      specs: [
        "Intense aroma",
        "Whole spice",
        "Export grade"
      ],
      moq: "100 kg",
      packaging: "Bales / Cartons"
    }
  };

  function openProduct(productKey) {
    const product = productData[productKey];

    if (!product) {
      console.warn("Product not found:", productKey);
      return;
    }

    const modal = document.getElementById("productModal");
    const title = document.getElementById("modalTitle");
    const desc = document.getElementById("modalDesc");
    const specsList = document.getElementById("modalSpecs");

    if (!modal || !title || !desc || !specsList) {
      console.error("Modal elements not found");
      return;
    }

    title.textContent = product.title;
    desc.textContent = product.desc;

    specsList.innerHTML = "";
    product.specs.forEach(spec => {
      const li = document.createElement("li");
      li.textContent = spec;
      specsList.appendChild(li);
    });

    document.getElementById("modalMOQ").innerHTML = `<strong>MOQ:</strong> ${product.moq}`;
    document.getElementById("modalPackaging").innerHTML = `<strong>Packaging:</strong> ${product.packaging}`;

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeProduct() {
    const modal = document.getElementById("productModal");
    if (modal) modal.style.display = "none";
    document.body.style.overflow = "";
  }

  function closeOnBackdrop(event) {
    if (event.target.id === "productModal") {
      closeProduct();
    }
  }

  function filterProducts(category, el) {
    const cards = document.querySelectorAll(".catalog-card");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => btn.classList.remove("active"));
    if (el) el.classList.add("active");

    cards.forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      card.style.display =
        category === "all" || cardCategory === category ? "block" : "none";
    });
  }

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      closeProduct();
    }
  });

  // 🔥 důležité – zpřístupnění pro onclick
  window.openProduct = openProduct;
  window.closeProduct = closeProduct;
  window.closeOnBackdrop = closeOnBackdrop;
  window.filterProducts = filterProducts;

});