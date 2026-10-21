import { useState, useEffect } from "react";
import type { PageName } from "./types/page";
import type { CampusEvent, Category } from "./types/campus-event";
import { eventsData as initialEvents, categories } from "./data/events";
import { filterEvents } from "./utils/filter-events";

import Header from "./components/Layout/Header";
import Navigation from "./components/Layout/Navigation";
import Footer from "./components/Layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

export function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  const filteredEvents = filterEvents(events, searchText, category as Category | "");
  const selectedEvent = events.find((e) => e.id === selectedId);

  useEffect(() => {
    document.title = page === "detail" && selectedEvent ? selectedEvent.title : "Kampüs Etkinlikleri";
  }, [page, selectedEvent]);

  const handleSave = (data: Partial<CampusEvent>) => {
    if (page === "add") {
      const newEvent = { ...data, id: `event-${Date.now()}` } as CampusEvent;
      setEvents((prev) => [newEvent, ...prev]);
    } else {
      setEvents((prev) => prev.map((e) => (e.id === selectedId ? ({ ...e, ...data } as CampusEvent) : e)));
    }
    setPage("events");
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setPage("events");
  };

  return (
    <div className="app-container">
      <Header title={page === "detail" && selectedEvent ? selectedEvent.title : "Kampüs Etkinlikleri"} />
      <Navigation current={page} onNavigate={setPage} />
      <main>
        {page === "home" && <EventList events={events.slice(0, 2)} onShowDetail={(id) => { setSelectedId(id); setPage("detail"); }} />}
        {page === "events" && (
          <>
            <EventFilter searchText={searchText} category={category} categories={categories} onSearchChange={setSearchText} onCategoryChange={(v) => setCategory(v as Category | "")} />
            <EventList events={filteredEvents} onShowDetail={(id) => { setSelectedId(id); setPage("detail"); }} />
          </>
        )}
        {page === "detail" && selectedEvent && (
          <EventDetail event={selectedEvent} onBack={() => setPage("events")} onEdit={(id) => { setSelectedId(id); setPage("update"); }} onDelete={handleDelete} />
        )}
        {(page === "add" || page === "update") && (
          <EventForm initialData={page === "update" ? selectedEvent : undefined} onSubmit={handleSave} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;