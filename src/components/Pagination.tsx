import React from "react";
import { styled } from "@mui/system";
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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    paginate(value);
    if (sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 30, // Adjust offset for navbar height
        behavior: "smooth",
      });
    }
  };

  const CustomPagination = styled(MuiPagination)(({ theme }) => ({
    "&.MuiPagination-root": {
      display: "flex",
      justifyContent: "center", // Center the pagination
      marginTop: "25px", // Add space between game cards and pagination
    },
    "& .MuiPaginationItem-root": {
      color: theme.palette.mode === 'dark' ? '#fff' : "#0d0b33",
      "&.Mui-selected": {
        backgroundColor: theme.palette.mode === 'dark' ? '#333' : "#0d0b33",
        color: "#fff",
        "&:hover": {
          backgroundColor: theme.palette.mode === 'dark' ? '#444' :"#2a2873",
        },
      },
      "&:hover": {
        backgroundColor: theme.palette.mode === 'dark' ? '#555' : "rgba(13, 11, 51, 0.1)",

      },
    },
  }));

  return (
    <CustomPagination
      count={pageNumbers.length}
      page={currentPage}
      onChange={handlePageChange}
      shape="rounded"
    />
  );
};

export default Pagination;
