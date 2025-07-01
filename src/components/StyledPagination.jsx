import styled from "styled-components";
import { Pagination } from "react-bootstrap";

export const StyledPagination = styled(Pagination)`
  .page-item .page-link {
    color: #d32f2f; /* color primario */
    background: #fff;
    border: 1px solid #eee;
    transition: background 0.2s, color 0.2s;
  }

  .page-item.active .page-link,
  .page-item.active .page-link:focus,
  .page-item.active .page-link:active {
    background: #d32f2f !important;
    color: #fff !important;
    border-color: #d32f2f !important;
    z-index: 2;
  }

  .page-item .page-link:hover {
    background: #fbe9e7;
    color: #d32f2f;
  }

  .page-item.disabled .page-link {
    color: #bbb;
    background: #f8f9fa;
    border-color: #eee;
  }
`;

export default StyledPagination; 