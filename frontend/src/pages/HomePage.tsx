import { Link, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";

export function HomePage() {
  const { events } = useEvents();
  const navigate = useNavigate();

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <>
      <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Yaklaşan {upcoming.length} Etkinlik</h2>
      <div className="events-grid">
        {upcoming.map((ev) => (
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
      <div style={{ marginTop: "18px" }}>
        <button onClick={() => navigate("/events")} className="btn-theme">Tüm etkinlikleri gör</button>
      </div>
    </>
  );
}