import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajBox = document.querySelector("#form-mesaj");

if (form) {
  const katSelect = form.querySelector("#kategori");
  if (katSelect) {
    const kategoriler = [...new Set(events.map(e => e.category))];
    kategoriler.forEach(kat => {
      const option = document.createElement("option");
      option.value = kat;
      option.textContent = kat;
      katSelect.appendChild(option);
    });
  }

  const id = new URLSearchParams(location.search).get("id");
  const isGuncelle = form.dataset.mode === "guncelle";
  const secilenEtkinlik = events.find(e => e.id === id);

  if (isGuncelle) {
    if (!secilenEtkinlik) {
      form.outerHTML = `
        <div style="border: 2px solid #d32f2f; background-color: #ffebee; color: #c62828; padding: 1.5rem; border-radius: 8px;">
          <p>Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
          <br>
          <a href="etkinlikler.html" class="btn-detay">Etkinliklere git</a>
        </div>
      `;
    } else {
      if (form.elements.ad) form.elements.ad.value = secilenEtkinlik.title;
      if (form.elements.kategori) form.elements.kategori.value = secilenEtkinlik.category;
      
      if (form.elements.tarih) {
        const [d, m, y] = secilenEtkinlik.date.split("-");
        form.elements.tarih.value = `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      }
      if (form.elements.saat) form.elements.saat.value = secilenEtkinlik.time;
      if (form.elements.yer) form.elements.yer.value = secilenEtkinlik.location;
      if (form.elements.kontenjan) form.elements.kontenjan.value = secilenEtkinlik.capacity;
      if (form.elements.aciklama) form.elements.aciklama.value = secilenEtkinlik.description;
    }
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      id: isGuncelle && secilenEtkinlik ? secilenEtkinlik.id : `event-${events.length + 1}`,
      title: (fd.get("ad") || "").trim(),
      category: fd.get("kategori") || "",
      date: fd.get("tarih") || "",
      time: fd.get("saat") || "",
      location: (fd.get("yer") || "").trim(),
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
      description: (fd.get("aciklama") || "").trim()
    };

    document.querySelectorAll(".hata-mesaji").forEach(el => el.textContent = "");
    form.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));

    const errors = {};

    if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Bir kategori seçin.";
    if (!data.date) errors.tarih = "Tarih seçin.";
    if (!data.time) errors.saat = "Saat seçin.";
    if (!data.location) errors.yer = "Yer bilgisini yazın.";
    if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalıdır.";
    }

    if (Object.keys(errors).length > 0) {
      for (let key in errors) {
        const inputEl = form.elements[key];
        const spanEl = document.querySelector(`#${key}-hata`);
        if (inputEl) inputEl.setAttribute("aria-invalid", "true");
        if (spanEl) spanEl.textContent = errors[key];
      }
      if (mesajBox) {
        mesajBox.innerHTML = `<p style="color: #d32f2f; font-weight: bold;">Formda hatalı alanlar var.</p>`;
      }
    } else {
      if (mesajBox) {
        mesajBox.innerHTML = `
          <div style="border: 2px solid #2e7d32; background-color: #e8f5e9; color: #1b5e20; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
            <p><strong>${isGuncelle ? 'Etkinlik Güncellendi' : 'Etkinlik Oluşturuldu'}</strong> (bu sprintte kaydedilmez):</p>
            <pre style="background: #ffffff; padding: 0.5rem; border-radius: 4px; overflow-x: auto; margin-top: 0.5rem;">${JSON.stringify(data, null, 2)}</pre>
          </div>
        `;
      }
    }
  });
}