import React from 'react';
import styled from "styled-components";
import { Pagination } from "react-bootstrap";

// Componentes de paginación con styled-components
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

export const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid #dee2e6;
  background-color: white;
  color: #6c757d;
  cursor: pointer;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  min-width: 40px;
  transition: all 0.2s ease-in-out;
  
  &:hover:not(:disabled) {
    background-color: #e9ecef;
    border-color: #adb5bd;
    color: #495057;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 576px) {
    padding: 0.375rem 0.5rem;
    font-size: 0.8rem;
    min-width: 35px;
  }
`;

export const ActivePageButton = styled(PageButton)`
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
  
  &:hover {
    background-color: #0a58ca;
    border-color: #0a58ca;
  }
`;

export const NavigationButton = styled(PageButton)`
  font-weight: bold;
  
  &:disabled {
    opacity: 0.3;
  }
`;

export const PageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
  margin: 0 1rem;
  
  @media (max-width: 576px) {
    font-size: 0.8rem;
    margin: 0 0.5rem;
  }
`;

export const StyledPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems, 
  itemsPerPage,
  activeTextColor = 'white' // Color de texto activo personalizable
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Mostrar todas las páginas si hay pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas con elipsis
      if (currentPage <= 3) {
        // Al inicio
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Al final
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // En el medio
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <PaginationContainer>
      <NavigationButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ‹
      </NavigationButton>
      
      {renderPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span style={{ color: '#6c757d', padding: '0.5rem' }}>...</span>
          ) : page === currentPage ? (
            <ActivePageButton
              onClick={() => handlePageChange(page)}
              style={{ color: activeTextColor }}
              aria-label={`Página ${page}, página actual`}
              aria-current="page"
            >
              {page}
            </ActivePageButton>
          ) : (
            <PageButton
              onClick={() => handlePageChange(page)}
              aria-label={`Ir a página ${page}`}
            >
              {page}
            </PageButton>
          )}
        </React.Fragment>
      ))}
      
      <NavigationButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >
        ›
      </NavigationButton>
      
      <PageInfo>
        <span>
          Mostrando {startItem}-{endItem} de {totalItems} resultados
        </span>
      </PageInfo>
    </PaginationContainer>
  );
};

export default StyledPagination; 