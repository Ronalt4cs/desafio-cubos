export function getTotalPages(itemsPerPage: number, length: number) {
  const totalPages = Math.ceil(length / itemsPerPage);
  return totalPages
} 
