
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
      image: "assets/alba1.jpg",
      alt: "Alba cinnamon quills",
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
      image: "assets/C5 special.jpg",
      alt: "C5 cinnamon quills",
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
      image: "assets/C4.jpg",
      alt: "C4 cinnamon quills",
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
      image: "assets/M4.jpg",
      alt: "M4 cinnamon quills",
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
      image: "assets/H1.jpg",
      alt: "H1 cinnamon quills",
      moq: "100 kg",
      packaging: "Bales / Cartons"
    },

    quillings: {
      title: "Quills",
      desc: "Whole cinnamon quills for various applications.",
      specs: [
        "Whole quills",
        "Various sizes available",
        "Export grade"
      ],
      image: "assets/quillings1.jpg",
      alt: "Cinnamon quills",
      moq: "100 kg",
      packaging: "Bales / Cartons"
    },

    powder: {
      title: "Powder",
      desc: "Finely ground cinnamon powder for culinary and industrial use.",
      specs: [
        "Finely ground",
        "Consistent quality",
        "Export grade"
      ],
      image: "assets/powder1.jpg",
      alt: "Cinnamon powder",
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
      image: "assets/leafoil1.jpg",
      alt: "Cinnamon leaf oil",
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
      image: "assets/barkoil50.jpg",
      alt: "Cinnamon bark oil 50%",
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
      image: "assets/barkoil30.jpg",
      alt: "Cinnamon bark oil 30%",
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
      image: "assets/pepper1.jpg",
      alt: "Black pepper",
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
      image: "assets/clove1.jpg",
      alt: "Clove spice",
      moq: "100 kg",
      packaging: "Bales / Cartons"
    }
  };

 document.addEventListener("DOMContentLoaded", function () {

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
    const modalImage = document.getElementById("modalImage");
    const moq = document.getElementById("modalMOQ");
    const packaging = document.getElementById("modalPackaging");

    title.textContent = product.title || "";
    desc.textContent = product.desc || "";

    specsList.innerHTML = "";
    if (product.specs) {
      product.specs.forEach(spec => {
        const li = document.createElement("li");
        li.textContent = spec;
        specsList.appendChild(li);
      });
    }

    // 🔥 IMAGE FIX
    if (modalImage && product.image) {
      modalImage.src = product.image;
      modalImage.alt = product.alt || product.title;
      modalImage.style.display = "block";
    }

    if (moq) moq.innerHTML = `<strong>MOQ:</strong> ${product.moq || "—"}`;
    if (packaging) packaging.innerHTML = `<strong>Packaging:</strong> ${product.packaging || "—"}`;

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

  // 🔥 MUSÍ být uvnitř DOMContentLoaded
  window.openProduct = openProduct;
  window.closeProduct = closeProduct;
  window.closeOnBackdrop = closeOnBackdrop;
  window.filterProducts = filterProducts;
});