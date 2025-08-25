import React from "react";
import { styled } from "@mui/system";
import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
  gamesPerPage?: number;
  totalGames?: number;
  paginate?: (pageNumber: number) => void;
  currentPage: number;
  sectionRef?: React.RefObject<HTMLDivElement>;
  // New interface support
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

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
    },
    "&:hover": {
      backgroundColor: theme.palette.mode === 'dark' ? '#444' : "#e0e0e0",
    },
  },
}));

const Pagination: React.FC<PaginationProps> = ({
  gamesPerPage,
  totalGames,
  paginate,
  currentPage,
  sectionRef,
  totalPages,
  onPageChange,
}) => {
  // Support both old and new interfaces
  const calculatedTotalPages = totalPages || (gamesPerPage && totalGames ? Math.ceil(totalGames / gamesPerPage) : 1);
  const handlePageChange = onPageChange || paginate || (() => {});

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    handlePageChange(value);
    if (sectionRef?.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop - 30, // Adjust offset for navbar height
        behavior: "smooth",
      });
    }
  };

  return (
    <CustomPagination
      count={calculatedTotalPages}
      page={currentPage}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      size="large"
    />
  );
};

export default Pagination;
