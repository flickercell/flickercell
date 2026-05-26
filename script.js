// ============================================================
// DAFTAR PRODUK IPHONE (UNTUK BERANDA / HOMEPAGE)
// ============================================================
const motors = [
  {
    name: "Iphone X Second All Operator",
    price: "Rp. 2.700.000",
    sold: "Terjual 70",
    img: "https://i.ibb.co.com/GwNCJg7/20260526-082236.png",
    category: "inter",
    new: false,
    link: "iphone-x/"
  },
  {
    name: "Iphone XR Second All Operator",
    price: "Rp. 3.200.000",
    sold: "Terjual 90",
    img: "https://i.ibb.co.com/VcTHZCt2/20260526-074458.png",
    category: "inter",
    new: false,
    link: "iphone-xr/"
  },
  {
    name: "Iphone XS Second All Operator",
    price: "Rp. 3.200.000",
    sold: "Terjual 46",
    img: "https://i.ibb.co.com/QF1H7PFv/190262.png",
    category: "inter",
    new: false,
    link: "iphone-xs/"
  },
  {
    name: "Iphone XS MAX Second All Operator",
    price: "Rp. 3.300.000",
    sold: "Terjual 28",
    img: "https://i.ibb.co.com/6RxCcJ93/190265.png",
    category: "inter",
    new: false,
    link: "iphone-xs-max/"
  },
  {
    name: "Iphone 11 Second All Operator",
    price: "Rp. 3.600.000",
    sold: "Terjual 67",
    img: "https://i.ibb.co.com/TDFBw2Qf/190213.png",
    category: "inter",
    new: false,
    link: "iphone11/"
  },
  {
    name: "Iphone 11 PRO Second All Operator",
    price: "Rp. 4.000.000",
    sold: "Terjual 63",
    img: "https://i.ibb.co.com/ynX0fF46/20260526-084145.png",
    category: "inter",
    new: false,
    link: "iphone-11pro/"
  },
  // SECOND IBOX
  {
    name: "Iphone 11 Second Ibox",
    price: "Rp. 5.000.000",
    sold: "Terjual 63",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtRfNrLkFB-z8marMeLaqHbSdef-yG9npLHOObEYgqtPgGPZmMU7_pIBk&s=10",
    category: "ibox",
    new: false,
    link: "iphone11-ibox/"
  },
  // BRAND NEW IN BOX
  {
    name: "Iphone 13 New Segel",
    price: "Rp. 4.000.000",
    sold: "Terjual 63",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3Au5QjxrydPINJm-ixjXrgzSKqWbcrEtK6s0vmyYQRSWwcSRz0e7dIpEr&s=10",
    category: "new",
    new: true,
    link: "inter/"
  },
  // BEA CUKAI
  {
    name: "Iphone XR Bea Cukai",
    price: "Rp. 3.900.000",
    sold: "Terjual 63",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0VJ7hwmP2oaZcVbakOogUGqiNvGdVRrafq9kqBAvC6g&s=10",
    category: "cukai",
    new: false,
    link: "inter/"
  }
];

// ============================================================
// FUNGSI RENDER PRODUK
// ============================================================
function renderMotors(category) {
  const list = document.getElementById("motorList");
  if (!list) return;
  list.innerHTML = "";

  motors
    .filter(m => {
      if (category === "all") return true;
      return m.category === category;
    })
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

// ============================================================
// LOGIKA INTI SELEPAS DOM READY
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  
  // Tampilkan tab aktif pertama bawaan kamu ("inter")
  renderMotors("inter");

  // Aktifkan fungsi klik pada tab HTML
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderMotors(tab.dataset.category);
    });
  });

  // Template Includer HTML
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
// BANNER AUTO-SLIDER (DENGAN FIX VARIABEL ERROR)
// ============================================================
const slideContainer = document.querySelector(".slides");
const dotsContainer = document.querySelector(".dots");
const mainBannerSlides = slideContainer ? slideContainer.querySelectorAll("img") : [];

if (slideContainer && dotsContainer && mainBannerSlides.length > 0) {
  let slideIndex = 0;
  dotsContainer.innerHTML = ""; 

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

  let autoSlideTimer = setInterval(() => {
    slideIndex = (slideIndex + 1) % mainBannerSlides.length;
    showMainSlide(slideIndex);
  }, 5000);

  // Perbaikan deklarasi let di sini agar tidak memicu Uncaught ReferenceError
  let startX = 0; 
  
  slideContainer.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    clearInterval(autoSlideTimer);
  }, { passive: true });

  slideContainer.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      slideIndex = (slideIndex + 1) % mainBannerSlides.length;
    } else if (endX - startX > 50) {
      slideIndex = (slideIndex - 1 + mainBannerSlides.length) % mainBannerSlides.length;
    }
    showMainSlide(slideIndex);
    
    autoSlideTimer = setInterval(() => {
      slideIndex = (slideIndex + 1) % mainBannerSlides.length;
      showMainSlide(slideIndex);
    }, 5000);
  });

  showMainSlide(0);
}

// ============================================================
// FUNGSI TITIK SLIDER PRODUK
// ============================================================
function currentSlide(index) {
  const wrapper = document.getElementById('sliderWrapper');
  const dots = document.querySelectorAll('.slider-dots .dot');
  
  if (wrapper) {
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }
}

// Swipe post produk
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
      } else if (postEndX - postStartX > 50) {
        if (postCurrentIndex > 0) postCurrentIndex--;
      }
      currentSlide(postCurrentIndex);
    });
  }
});
