import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

export function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfa değiştirme fonksiyonu
  const go = (nextPage: PageName, id: string | null = null) => {
    setPage(nextPage);
    setSelectedId(id);
  };

  // Seçili etkinlik
  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;

  // ADIM 11: Sekme Başlığı Güncelleme (useEffect)
  useEffect(() => {
    if (page === "home") document.title = "Kampüs Etkinlikleri | Ana Sayfa";
    else if (page === "events") document.title = "Kampüs Etkinlikleri | Etkinlikler";
    else if (page === "detail" && selectedEvent)
      document.title = `Kampüs Etkinlikleri | ${selectedEvent.title}`;
    else if (page === "add") document.title = "Kampüs Etkinlikleri | Etkinlik Ekle";
    else if (page === "update") document.title = "Kampüs Etkinlikleri | Etkinlik Güncelle";
  }, [page, selectedEvent]);

  // Ana sayfa için yaklaşan 2 etkinlik
  const upcomingEvents = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Etkinlikler sayfası filtreleme
  const filteredEvents = filterByCategory(searchEvents(events, searchText), category);

  // Kart Rendering Fonksiyonu
  const renderCard = (event: CampusEvent) => (
    <article className="kart" key={event.id}>
      <div className="kart-rozet">{event.category}</div>
      <h2>{event.title}</h2>
      <p className="kart-bilgi">
        <strong>Tarih:</strong> {event.date}, {event.time}<br />
        <strong>Yer:</strong> {event.location}<br />
        <strong>Kontenjan:</strong> {event.capacity} kişi
      </p>
      <p>{event.description}</p>
      <button
        type="button"
        className="btn-detay"
        onClick={() => go("detail", event.id)}
      >
        Detayları gör
      </button>
    </article>
  );

  return (
    <div className="site-konteyner">
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
        <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      </header>

      <nav className="menu">
        <button
          type="button"
          className={page === "home" ? "aktif" : ""}
          onClick={() => go("home")}
        >
          Ana Sayfa
        </button>
        <button
          type="button"
          className={page === "events" ? "aktif" : ""}
          onClick={() => go("events")}
        >
          Etkinlikler
        </button>
        <button
          type="button"
          className={page === "add" ? "aktif" : ""}
          onClick={() => go("add")}
        >
          Ekle
        </button>
      </nav>

      <main className="icerik">
        {/* ADIM 9: ANA SAYFA */}
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="etkinlik-listesi">{upcomingEvents.map(renderCard)}</div>
            <div style={{ marginTop: "20px" }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => go("events")}
              >
                Tüm etkinlikleri gör
              </button>
            </div>
          </section>
        )}

        {/* ADIM 10: ETKİNLİKLER SAYFASI */}
        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>
            <p className="alt-baslik">Ekim ayında kampüste düzenlenen etkinlikler.</p>

            <div className="filtre-alani">
              <div className="filtre-grup">
                <label htmlFor="search">Etkinlik ara</label>
                <input
                  id="search"
                  type="search"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <div className="filtre-grup">
                <label htmlFor="category">Kategori</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>
            </div>

            <p className="sonuc-sayisi">
              {filteredEvents.length > 0
                ? `${filteredEvents.length} etkinlik listeleniyor.`
                : "Aradığınız kriterlere uygun etkinlik bulunamadı."}
            </p>

            <div className="etkinlik-listesi">{filteredEvents.map(renderCard)}</div>
          </section>
        )}

        {/* ADIM 12: DETAY SAYFASI */}
        {page === "detail" && (
          <section>
            {!selectedEvent ? (
              <div className="hata-kutusu">
                <p>Etkinlik bulunamadı.</p>
                <button type="button" onClick={() => go("events")}>
                  Listeye dön
                </button>
              </div>
            ) : (
              <article className="detay-sayfasi">
                <h2>{selectedEvent.title}</h2>
                <div className="detay-grid">
                  {selectedEvent.image && (
                    <figure className="detay-afis">
                      <img src={selectedEvent.image} alt={`${selectedEvent.title} afişi`} />
                    </figure>
                  )}
                  <div className="detay-kunye">
                    <h3>Etkinlik Künyesi</h3>
                    <p><strong>Tarih:</strong> {selectedEvent.date}, {selectedEvent.time}</p>
                    <p><strong>Yer:</strong> {selectedEvent.location}</p>
                    <p><strong>Kategori:</strong> {selectedEvent.category}</p>
                    <p><strong>Kontenjan:</strong> {selectedEvent.capacity} kişi</p>
                  </div>
                </div>
                <div className="detay-aciklama">
                  <h3>Açıklama</h3>
                  <p>{selectedEvent.description}</p>
                </div>
                <div className="detay-butonlar">
                  <button type="button" onClick={() => go("events")}>
                    Listeye dön
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => go("update", selectedEvent.id)}
                  >
                    Bu etkinliği güncelle
                  </button>
                </div>
              </article>
            )}
          </section>
        )}

        {/* ADIM 13: EKLE VE GÜNCELLE FORM SAYFALARI */}
        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p className="bilgi-notu">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

            <form className="form-kutusu" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grup">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  type="text"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri 2026"
                  defaultValue={page === "update" && selectedEvent ? selectedEvent.title : ""}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="form-category">Kategori</label>
                <select
                  id="form-category"
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.category : ""
                  }
                >
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>

              <div className="form-grup">
                <label htmlFor="date">Tarih</label>
                <input
                  id="date"
                  type="date"
                  defaultValue={page === "update" && selectedEvent ? selectedEvent.date : ""}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="time">Saat</label>
                <input
                  id="time"
                  type="time"
                  defaultValue={page === "update" && selectedEvent ? selectedEvent.time : ""}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  type="text"
                  placeholder="Örn. A Blok Konferans Salonu"
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.location : ""
                  }
                />
              </div>

              <div className="form-grup">
                <label htmlFor="capacity">Kontenjan</label>
                <input
                  id="capacity"
                  type="number"
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.capacity : ""
                  }
                />
              </div>

              <div className="form-grup">
                <label htmlFor="description">Açıklama</label>
                <textarea
                  id="description"
                  rows={5}
                  defaultValue={
                    page === "update" && selectedEvent ? selectedEvent.description : ""
                  }
                />
              </div>

              <button type="submit" className="btn-primary">
                {page === "add" ? "Ekle" : "Güncelle"}
              </button>
            </form>
          </section>
        )}
      </main>

      <footer className="site-altlik">
        <p>Alara Yücetürk - 2026</p>
      </footer>
    </div>
  );
}

export default App;