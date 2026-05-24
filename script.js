// ==============================
// DAFTAR IPHONE
// ==============================
const motors = [
  {
    name: "Iphone 11 Second Ibox 256GB",
    sold: "Terjual 2",
    img: "https://unboxing.id/wp-content/uploads/2022/06/Iphone-11-red.jpg",
    category: "matic",
    new: false,
    link: "iphone11/"
  },

  {
    name: "Iphone 12 Second Ibox 256GB",
    sold: "Terjual 5",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZitlLMfl705_AlQdWXSG3uOSyaeMSn6Kg_j7UhSyS_A&s=10",
    category: "matic",
    new: false,
    link: "iphone12/"
  },

  {
    name: "Iphone 13 Second Ibox 256GB",
    sold: "Terjual 1",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9PRezB9mjLIJ8JK8098HScSXAjXFBwUmINMoo44D02zsuR9dAC1qp1B0&s=10",
    category: "matic",
    new: false,
    link: "iphone13/"
  },
];

// ==============================
// RENDER PRODUK
// ==============================
function renderMotors(category) {

  const list = document.getElementById("motorList");

  if (!list) return;

  list.innerHTML = "";

  motors
    .filter(m => m.category === category)
    .forEach(motor => {

      // Card jadi LINK
      const card = document.createElement("a");

      card.className = "motor-card";

      card.href = motor.link;

      card.innerHTML = `

        ${motor.new ? '<div class="new-label">New!</div>' : ""}

        <div class="img-box">
          <img src="${motor.img}" alt="${motor.name}">
        </div>

        <div class="info">
          <h3>${motor.name}</h3>

          <p class="sold">${motor.sold}</p>
        </div>
      `;

      list.appendChild(card);
    });
}

renderMotors("matic");

// ==============================
// TAB CATEGORY
// ==============================
document.querySelectorAll(".tab").forEach(tab => {

  tab.addEventListener("click", () => {

    document.querySelectorAll(".tab")
      .forEach(t => t.classList.remove("active"));

    tab.classList.add("active");

    renderMotors(tab.dataset.category);

  });

});

// ==========================
// INCLUDE HEADER / FOOTER
// ==========================
document.addEventListener("DOMContentLoaded", function () {

  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(el => {

    const file = el.getAttribute("data-include");

    fetch(file)
      .then(res => {

        if (!res.ok)
          throw new Error(`Gagal memuat ${file}`);

        return res.text();

      })

      .then(data => {

        el.innerHTML = data;

      })

      .catch(err => console.error(err));

  });

});

// ==========================
// SLIDER MANUAL
// ==========================
document.addEventListener("DOMContentLoaded", function () {

  const slider = document.querySelector(".slider-wrapper");

  const images = document.querySelectorAll(".slider-wrapper img");

  const dots = document.querySelectorAll(".slider-dots .dot");

  if (!slider || images.length === 0) return;

  let index = 0;

  let startX = 0;

  let currentX = 0;

  let isDragging = false;

  function updateSlider() {

    slider.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

  }

  // TOUCH
  slider.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;

    isDragging = true;

  });

  slider.addEventListener("touchmove", (e) => {

    if (!isDragging) return;

    currentX = e.touches[0].clientX;

  });

  slider.addEventListener("touchend", () => {

    if (!isDragging) return;

    const diff = startX - currentX;

    if (diff > 50 && index < images.length - 1)
      index++;

    else if (diff < -50 && index > 0)
      index--;

    updateSlider();

    isDragging = false;

  });

  // DESKTOP
  slider.addEventListener("mousedown", (e) => {

    startX = e.clientX;

    isDragging = true;

  });

  slider.addEventListener("mousemove", (e) => {

    if (!isDragging) return;

    currentX = e.clientX;

  });

  slider.addEventListener("mouseup", () => {

    if (!isDragging) return;

    const diff = startX - currentX;

    if (diff > 50 && index < images.length - 1)
      index++;

    else if (diff < -50 && index > 0)
      index--;

    updateSlider();

    isDragging = false;

  });

  slider.addEventListener("mouseleave", () => {

    isDragging = false;

  });

  updateSlider();

});
