const API_BASE = 'http://localhost:3001';

export interface SalesRecord {
  id: number;
  year: number;
  month: string;
  sales: number;
  revenue: number;
  region: string;
  product: string;
  profit: number;
  customers: number;
}

export interface Product {
  id: number;
  name: string;
  category: string;
}

export interface Region {
  id: number;
  name: string;
  manager: string;
}

export const realApi = {
  // Fetch sales data with filters
  async getSales(year?: number, region?: string, product?: string): Promise<SalesRecord[]> {
    const params = new URLSearchParams();
    if (year) params.append('year', year.toString());
    if (region && region !== 'All') params.append('region', region);
    if (product && product !== 'All') params.append('product', product);

    const response = await fetch(`${API_BASE}/sales?${params}`);
    if (!response.ok) throw new Error('Failed to fetch sales data');
    return response.json();
  },

  // Fetch products
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Fetch regions
  async getRegions(): Promise<Region[]> {
    const response = await fetch(`${API_BASE}/regions`);
    if (!response.ok) throw new Error('Failed to fetch regions');
    return response.json();
  },

  // Add new sales record
  async addSalesRecord(record: Omit<SalesRecord, 'id'>): Promise<SalesRecord> {
    const response = await fetch(`${API_BASE}/sales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (!response.ok) throw new Error('Failed to add sales record');
    return response.json();
  },

  // Update sales record
  async updateSalesRecord(id: number, updates: Partial<SalesRecord>): Promise<SalesRecord> {
    const response = await fetch(`${API_BASE}/sales/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update sales record');
    return response.json();
  },
};