import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  gamesPerPage: number;
  totalGames: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ gamesPerPage, totalGames, paginate, currentPage }) => {
  const pageNumbers = [];

  // Calculate the number of pages based on total games and games per page
  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <MuiPagination
      count={pageNumbers.length}
      page={currentPage}
      onChange={(event, value) => paginate(value)}  // Handle page change
      color="primary"
      shape="rounded"
    />
  );
};

export default Pagination;
