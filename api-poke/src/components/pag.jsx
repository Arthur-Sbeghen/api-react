import "./css/pag.css";

const Pagination = ({
  onFirstClick,
  onPreviousClick,
  onNextClick,
  onLastClick
}) => {
  return (
    <div className="pagination-container">
      <button className="pagination-button" onClick={onFirstClick}>Primeira</button>
      <button className="pagination-button" onClick={onPreviousClick}>
        Anterior
      </button>
      <button className="pagination-button" onClick={onNextClick}>
        Próximo
      </button>
      <button className="pagination-button" onClick={onLastClick}>Última</button>
    </div>
  );
};

export default Pagination;
