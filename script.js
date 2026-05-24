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

      // seluruh card jadi link
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
