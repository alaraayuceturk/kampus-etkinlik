import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

function formatDate(dateStr) {
  const [day, month, year] = dateStr.split("-");
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

function createCard(event) {
  return `
    <article class="etkinlik-kart">
      <h3>${event.title}</h3>
      <p><strong>${event.category}</strong></p>
      <p>Tarih: ${formatDate(event.date)}, ${event.time}</p>
      <p>Yer: ${event.location}</p>
      <p>Kontenjan: ${event.capacity} kişi</p>
      <p>${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}" class="btn-detay">Detayları gör →</a>
    </article>
  `;
}

function render(dizi) {
  if (!list) return;
  list.innerHTML = dizi.map(createCard).join("");
  if (sonucSatiri) {
    if (dizi.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${dizi.length} etkinlik listeleniyor.`;
    }
  }
}

if (list) {
  if (list.dataset.limit) {
    const yaklasan = [...events]
      .sort((a, b) => {
        const dateA = a.date.split("-").reverse().join("-");
        const dateB = b.date.split("-").reverse().join("-");
        return dateA.localeCompare(dateB);
      })
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    if (kategoriSelect) {
      const kategoriler = [...new Set(events.map(e => e.category))];
      kategoriler.forEach(kat => {
        const option = document.createElement("option");
        option.value = kat;
        option.textContent = kat;
        kategoriSelect.appendChild(option);
      });
    }

    function filtrele() {
      const aranan = aramaInput ? aramaInput.value.trim().toLocaleLowerCase("tr-TR") : "";
      const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

      const sonuc = events.filter(e => {
        const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
                            e.description.toLocaleLowerCase("tr-TR").includes(aranan) ||
                            e.location.toLocaleLowerCase("tr-TR").includes(aranan);
        const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
        return metinUyuyor && kategoriUyuyor;
      });

      render(sonuc);
    }

    if (aramaInput) aramaInput.addEventListener("input", filtrele);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);

    const filtreFormu = document.querySelector("#filtre-formu");
    if (filtreFormu) {
      filtreFormu.addEventListener("submit", e => e.preventDefault());
    }

    render(events);
  }
}