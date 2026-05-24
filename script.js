// ==============================
// DAFTAR IPHONE
// ==============================
const motors = [
  {
    name: "Iphone 11 Second Ibox",
    price: "Rp6.300.000",
    img: "https://unboxing.id/wp-content/uploads/2022/06/Iphone-11-red.jpg",
    category: "matic",
    new: false,
    link: "iphone11/"
  },
  
];

function renderMotors(category) {
  const list = document.getElementById("motorList");
  if (!list) return; // biar gak error di halaman posting

  list.innerHTML = "";
  motors
    .filter(m => m.category === category)
    .forEach(motor => {
      const card = document.createElement("div");
      card.className = "motor-card";
      card.innerHTML = `
        ${motor.new ? '<div class="new-label">New!</div>' : ""}
        <img src="${motor.img}" alt="${motor.name}">
        <div class="info">
          <h3>${motor.name}</h3>
          <p>Harga mulai</p>
          <p class="price">${motor.price}</p>
          <a class="btn" href="${motor.link}">Selengkapnya →</a>
        </div>
      `;
      list.appendChild(card);
    });
}

renderMotors("matic");

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderMotors(tab.dataset.category);
  });
});

// ==========================
// Fungsi include header/footer
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Gagal memuat ${file}`);
        return res.text();
      })
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => console.error(err));
  });
});

// ==========================
// SLIDER MANUAL (tanpa otomatis)
// ==========================
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider-wrapper");
  const images = document.querySelectorAll(".slider-wrapper img");
  const dots = document.querySelectorAll(".slider-dots .dot");

  // Kalau gak ada slider di halaman, hentikan script
  if (!slider || images.length === 0) return;

  let index = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  // Geser manual pakai sentuhan (mobile)
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

    if (diff > 50 && index < images.length - 1) index++;
    else if (diff < -50 && index > 0) index--;

    updateSlider();
    isDragging = false;
  });

  // Geser manual pakai mouse (desktop)
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

    if (diff > 50 && index < images.length - 1) index++;
    else if (diff < -50 && index > 0) index--;

    updateSlider();
    isDragging = false;
  });

  slider.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
    }
  });

  // Inisialisasi tampilan awal
  updateSlider();
});



document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll(".spesifikasi-tab");
  const contents = document.querySelectorAll(".spesifikasi-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });
});

let index = 0;
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
  index = i;
  slideContainer.style.transform = `translateX(-${i * 100}%)`;

  dots.forEach(d => d.classList.remove("active"));
  dots[i].classList.add("active");
}

// auto slide
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 7000);

// swipe support (HP)
let startX = 0;

slideContainer.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

slideContainer.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    index = (index + 1) % slides.length;
  } else if (endX - startX > 50) {
    index = (index - 1 + slides.length) % slides.length;
  }

  showSlide(index);
});

// init
showSlide(0);

/* Fungsi untuk memunculkan pop-up foto setelah 20 detik (20000 milidetik)
setTimeout(function() {
    document.getElementById('popup-foto-promo').style.display = 'flex';
}, 20000); 

// Fungsi untuk menutup pop-up foto
function closeFotoPopup() {
    document.getElementById('popup-foto-promo').style.display = 'none';
}
*/
