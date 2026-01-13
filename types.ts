
export enum Screen {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  ADD = 'ADD',
  REPORTS = 'REPORTS',
  SETTINGS = 'SETTINGS'
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  category: string;
}

export interface SummaryData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}
