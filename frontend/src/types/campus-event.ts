export type EventCategory = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma" | string;

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  category: EventCategory;
  quota: number;
  description: string;
}

export type EventFormData = Omit<CampusEvent, "id">;