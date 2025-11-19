import Modal from "react-modal";
import "./NewsDetailModal.scss";

Modal.setAppElement("#root");

const NewsDetailModal = ({ isOpen, onClose, article }) => {
  if (!article) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>{article.title}</h2>
        {article.urlToImage && (
          <img src={article.urlToImage} alt={article.title} />
        )}
        <p>
          <strong>Source:</strong> {article.source.name}
        </p>
        <p>
          <strong>Author:</strong> {article.author || "N/A"}
        </p>
        <p>
          <strong>Published:</strong>{" "}
          {new Date(article.publishedAt).toLocaleString()}
        </p>
        <p>{article.description}</p>
        <p>{article.content}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read full article
        </a>
      </div>
    </Modal>
  );
};

export default NewsDetailModal;
