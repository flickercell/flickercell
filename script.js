// ============================================================
// DAFTAR PRODUK IPHONE (UNTUK BERANDA / HOMEPAGE)
// ============================================================
const motors = [
  {
    name: "Iphone 11 Second Ibox 256GB",
    price: "Rp. 6.000.000",
    sold: "Terjual 2",
    img: "https://unboxing.id/wp-content/uploads/2022/06/Iphone-11-red.jpg",
    category: "matic",
    new: true,
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

// ============================================================
// RENDER GRID PRODUK (BERANDA / HOMEPAGE)
// ============================================================
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
// Jalankan render otomatis pertama kali untuk kategori matic saat beranda dibuka
renderMotors("matic");

// ============================================================
// NAVIGASI TAB KATEGORI (BERANDA / HOMEPAGE)
// ============================================================
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderMotors(tab.dataset.category);
  });
});

// ============================================================
// TEMPLATE INCLUDER (HEADER, FOOTER, WA)
// ============================================================
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

// ============================================================
// BANNER AUTO-SLIDER (KHUSUS BERANDA / HOMEPAGE)
// ============================================================
const slideContainer = document.querySelector(".slides");
const dotsContainer = document.querySelector(".dots");
const mainBannerSlides = slideContainer ? slideContainer.querySelectorAll("img") : [];

if (slideContainer && dotsContainer && mainBannerSlides.length > 0) {
  let slideIndex = 0;
  dotsContainer.innerHTML = ""; // Bersihkan sisa renderan duplikat

  // Bikin indikator dots otomatis sesuai jumlah foto banner promo
  mainBannerSlides.forEach((_, i) => {
    let dot = document.createElement("span");
    if (i === 0) dot.className = "active";
    dot.addEventListener("click", () => showMainSlide(i));
    dotsContainer.appendChild(dot);
  });

  const mainDots = dotsContainer.querySelectorAll("span");

  function showMainSlide(i) {
    slideIndex = i;
    slideContainer.style.transform = `translateX(-${i * 100}%)`;
    mainDots.forEach(d => d.classList.remove("active"));
    if (mainDots[i]) mainDots[i].classList.add("active");
  }

  // Set pergeseran otomatis per 5 detik
  let autoSlideTimer = setInterval(() => {
    slideIndex = (slideIndex + 1) % mainBannerSlides.length;
    showMainSlide(slideIndex);
  }, 5000);

  // Fitur swipe layar sentuh di HP untuk Banner Utama
  let startX = 0;
  slideContainer.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    clearInterval(autoSlideTimer); // Pause sementara waktu saat disentuh pembeli
  }, { passive: true });

  slideContainer.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      slideIndex = (slideIndex + 1) % mainBannerSlides.length;
    } else if (endX - startX > 50) {
      slideIndex = (slideIndex - 1 + mainBannerSlides.length) % mainBannerSlides.length;
    }
    showMainSlide(slideIndex);
    
    // Jalankan ulang timer interval pasca swipe selesai
    autoSlideTimer = setInterval(() => {
      slideIndex = (slideIndex + 1) % mainBannerSlides.length;
      showMainSlide(slideIndex);
    }, 5000);
  });

  showMainSlide(0);
}

// ============================================================
// FUNGSI KLIK TITIK SLIDER (KHUSUS HALAMAN POSTINGAN PRODUK)
// ============================================================
function currentSlide(index) {
  const wrapper = document.getElementById('sliderWrapper');
  const dots = document.querySelectorAll('.slider-dots .dot');
  
  if (wrapper) {
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    
    // Sinkronisasi status aktif lingkaran titik
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }
}

// Fitur Swipe Geser Gambar dengan Jari di HP khusus halaman produk iPhone
document.addEventListener("DOMContentLoaded", () => {
  const postWrapper = document.getElementById('sliderWrapper');
  if (postWrapper) {
    let postStartX = 0;
    let postCurrentIndex = 0;
    const totalPostSlides = postWrapper.querySelectorAll('img').length;

    postWrapper.addEventListener("touchstart", e => {
      postStartX = e.touches[0].clientX;
    }, { passive: true });

    postWrapper.addEventListener("touchend", e => {
      let postEndX = e.changedTouches[0].clientX;
      
      if (postStartX - postEndX > 50) {
        if (postCurrentIndex < totalPostSlides - 1) postCurrentIndex++;
      } else if (postEndX - postStartX > 50) { // <-- Sudah diganti jadi postStartX
             if (postCurrentIndex > 0) {
              postCurrentIndex--;
  }
      }
      
      
      currentSlide(postCurrentIndex);
    });
  }
});
