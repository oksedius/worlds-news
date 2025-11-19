import "./CategorySelector.scss";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const CategorySelector = ({ onSelectCategory }) => {
  return (
    <div className="category-selector">
      {categories.map((cat) => (
        <button key={cat} onClick={() => onSelectCategory(cat)}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
