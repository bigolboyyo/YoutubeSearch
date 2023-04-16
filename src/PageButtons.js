import React from "react";

const PageButtons = ({
  currentPage,
  totalPages,
  onPageChange,
  morePageNumber,
}) => {
  // debugger;
  const getPageNumbers = () => {
    const maxButtons = 5;
    const maxPages = totalPages;

    const startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    const endPage = Math.min(startPage + maxButtons - 1, maxPages);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="page-buttons">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Prev</button>
      )}
      {getPageNumbers().map((pageNumber) => (
        <>
          <button
            key={pageNumber}
            className={currentPage === pageNumber ? "active" : ""}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default PageButtons;
