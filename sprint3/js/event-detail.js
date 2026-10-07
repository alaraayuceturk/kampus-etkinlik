import { events } from "./data.js";

const container = document.querySelector("#detay-kapsayici");

if (container) {
  const id = new URLSearchParams(location.search).get("id");
  const event = events.find(e => e.id === id);

  if (!event) {
    document.title = "Etkinlik Bulunamadı";
    container.innerHTML = `
      <div style="border: 2px solid #d32f2f; background-color: #ffebee; color: #c62828; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
        <h2>Etkinlik bulunamadı</h2>
        <p>"${id || 'Geçersiz'}" numaralı bir etkinlik yok. Lütfen listeden geçerli bir etkinlik seçin.</p>
        <br>
        <a href="etkinlikler.html" class="btn-detay">← Listeye dön</a>
      </div>
    `;
  } else {
    document.title = event.title;
    
    const [day, month, year] = event.date.split("-");
    const dateObj = new Date(year, month - 1, day);
    const formattedDate = dateObj.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

    container.innerHTML = `
      <figure style="margin-bottom: 1rem;">
        <img src="${event.image}" alt="${event.title} afişi" style="max-width: 100%; border-radius: 8px;">
        <figcaption style="font-style: italic; font-size: 0.9rem; margin-top: 0.5rem;">${event.title} afişi</figcaption>
      </figure>

      <div class="kunye">
        <h2>${event.title}</h2>
        <dl>
          <dt>Tarih</dt>
          <dd>${formattedDate}, ${event.time}</dd>
          <dt>Yer</dt>
          <dd>${event.location}</dd>
          <dt>Kategori</dt>
          <dd>${event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>${event.capacity} kişi</dd>
        </dl>
        <h3>Açıklama</h3>
        <p style="margin: 1rem 0;">${event.description}</p>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="etkinlikler.html" class="btn-detay">← Listeye dön</a>
          <a href="etkinlik-guncelle.html?id=${event.id}" class="btn-detay">Bu etkinliği güncelle</a>
        </div>
      </div>
    `;
  }
}