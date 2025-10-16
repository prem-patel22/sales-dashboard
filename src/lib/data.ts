export interface SalesData {
  year: number;
  month: string;
  sales: number;
  revenue: number;
}

export const salesData: Record<number, SalesData[]> = {
  2022: [
    { year: 2022, month: 'Jan', sales: 12000, revenue: 48000 },
    { year: 2022, month: 'Feb', sales: 19000, revenue: 76000 },
    { year: 2022, month: 'Mar', sales: 13000, revenue: 52000 },
    { year: 2022, month: 'Apr', sales: 17000, revenue: 68000 },
    { year: 2022, month: 'May', sales: 15000, revenue: 60000 },
    { year: 2022, month: 'Jun', sales: 18000, revenue: 72000 },
    { year: 2022, month: 'Jul', sales: 21000, revenue: 84000 },
    { year: 2022, month: 'Aug', sales: 16000, revenue: 64000 },
    { year: 2022, month: 'Sep', sales: 14000, revenue: 56000 },
    { year: 2022, month: 'Oct', sales: 19000, revenue: 76000 },
    { year: 2022, month: 'Nov', sales: 22000, revenue: 88000 },
    { year: 2022, month: 'Dec', sales: 25000, revenue: 100000 },
  ],
  2023: [
    { year: 2023, month: 'Jan', sales: 14000, revenue: 56000 },
    { year: 2023, month: 'Feb', sales: 16000, revenue: 64000 },
    { year: 2023, month: 'Mar', sales: 18000, revenue: 72000 },
    { year: 2023, month: 'Apr', sales: 21000, revenue: 84000 },
    { year: 2023, month: 'May', sales: 19000, revenue: 76000 },
    { year: 2023, month: 'Jun', sales: 22000, revenue: 88000 },
    { year: 2023, month: 'Jul', sales: 24000, revenue: 96000 },
    { year: 2023, month: 'Aug', sales: 20000, revenue: 80000 },
    { year: 2023, month: 'Sep', sales: 23000, revenue: 92000 },
    { year: 2023, month: 'Oct', sales: 26000, revenue: 104000 },
    { year: 2023, month: 'Nov', sales: 28000, revenue: 112000 },
    { year: 2023, month: 'Dec', sales: 30000, revenue: 120000 },
  ],
  2024: [
    { year: 2024, month: 'Jan', sales: 17000, revenue: 68000 },
    { year: 2024, month: 'Feb', sales: 19000, revenue: 76000 },
    { year: 2024, month: 'Mar', sales: 21000, revenue: 84000 },
    { year: 2024, month: 'Apr', sales: 24000, revenue: 96000 },
    { year: 2024, month: 'May', sales: 22000, revenue: 88000 },
    { year: 2024, month: 'Jun', sales: 25000, revenue: 100000 },
    { year: 2024, month: 'Jul', sales: 27000, revenue: 108000 },
    { year: 2024, month: 'Aug', sales: 23000, revenue: 92000 },
    { year: 2024, month: 'Sep', sales: 26000, revenue: 104000 },
    { year: 2024, month: 'Oct', sales: 29000, revenue: 116000 },
    { year: 2024, month: 'Nov', sales: 31000, revenue: 124000 },
    { year: 2024, month: 'Dec', sales: 33000, revenue: 132000 },
  ],
};