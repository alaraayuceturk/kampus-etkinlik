import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>Sayfa bulunamadı</h2>
      <p style={{ color: "#6c757d", fontSize: "13.5px", marginBottom: "15px" }}>Aradığınız sayfa ya da içerik yok.</p>
      <button onClick={() => navigate("/")} className="btn-theme">Ana sayfaya dön</button>
    </>
  );
}