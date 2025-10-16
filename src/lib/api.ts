// Mock API service that simulates fetching real data
export interface ApiSalesData {
  year: number;
  month: string;
  sales: number;
  revenue: number;
  region: string;
  product: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API that fetches sales data
export const fetchSalesData = async (year: number): Promise<ApiSalesData[]> => {
  await delay(500); // Simulate network delay
  
  // Base data with some randomness to simulate real API
  const baseData = {
    2022: [
      { year: 2022, month: 'Jan', sales: 12000, revenue: 48000, region: 'North', product: 'Electronics' },
      { year: 2022, month: 'Feb', sales: 19000, revenue: 76000, region: 'South', product: 'Furniture' },
      { year: 2022, month: 'Mar', sales: 13000, revenue: 52000, region: 'East', product: 'Clothing' },
      { year: 2022, month: 'Apr', sales: 17000, revenue: 68000, region: 'West', product: 'Electronics' },
      { year: 2022, month: 'May', sales: 15000, revenue: 60000, region: 'North', product: 'Furniture' },
      { year: 2022, month: 'Jun', sales: 18000, revenue: 72000, region: 'South', product: 'Clothing' },
      { year: 2022, month: 'Jul', sales: 21000, revenue: 84000, region: 'East', product: 'Electronics' },
      { year: 2022, month: 'Aug', sales: 16000, revenue: 64000, region: 'West', product: 'Furniture' },
      { year: 2022, month: 'Sep', sales: 14000, revenue: 56000, region: 'North', product: 'Clothing' },
      { year: 2022, month: 'Oct', sales: 19000, revenue: 76000, region: 'South', product: 'Electronics' },
      { year: 2022, month: 'Nov', sales: 22000, revenue: 88000, region: 'East', product: 'Furniture' },
      { year: 2022, month: 'Dec', sales: 25000, revenue: 100000, region: 'West', product: 'Clothing' },
    ],
    2023: [
      { year: 2023, month: 'Jan', sales: 14000, revenue: 56000, region: 'North', product: 'Electronics' },
      { year: 2023, month: 'Feb', sales: 16000, revenue: 64000, region: 'South', product: 'Furniture' },
      { year: 2023, month: 'Mar', sales: 18000, revenue: 72000, region: 'East', product: 'Clothing' },
      { year: 2023, month: 'Apr', sales: 21000, revenue: 84000, region: 'West', product: 'Electronics' },
      { year: 2023, month: 'May', sales: 19000, revenue: 76000, region: 'North', product: 'Furniture' },
      { year: 2023, month: 'Jun', sales: 22000, revenue: 88000, region: 'South', product: 'Clothing' },
      { year: 2023, month: 'Jul', sales: 24000, revenue: 96000, region: 'East', product: 'Electronics' },
      { year: 2023, month: 'Aug', sales: 20000, revenue: 80000, region: 'West', product: 'Furniture' },
      { year: 2023, month: 'Sep', sales: 23000, revenue: 92000, region: 'North', product: 'Clothing' },
      { year: 2023, month: 'Oct', sales: 26000, revenue: 104000, region: 'South', product: 'Electronics' },
      { year: 2023, month: 'Nov', sales: 28000, revenue: 112000, region: 'East', product: 'Furniture' },
      { year: 2023, month: 'Dec', sales: 30000, revenue: 120000, region: 'West', product: 'Clothing' },
    ],
    2024: [
      { year: 2024, month: 'Jan', sales: 17000, revenue: 68000, region: 'North', product: 'Electronics' },
      { year: 2024, month: 'Feb', sales: 19000, revenue: 76000, region: 'South', product: 'Furniture' },
      { year: 2024, month: 'Mar', sales: 21000, revenue: 84000, region: 'East', product: 'Clothing' },
      { year: 2024, month: 'Apr', sales: 24000, revenue: 96000, region: 'West', product: 'Electronics' },
      { year: 2024, month: 'May', sales: 22000, revenue: 88000, region: 'North', product: 'Furniture' },
      { year: 2024, month: 'Jun', sales: 25000, revenue: 100000, region: 'South', product: 'Clothing' },
      { year: 2024, month: 'Jul', sales: 27000, revenue: 108000, region: 'East', product: 'Electronics' },
      { year: 2024, month: 'Aug', sales: 23000, revenue: 92000, region: 'West', product: 'Furniture' },
      { year: 2024, month: 'Sep', sales: 26000, revenue: 104000, region: 'North', product: 'Clothing' },
      { year: 2024, month: 'Oct', sales: 29000, revenue: 116000, region: 'South', product: 'Electronics' },
      { year: 2024, month: 'Nov', sales: 31000, revenue: 124000, region: 'East', product: 'Furniture' },
      { year: 2024, month: 'Dec', sales: 33000, revenue: 132000, region: 'West', product: 'Clothing' },
    ],
  };

  return baseData[year as keyof typeof baseData] || [];
};

// Fetch sales data by region
export const fetchSalesByRegion = async (year: number) => {
  await delay(300);
  const data = await fetchSalesData(year);
  
  const regionData = data.reduce((acc, item) => {
    if (!acc[item.region]) {
      acc[item.region] = { sales: 0, revenue: 0 };
    }
    acc[item.region].sales += item.sales;
    acc[item.region].revenue += item.revenue;
    return acc;
  }, {} as Record<string, { sales: number; revenue: number }>);

  return Object.entries(regionData).map(([region, values]) => ({
    region,
    ...values
  }));
};

// Fetch sales data by product
export const fetchSalesByProduct = async (year: number) => {
  await delay(300);
  const data = await fetchSalesData(year);
  
  const productData = data.reduce((acc, item) => {
    if (!acc[item.product]) {
      acc[item.product] = { sales: 0, revenue: 0 };
    }
    acc[item.product].sales += item.sales;
    acc[item.product].revenue += item.revenue;
    return acc;
  }, {} as Record<string, { sales: number; revenue: number }>);

  return Object.entries(productData).map(([product, values]) => ({
    product,
    ...values
  }));
};