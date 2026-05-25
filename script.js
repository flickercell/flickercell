// ==============================
// DAFTAR IPHONE
// ==============================
const motors = [

  {
    name: "Iphone 11 Second Ibox 256GB",
    price: "Rp. 6.000.000",
    sold: "Terjual 2",
    img: "https://unboxing.id/wp-content/uploads/2022/06/Iphone-11-red.jpg",
    category: "matic",
    new: false,
    link: "iphone11/"
  },

  {
    name: "Iphone 12 Second Ibox 256GB",
    price: "Rp. 7.000.000",
    sold: "Terjual 5",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZitlLMfl705_AlQdWXSG3uOSyaeMSn6Kg_j7UhSyS_A&s=10",
    category: "matic",
    new: false,
    link: "iphone12/"
  },

  {
    name: "Iphone 13 Second Ibox 256GB",
    price: "Rp. 8.000.000",
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

      const card = document.createElement("a");

      card.className = "motor-card";

      card.href = motor.link;

      card.innerHTML = `

        ${motor.new ? '<div class="new-label">New!</div>' : ""}

        <img src="${motor.img}" alt="${motor.name}">

        <div class="info">

          <h3>${motor.name}</h3>

          <p class="price">${motor.price}</p>

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
// SLIDER PROMO AUTO
// ==========================
let slideIndex = 0;

const slides = document.querySelectorAll(".slide");

const slideContainer = document.querySelector(".slides");

const dotsContainer = document.querySelector(".dots");


// dots
slides.forEach((_, i) => {

  let dot = document.createElement("span");

  dot.addEventListener("click", () => showSlide(i));

  dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll(".dots span");

function showSlide(i) {

  slideIndex = i;

  slideContainer.style.transform =
    `translateX(-${i * 100}%)`;

  dots.forEach(d =>
    d.classList.remove("active")
  );

  dots[i].classList.add("active");

}


// auto slide
setInterval(() => {

  slideIndex =
    (slideIndex + 1) % slides.length;

  showSlide(slideIndex);

}, 7000);


// swipe support
let startX = 0;

slideContainer.addEventListener("touchstart", e => {

  startX = e.touches[0].clientX;

});

slideContainer.addEventListener("touchend", e => {

  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {

    slideIndex =
      (slideIndex + 1) % slides.length;

  }

  else if (endX - startX > 50) {

    slideIndex =
      (slideIndex - 1 + slides.length) % slides.length;

  }

  showSlide(slideIndex);

});


// init
showSlide(0);
