import React from "react";
import "./NewsCard.scss";

const NewsCard = ({ article, onClick }) => {
  return (
    <div className="news-card" onClick={onClick}>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} />
      )}
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
    </div>
  );
};

export default NewsCard;
