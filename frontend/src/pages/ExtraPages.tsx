import React from "react";
import { useEvents } from "../context/EventContext";
import { Link } from "react-router-dom";

export const ProfilePage: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Kullanıcı Profilim</h2>
      <p><strong>Ad Soyad:</strong> Alara Yücetürk</p>
      <p><strong>E-posta:</strong> alara@kampus.edu.tr</p>
      <p><strong>Rol:</strong> Öğrenci / Danışman</p>
    </div>
  );
};

export const FavoritesPage: React.FC = () => {
  const { events, favorites } = useEvents();
  const favEvents = events.filter((ev) => favorites.includes(ev.id));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Favori Etkinliklerim</h2>
      {favEvents.length === 0 ? (
        <p>Henüz favorilere eklenmiş bir etkinlik yok.</p>
      ) : (
        <ul>
          {favEvents.map((ev) => (
            <li key={ev.id}>
              <Link to={`/etkinlik/${ev.id}`}><strong>{ev.title}</strong></Link> - {ev.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const CategoriesPage: React.FC = () => {
  const { events, setSelectedCategory } = useEvents();
  const categories = Array.from(new Set(events.map((e) => e.category)));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Etkinlik Kategorileri</h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat} style={{ marginBottom: "8px" }}>
            <Link to="/" onClick={() => setSelectedCategory(cat)}>
              {cat} Etkinlikleri
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>404</h1>
      <p>Aradığınız sayfa bulunamadı!</p>
      <Link to="/">Ana Sayfaya Dön</Link>
    </div>
  );
};