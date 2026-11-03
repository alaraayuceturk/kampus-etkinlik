import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import EventForm from "../components/forms/EventForm";
import { NotFoundPage } from "./NotFoundPage";

export function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = events.find((e) => e.id === (id ?? ""));

  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Etkinlik Güncelle</h2>
      <EventForm
        initialData={event}
        submitText="Güncelle"
        onSubmit={(data) => {
          if (id) {
            updateEvent(id, data);
            navigate("/admin");
          }
        }}
      />
    </>
  );
}