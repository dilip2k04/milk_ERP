// hooks/usePagination.js
import { useState } from "react";

/**
 * Hook: usePagination
 * Provides: page, limit, total, setPage, setLimit
 */
export default function usePagination(initialLimit = 10) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);

  return {
    page,
    limit,
    total,
    setPage,
    setLimit,
    setTotal,
  };
}
