import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";

export function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <>
      <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Etkinlik Yönetimi</h2>
      <Link to="/admin/new" className="btn-theme" style={{ display: "inline-block", textDecoration: "none", marginBottom: "12px" }}>
        + Yeni etkinlik
      </Link>

      <table className="admin-table tablo">
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th>Tarih</th>
            <th>Kategori</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {events.map((ev) => (
            <tr key={ev.id}>
              <td data-baslik="Etkinlik">{ev.title}</td>
              <td data-baslik="Tarih">{ev.date}</td>
              <td data-baslik="Kategori">{ev.category}</td>
              <td data-baslik="İşlemler" className="islemler">
                <Link to={`/admin/edit/${ev.id}`} className="btn-sm-edit" style={{ textDecoration: "none", display: "inline-block" }}>
                  Düzenle
                </Link>
                <button onClick={() => handleDelete(ev.id, ev.title)} className="btn-sm-delete buton-sil">
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}