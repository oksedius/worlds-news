import NewsCard from "../NewsCard/NewsCard";
import "./NewsList.scss";

const NewsList = ({ articles, onSelectArticle }) => {
  return (
    <div className="news-list">
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          article={article}
          onClick={() => onSelectArticle(article)}
        />
      ))}
    </div>
  );
};

export default NewsList;
