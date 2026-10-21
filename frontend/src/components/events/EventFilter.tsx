interface EventFilterProps {
  searchText: string;
  category: string;
  categories: readonly string[];
  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
}

function EventFilter({ searchText, category, categories, onSearchChange, onCategoryChange }: EventFilterProps) {
  return (
    <div className="filtre-kutusu">
      <input
        type="text"
        placeholder="Etkinlik ara..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">Tüm Kategoriler</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}

export default EventFilter;