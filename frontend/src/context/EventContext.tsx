import React, { createContext, useState, useContext, type ReactNode } from "react";
import type { CampusEvent, EventFormData } from "../types/campus-event";
import { eventsData as initialData } from "../data/events";

export interface EventsContextValue {
  events: CampusEvent[];
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  addEvent: (event: EventFormData) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (id: string, updatedEvent: EventFormData) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CampusEvent[]>(initialData);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tümü");

  const addEvent = (data: EventFormData) => {
    const newEvent: CampusEvent = {
      id: `event-${Date.now()}`,
      title: data.title.trim(),
      category: data.category,
      date: data.date,
      time: data.time,
      location: data.location,
      quota: data.quota ? Number(data.quota) : undefined,
      description: data.description,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: string, data: EventFormData) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              id,
              title: data.title.trim(),
              category: data.category,
              date: data.date,
              time: data.time,
              location: data.location,
              quota: data.quota ? Number(data.quota) : undefined,
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
    <EventsContext.Provider
      value={{
        events,
        favorites,
        setFavorites,
        selectedCategory,
        setSelectedCategory,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
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