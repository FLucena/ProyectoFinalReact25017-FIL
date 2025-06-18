import React from 'react';
import { Pagination } from 'react-bootstrap';
import { X } from "lucide-react";

const GameFilters = ({
  searchTerm,
  setSearchTerm,
  selectedPlatform,
  setSelectedPlatform,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  clearFilters,
  hasActiveFilters,
  platforms,
  genres,
  filteredCount,
  totalCount,
  currentPage,
  setCurrentPage,
  totalPages,
  currentPageGames
}) => {
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    items.push(
      <Pagination.First
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
    );

    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    items.push(
      <Pagination.Last
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  return (
    <>
      <div className="filters-container bg-white rounded-3 shadow-sm p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control form-control-sm"
                id="searchInput"
                placeholder="¿Qué vicio te tienta hoy? 🎮"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="searchInput" className="small">¿Qué vicio te tienta hoy? 🎮</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <select
                className="form-select form-select-sm"
                id="platformSelect"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option value="">Todas las Plataformas</option>
                {platforms.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
              <label htmlFor="platformSelect" className="small">Plataforma</label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <select
                className="form-select form-select-sm"
                id="genreSelect"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">Todos los Géneros</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <label htmlFor="genreSelect" className="small">Género</label>
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-floating">
              <select
                className="form-select form-select-sm"
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="title">Ordenar por Título</option>
                <option value="release_date">Ordenar por Fecha</option>
                <option value="genre">Ordenar por Género</option>
              </select>
              <label htmlFor="sortSelect" className="small">Ordenar</label>
            </div>
          </div>
          <div className="col-auto d-flex align-items-center ms-auto">
            <button
              className="btn btn-outline-secondary btn-sm p-1 d-flex align-items-center justify-content-center"
              style={{ width: 28, height: 28 }}
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              title="Limpiar Filtros"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>

      {totalCount > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0 text-muted small">
            Mostrando <span className="fw-bold">{currentPageGames}</span> de <span className="fw-bold">{totalCount}</span> juegos
          </p>
          <Pagination size="sm" className="mb-0">
            {renderPaginationItems()}
          </Pagination>
        </div>
      )}
    </>
  );
};

export default GameFilters; 