import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  gamesPerPage: number;
  totalGames: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  sectionRef: React.RefObject<HTMLDivElement>;
}

const Pagination: React.FC<PaginationProps> = ({
  gamesPerPage,
  totalGames,
  paginate,
  currentPage,
  sectionRef,
}) => {
  const pageNumbers = [];

  // Calculate the number of pages based on total games and games per page
  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    paginate(value);
    if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 30, // Adjust offset for navbar height
        behavior: 'smooth',
      });
    }
  };

  return (
    <MuiPagination
      count={pageNumbers.length}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      shape="rounded"
    />
  );
};

export default Pagination;
