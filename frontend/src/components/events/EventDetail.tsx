import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit, onDelete }: EventDetailProps) {
  return (
    <div className="detay-konteynir">
      <h2>{event.title}</h2>
      <p><strong>Kategori:</strong> {event.category}</p>
      <p><strong>Tarih:</strong> {formatDate(event.date)}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      <p>{event.description}</p>
      <div className="butonlar">
        <button onClick={onBack}>Listeye Dön</button>
        <button onClick={() => onEdit(event.id)}>Güncelle</button>
        <button 
          onClick={() => {
            if (window.confirm("Bu etkinliği silmek istediğinize emin misiniz?")) {
              onDelete(event.id);
            }
          }}
          style={{ backgroundColor: "#dc2626" }}
        >
          Sil
        </button>
      </div>
    </div>
  );
}

export default EventDetail;