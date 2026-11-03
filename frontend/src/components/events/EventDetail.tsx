import type { CampusEvent } from "../../types/campus-event";
import { Link } from "react-router-dom";

export function EventDetail({ event }: { event: CampusEvent }) {
  return (
    <div className="detail-container">
      <div className="poster-box">
        <div style={{
          border: "2px solid #e74c3c",
          padding: "30px 15px",
          borderRadius: "4px",
          backgroundColor: "#16222f",
          marginBottom: "10px"
        }}>
          <h2 style={{ fontSize: "22px", color: "#ffffff", marginBottom: "10px", fontWeight: "bold" }}>
            {event.title}
          </h2>
          <p style={{ fontSize: "15px", color: "#f39c12", fontWeight: "bold", marginBottom: "6px" }}>
            {event.date}
          </p>
          <p style={{ fontSize: "12px", color: "#ecf0f1", opacity: 0.9 }}>
            {event.location}
          </p>
        </div>
        <span style={{ fontSize: "11px", color: "#888", fontStyle: "italic" }}>
          {event.title} afişi
        </span>
      </div>

      <div className="info-box">
        <h3 style={{ borderBottom: "1px solid #dee2e6", paddingBottom: "8px", marginBottom: "12px" }}>Etkinlik Künyesi</h3>
        <p style={{ marginBottom: "6px" }}><strong>Tarih:</strong> {event.date}</p>
        <p style={{ marginBottom: "6px" }}><strong>Yer:</strong> {event.location}</p>
        <p style={{ marginBottom: "6px" }}><strong>Kategori:</strong> {event.category}</p>
        <p style={{ marginBottom: "12px" }}><strong>Kontenjan:</strong> {event.quota} kişi</p>
        
        <h4 style={{ marginBottom: "4px" }}>Açıklama</h4>
        <p style={{ color: "#6c757d", marginBottom: "16px" }}>{event.description}</p>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/events" className="btn-theme" style={{ textDecoration: "none" }}>← Listeye dön</Link>
          <Link to={`/admin/edit/${event.id}`} className="btn-theme" style={{ textDecoration: "none" }}>Bu etkinliği güncelle</Link>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;