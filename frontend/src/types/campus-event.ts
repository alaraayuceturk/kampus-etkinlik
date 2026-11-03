export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma" | string;

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  category: string;
  capacity?: number;
  quota?: number; // <-- Buraya quota eklendi
  location?: string;
}
export type EventFormData = Omit<CampusEvent, "id">;