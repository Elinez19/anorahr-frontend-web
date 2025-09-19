interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
}

interface UsePaginationReturn {
  pages: number[];
  showLeftEllipsis: boolean;
  showRightEllipsis: boolean;
}

export function usePagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
}: UsePaginationProps): UsePaginationReturn {
  const pages: number[] = [];
  let showLeftEllipsis = false;
  let showRightEllipsis = false;

  if (totalPages <= paginationItemsToDisplay) {
    // If total pages is less than or equal to items to display, show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Calculate the range of pages to show
    const halfDisplay = Math.floor(paginationItemsToDisplay / 2);
    let startPage = Math.max(1, currentPage - halfDisplay);
    let endPage = Math.min(totalPages, currentPage + halfDisplay);

    // Adjust if we're near the beginning or end
    if (currentPage <= halfDisplay) {
      endPage = Math.min(totalPages, paginationItemsToDisplay);
    } else if (currentPage > totalPages - halfDisplay) {
      startPage = Math.max(1, totalPages - paginationItemsToDisplay + 1);
    }

    // Add pages to the array
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Determine if we need ellipsis
    showLeftEllipsis = startPage > 1;
    showRightEllipsis = endPage < totalPages;
  }

  return {
    pages,
    showLeftEllipsis,
    showRightEllipsis,
  };
}
