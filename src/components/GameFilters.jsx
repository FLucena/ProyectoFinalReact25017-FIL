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
  totalGames,
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
    const maxVisiblePages = totalPages > 10 ? 3 : 5; // Menos páginas visibles si hay muchas
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
        title="Primera página"
      />
    );

    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Página anterior"
      />
    );

    // Mostrar "..." si hay páginas antes del rango visible
    if (startPage > 1) {
      items.push(
        <Pagination.Ellipsis key="start-ellipsis" disabled />
      );
    }

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

    // Mostrar "..." si hay páginas después del rango visible
    if (endPage < totalPages) {
      items.push(
        <Pagination.Ellipsis key="end-ellipsis" disabled />
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Página siguiente"
      />
    );

    items.push(
      <Pagination.Last
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        title="Última página"
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

      {/* Paginación */}
      {totalGames > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded border">
          <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
            <p className="mb-0 text-muted small">
              Mostrando <span className="fw-bold text-primary">{currentPageGames || 0}</span> de <span className="fw-bold text-primary">{totalGames || 0}</span> juegos
            </p>
            {totalPages > 1 && (
              <p className="mb-0 text-muted small">
                Página <span className="fw-bold text-primary">{currentPage || 1}</span> de <span className="fw-bold text-primary">{totalPages || 1}</span>
                {totalPages > 10 && (
                  <span className="ms-2 text-warning">
                    ⚠️ Muchas páginas ({totalPages})
                  </span>
                )}
              </p>
            )}
          </div>
          {totalPages > 1 && (
            <div className="d-flex flex-column align-items-end">
              <Pagination size="sm" className="mb-0">
                {renderPaginationItems()}
              </Pagination>
              {totalPages > 10 && (
                <small className="text-muted mt-1">
                  Usa los botones de navegación para moverte rápido
                </small>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GameFilters; 