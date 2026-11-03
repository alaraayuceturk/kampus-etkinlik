import { Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Navigation from "./components/Layout/Navigation";
import Footer from "./components/Layout/Footer";

import { HomePage } from "./pages/HomePage";
import { EventsPage } from "./pages/EventsPage";
import { EventDetailPage } from "./pages/EventDetailPage";
import { AdminPage } from "./pages/AdminPage";
import { AddEventPage } from "./pages/AddEventPage";
import { EditEventPage } from "./pages/EditEventPage";
import { LoginPage, RegisterPage, ForgotPasswordPage } from "./pages/AuthPages";
import { NotFoundPage } from "./pages/NotFoundPage";

export function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/new" element={<AddEventPage />} />
          <Route path="/admin/edit/:id" element={<EditEventPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;