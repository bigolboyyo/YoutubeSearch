import React from "react";

const PageButtons = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxButtons = 5; // Always show 5 buttons
    const maxPageNumber = Math.ceil(totalPages / 10); // Divide by 10 to get number of pages based on 10 videos per page

    // Calculate starting and ending page numbers based on current page
    let startPage = Math.max(currentPage - Math.floor(maxButtons / 2), 1);
    let endPage = Math.min(startPage + maxButtons - 1, maxPageNumber);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(endPage - maxButtons + 1, 1);
    }

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
        <button
          key={pageNumber}
          className={currentPage === pageNumber ? "active" : ""}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      )}
    </div>
  );
};

export default PageButtons;
