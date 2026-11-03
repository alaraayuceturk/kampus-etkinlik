import React, { useState, useEffect } from "react";
import type { CampusEvent, EventFormData } from "../../types/campus-event";
import { validateEvent, type EventFormErrors } from "../../utils/validate-event";

interface EventFormProps {
  initialData?: EventFormData | CampusEvent;
  submitText?: string;
  onSubmit: (data: EventFormData) => void;
}

export function EventForm({ initialData, submitText = "Kaydet", onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>({
    title: initialData?.title || "",
    category: initialData?.category || "",
    date: initialData?.date || "",
    location: initialData?.location || "",
    quota: initialData?.quota || 50,
    description: initialData?.description || "",
  });

  const [errors, setErrors] = useState<EventFormErrors>({});

  useEffect(() => {
    if (initialData) {
      setData({
        title: initialData.title || "",
        category: initialData.category || "",
        date: initialData.date || "",
        location: initialData.location || "",
        quota: initialData.quota || 50,
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "quota" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);

    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  };

  return (
    <div className="form-card">
      <form noValidate onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "3px", fontSize: "13px" }}>Etkinlik Adı</label>
          <input
            type="text"
            name="title"
            className={`input-field ${errors.title ? "error" : ""}`}
            aria-invalid={errors.title ? true : undefined}
            value={data.title}
            onChange={handleChange}
          />
          {errors.title && <span className="hata-metni error-text">{errors.title}</span>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "3px", fontSize: "13px" }}>Kategori</label>
          <select
            name="category"
            className={`select-field ${errors.category ? "error" : ""}`}
            aria-invalid={errors.category ? true : undefined}
            value={data.category}
            onChange={handleChange}
          >
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
          {errors.category && <span className="hata-metni error-text">{errors.category}</span>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "3px", fontSize: "13px" }}>Tarih</label>
          <input
            type="text"
            name="date"
            className={`input-field ${errors.date ? "error" : ""}`}
            aria-invalid={errors.date ? true : undefined}
            value={data.date}
            onChange={handleChange}
            placeholder="12 Ekim 2026, 14:00"
          />
          {errors.date && <span className="hata-metni error-text">{errors.date}</span>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "3px", fontSize: "13px" }}>Yer</label>
          <input
            type="text"
            name="location"
            className={`input-field ${errors.location ? "error" : ""}`}
            aria-invalid={errors.location ? true : undefined}
            value={data.location}
            onChange={handleChange}
          />
          {errors.location && <span className="hata-metni error-text">{errors.location}</span>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "3px", fontSize: "13px" }}>Kontenjan</label>
          <input
            type="number"
            name="quota"
            className={`input-field ${errors.quota ? "error" : ""}`}
            aria-invalid={errors.quota ? true : undefined}
            value={data.quota}
            onChange={handleChange}
          />
          {errors.quota && <span className="hata-metni error-text">{errors.quota}</span>}
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", marginBottom: "3px", fontSize: "13px" }}>Açıklama</label>
          <textarea
            name="description"
            className={`textarea-field ${errors.description ? "error" : ""}`}
            aria-invalid={errors.description ? true : undefined}
            rows={3}
            value={data.description}
            onChange={handleChange}
          />
          {errors.description && <span className="hata-metni error-text">{errors.description}</span>}
        </div>

        <button type="submit" className="btn-theme">{submitText}</button>
      </form>
    </div>
  );
}

export default EventForm;