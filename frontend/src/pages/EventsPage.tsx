import { useState } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";

export function EventsPage() {
  const { events } = useEvents();

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  const categories = Array.from(new Set(events.map((e) => e.category)));

  const filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = !category || e.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <>
      <div className="filter-box">
        <div style={{ flex: 2 }}>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "12px" }}>Etkinlik ara</label>
          <input
            type="text"
            placeholder="Örn. atölye, kariyer"
            className="input-field"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "4px", fontSize: "12px" }}>Kategori</label>
          <select className="select-field" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Tümü</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <p style={{ color: "#6c757d", fontSize: "13px", margin: "10px 0" }}>{filtered.length} etkinlik listeleniyor.</p>

      <div className="events-grid">
        {filtered.map((ev) => (
          <div key={ev.id} className="event-card">
            <div>
              <h3>{ev.title}</h3>
              <span className="badge">{ev.category}</span>
              <p><strong>Tarih:</strong> {ev.date}</p>
              <p><strong>Yer:</strong> {ev.location}</p>
              <p><strong>Kontenjan:</strong> {ev.quota} kişi</p>
              <p style={{ marginTop: "6px", color: "#6c757d" }}>{ev.description}</p>
            </div>
            <Link to={`/events/${ev.id}`} className="btn-detail">Detayları gör</Link>
          </div>
        ))}
      </div>
    </>
  );
}