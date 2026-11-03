import type { EventFormData } from "../types/campus-event";

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = "En az 3 karakter olmalı.";
  }

  if (!data.category || data.category === "") {
    errors.category = "Bir kategori seçin.";
  }

  if (!data.date || !data.date.trim()) {
    errors.date = "Tarih, saat, yer boş olamaz.";
  }

  if (!data.location || !data.location.trim()) {
    errors.location = "Tarih, saat, yer boş olamaz.";
  }

  const capacity = Number(data.quota);
  if (!Number.isInteger(capacity) || capacity < 1 || capacity > 1000) {
    errors.quota = "1 ile 1000 arası tam sayı.";
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = "En az 10 karakter olmalı.";
  }

  return errors;
}