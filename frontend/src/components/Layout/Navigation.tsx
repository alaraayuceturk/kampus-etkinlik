import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const navItems: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Etkinlik Ekle" }
];

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="site-menu">
      {navItems.map((item) => (
        <a
          key={item.name}
          href="#"
          className={current === item.name ? "aktif" : ""}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.name);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export default Navigation;