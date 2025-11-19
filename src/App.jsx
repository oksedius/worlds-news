import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import CategorySelector from "./components/CategorySelector/CategorySelector";
import SearchBar from "./components/SearchBar/SearchBar";
import NewsList from "./components/NewsList/NewsList";
import NewsDetailModal from "./components/NewsDetailModal/NewsDetailModal";
import { getTopHeadlines, searchNews } from "./services/newsApi";
import "./App.scss";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      let data;
      if (searchQuery) {
        data = await searchNews(searchQuery);
      } else {
        data = await getTopHeadlines(category);
      }
      setArticles(data);
      setLoading(false);
    };
    fetchNews();
  }, [category, searchQuery]);

  const handleSelectCategory = (cat) => {
    setSearchQuery("");
    setCategory(cat);
  };

  const handleSearch = (query) => {
    setCategory("");
    setSearchQuery(query);
  };

  const openModal = (article) => setSelectedArticle(article);
  const closeModal = () => setSelectedArticle(null);

  return (
    <div className="app">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <CategorySelector onSelectCategory={handleSelectCategory} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <NewsList articles={articles} onSelectArticle={openModal} />
      )}
      <NewsDetailModal
        isOpen={!!selectedArticle}
        onClose={closeModal}
        article={selectedArticle}
      />
    </div>
  );
};

export default App;
