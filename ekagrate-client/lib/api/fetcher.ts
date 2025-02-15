export async function getProducts(filters: { page?: number; pageSize?: number; category?: string; search?: string } = {}) {
  const params = new URLSearchParams();
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.pageSize) params.append("pageSize", filters.pageSize.toString());
  if (filters.category) params.append("category", filters.category);
  if (filters.search) params.append("search", filters.search);
  const res = await fetch(`/api/products?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return await res.json();
}

export async function getCategories() {
  const res = await fetch(`/api/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return await res.json();
} 