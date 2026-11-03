import React, { createContext, useState, useContext, type ReactNode } from "react";
import type { CampusEvent, EventFormData } from "../types/campus-event";
import { eventsData as initialData } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CampusEvent[]>(initialData);

  const addEvent = (data: EventFormData) => {
    const newEvent: CampusEvent = {
      id: `event-${Date.now()}`,
      title: data.title.trim(),
      category: data.category,
      date: data.date,
      location: data.location,
      quota: Number(data.quota),
      description: data.description,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: string, data: EventFormData) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              id,
              title: data.title.trim(),
              category: data.category,
              date: data.date,
              location: data.location,
              quota: Number(data.quota),
              description: data.description,
            }
          : e
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export function useEvents() {
  const value = useContext(EventsContext);
  if (!value) {
    throw new Error("useEvents bir EventProvider içinde kullanılmalıdır.");
  }
  return value;
}