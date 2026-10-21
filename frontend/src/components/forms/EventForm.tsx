import { useState } from "react";
import type { CampusEvent, Category } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: (data: Partial<CampusEvent>) => void;
  initialData?: CampusEvent;
}

function EventForm({ onSubmit, initialData }: EventFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState<Category>((initialData?.category as Category) || "Seminer");
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(initialData?.time || "14:00");
  const [location, setLocation] = useState(initialData?.location || "");
  const [capacity, setCapacity] = useState(initialData?.capacity || 50);
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      category,
      date,
      time,
      location,
      capacity,
      description,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{initialData ? "Etkinlik Güncelle" : "Yeni Etkinlik Ekle"}</h2>
      
      <div className="form-alani">
        <label>Etkinlik Başlığı</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="form-alani">
        <label>Kategori</label>
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>
      </div>

      <div className="form-alani">
        <label>Tarih</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>

      <div className="form-alani">
        <label>Saat</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>

      <div className="form-alani">
        <label>Mekan / Yer</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </div>

      <div className="form-alani">
        <label>Kontenjan</label>
        <input type="number" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} />
      </div>

      <div className="form-alani">
        <label>Açıklama</label>
        <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <button type="submit">{initialData ? "Güncelle" : "Kaydet"}</button>
    </form>
  );
}

export default EventForm;