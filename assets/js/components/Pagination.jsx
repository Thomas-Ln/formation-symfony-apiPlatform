import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, length, onPageChanged }) => {
  const pages = [];
  const pagesCount = Math.ceil(length / itemsPerPage);

  for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
  }

    return (
      <div className="d-flex justify-content-center py-3">
          <ul className="pagination pagination-lg">
              <li className={"page-item active" + (currentPage === 1 && " disabled")}>
                  <button className="page-link" onClick={() => onPageChanged(currentPage - 1)}>&laquo;</button>
              </li>
              {pages.map(page =>
              <li key={page} className={"page-item active" + (currentPage === page && " active")}>
                  <button className="page-link" onClick={() => onPageChanged(page)}>{page}</button>
              </li>
              )}
              <li className={"page-item active" + (currentPage === pagesCount && " disabled")}>
                  <button className="page-link" onClick={() => onPageChanged(currentPage + 1)}>&raquo;</button>
              </li>
          </ul>
      </div>
    )
  };

  Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }

export default Pagination;
