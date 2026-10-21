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

  // Hocanın İstediği: Tarayıcı Tab (Sekme) Başlığını Dinamik Değiştirme
  useEffect(() => {
    if (page === "detail" && selectedEvent) {
      document.title = selectedEvent.title;
    } else if (page === "events") {
      document.title = "Tüm Etkinlikler - Kampüs Etkinlikleri";
    } else if (page === "add") {
      document.title = "Yeni Etkinlik Ekle";
    } else if (page === "update") {
      document.title = "Etkinlik Güncelle";
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [page, selectedEvent]);

  const handleShowDetail = (id: string) => {
    setSelectedId(id);
    setPage("detail");
  };

  const handleAddEvent = (newEventData: Partial<CampusEvent>) => {
    const newEvent: CampusEvent = {
      id: `event-${Date.now()}`,
      title: newEventData.title || "Yeni Etkinlik",
      category: (newEventData.category as Category) || "Seminer",
      capacity: newEventData.capacity || 50,
      date: newEventData.date || new Date().toISOString().split("T")[0],
      time: newEventData.time || "12:00",
      location: newEventData.location || "Kampüs",
      description: newEventData.description || "",
    };

    setEvents((prev) => [newEvent, ...prev]);
    alert("Etkinlik başarıyla eklendi!");
    setPage("events");
  };

  const handleUpdateEvent = (updatedData: Partial<CampusEvent>) => {
    if (!selectedId) return;

    setEvents((prev) =>
      prev.map((item) =>
        item.id === selectedId ? { ...item, ...updatedData } : item
      )
    );

    alert("Etkinlik başarıyla güncellendi!");
    setPage("events");
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));
    alert("Etkinlik silindi.");
    setPage("events");
  };

  // Hocanın İstediği: Navigasyon / Header Başlığında Etkinlik Adının Görünmesi
  const getHeaderTitle = () => {
    if (page === "detail" && selectedEvent) {
      return selectedEvent.title;
    }
    if (page === "home") return "Kampüs Etkinlikleri";
    if (page === "events") return "Tüm Etkinlikler";
    if (page === "add") return "Yeni Etkinlik Ekle";
    return "Etkinlik Güncelle";
  };

  return (
    <div className="app-container">
      <Header 
        title={getHeaderTitle()} 
        text={page === "home" ? "Yaklaşan etkinlikleri kaçırma" : undefined} 
      />
      
      <Navigation current={page} onNavigate={(go) => setPage(go)} />

      <main>
        {page === "home" && (
          <EventList events={events.slice(0, 2)} onShowDetail={handleShowDetail} />
        )}

        {page === "events" && (
          <>
            <EventFilter 
              searchText={searchText} 
              category={category} 
              categories={categories} 
              onSearchChange={setSearchText} 
              onCategoryChange={(val) => setCategory(val as Category | "")} 
            />
            <EventList events={filteredEvents} onShowDetail={handleShowDetail} emptyText="Aramanıza uygun etkinlik bulunamadı." />
          </>
        )}

        {page === "detail" && selectedEvent && (
          <EventDetail 
            event={selectedEvent} 
            onBack={() => setPage("events")} 
            onEdit={(id) => { setSelectedId(id); setPage("update"); }} 
            onDelete={handleDeleteEvent}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm 
            initialData={page === "update" ? selectedEvent : undefined}
            onSubmit={(formData) => {
              if (page === "add") {
                handleAddEvent(formData);
              } else {
                handleUpdateEvent(formData);
              }
            }} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;