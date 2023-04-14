import { useState } from "react";

function usePagination(itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageItems = (items) => {
    if (!items) {
      return [];
    }
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems =
      localStorage.getItem(`page-${currentPage}`) || items.slice(start, end);
    return pageItems;
  };

  const totalPages = (items) => {
    if (!items) {
      return 0;
    }
    return Math.ceil(items.length / itemsPerPage);
  };

  return {
    currentPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
    getPageItems,
    totalPages,
  };
}

export default usePagination;
