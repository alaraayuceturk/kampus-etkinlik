import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};

    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }

    setErrors(found);

    if (Object.keys(found).length === 0) {
      alert("Gerçek giriş Sprint 10'da");
      navigate("/");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
      <div className="form-card" style={{ width: "100%" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Giriş Yap</h2>
        <form noValidate onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "13px" }}>E-posta</label>
            <input
              type="text"
              className={`input-field ${errors.email ? "error" : ""}`}
              aria-invalid={errors.email ? true : undefined}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="hata-metni error-text">{errors.email}</span>}
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "13px" }}>Şifre</label>
            <input
              type="password"
              className={`input-field ${errors.password ? "error" : ""}`}
              aria-invalid={errors.password ? true : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="hata-metni error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-theme" style={{ width: "100%", marginBottom: "15px" }}>Giriş yap</button>
          
          <div style={{ fontSize: "12.5px", color: "#6c757d", textAlign: "center" }}>
            <Link to="/forgot-password" style={{ color: "#6c757d", marginRight: "10px" }}>Şifremi unuttum</Link>
            Hesabın yok mu? <Link to="/register" style={{ color: "#6c757d" }}>Kayıt ol</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; password2?: string }>({});
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found: { name?: string; email?: string; password?: string; password2?: string } = {};

    if (name.trim().length < 3) {
      found.name = "En az 3 karakter olmalı.";
    }
    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }
    if (password2 !== password) {
      found.password2 = "Şifreler aynı değil.";
    }

    setErrors(found);

    if (Object.keys(found).length === 0) {
      alert("Kayıt başarılı!");
      navigate("/login");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
      <div className="form-card" style={{ width: "100%" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Kayıt Ol</h2>
        <form noValidate onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px" }}>Ad Soyad</label>
            <input
              type="text"
              className={`input-field ${errors.name ? "error" : ""}`}
              aria-invalid={errors.name ? true : undefined}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="hata-metni error-text">{errors.name}</span>}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px" }}>E-posta</label>
            <input
              type="email"
              className={`input-field ${errors.email ? "error" : ""}`}
              aria-invalid={errors.email ? true : undefined}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="hata-metni error-text">{errors.email}</span>}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px" }}>Şifre</label>
            <input
              type="password"
              className={`input-field ${errors.password ? "error" : ""}`}
              aria-invalid={errors.password ? true : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="hata-metni error-text">{errors.password}</span>}
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontSize: "13px" }}>Şifre (tekrar)</label>
            <input
              type="password"
              className={`input-field ${errors.password2 ? "error" : ""}`}
              aria-invalid={errors.password2 ? true : undefined}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            {errors.password2 && <span className="hata-metni error-text">{errors.password2}</span>}
          </div>

          <button type="submit" className="btn-theme" style={{ width: "100%", marginBottom: "15px" }}>Kayıt ol</button>
          
          <div style={{ fontSize: "12.5px", color: "#6c757d", textAlign: "center" }}>
            Zaten hesabın var mı? <Link to="/login" style={{ color: "#6c757d" }}>Giriş yap</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
      <div className="form-card" style={{ width: "100%" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>Şifremi Unuttum</h2>
        <p style={{ fontSize: "13px", color: "#6c757d", marginBottom: "15px" }}>
          Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.
        </p>
        {sent ? (
          <p className="mesaj mesaj-basari" style={{ color: "#2b3e50", fontWeight: "bold" }}>
            Bağlantı {email} adresine gönderildi (demo).
          </p>
        ) : (
          <form noValidate onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "13px" }}>E-posta</label>
              <input
                type="text"
                className={`input-field ${error ? "error" : ""}`}
                aria-invalid={error ? true : undefined}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <span className="hata-metni error-text">{error}</span>}
            </div>
            <button type="submit" className="btn-theme" style={{ width: "100%", marginBottom: "15px" }}>Bağlantı gönder</button>
            <div style={{ textAlign: "center" }}>
              <Link to="/login" style={{ fontSize: "12.5px", color: "#6c757d" }}>← Girişe dön</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};