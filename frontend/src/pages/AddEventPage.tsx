import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import EventForm from "../components/forms/EventForm";
import type { EventFormData } from "../types/campus-event";

export function AddEventPage() {
  const emptyForm: EventFormData = {
    title: "",
    category: "",
    date: "",
    location: "",
    quota: 50,
    description: "",
  };

  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <>
      <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Etkinlik Ekle</h2>
      <EventForm
        initialData={emptyForm}
        submitText="Kaydet"
        onSubmit={(data) => {
          addEvent(data);
          navigate("/admin");
        }}
      />
    </>
  );
}