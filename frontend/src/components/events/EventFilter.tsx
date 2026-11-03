interface EventFilterProps {
  searchText: string;
  category: string;
  categories: string[];
  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
}

function EventFilter({ searchText, category, categories, onSearchChange, onCategoryChange }: EventFilterProps) {
  return (
    <div className="filtre-kutusu" style={{ margin: "15px 0", display: "flex", gap: "10px" }}>
      <input
        type="text"
        placeholder="Etkinlik ara..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ padding: "8px", flex: 1 }}
      />
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)} style={{ padding: "8px" }}>
        <option value="">Tüm Kategoriler</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

export default EventFilter;