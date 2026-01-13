
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MD3Card } from '../components/MD3Components';
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

const DashboardPage: React.FC<Props> = ({ transactions }) => {
  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + Math.abs(t.amount), 0);

  // Mock chart data based on transactions or static for visual consistency
  const chartData = [
    { name: 'শনি', income: 4000, expense: 2400 },
    { name: 'রবি', income: 3000, expense: 1398 },
    { name: 'সোম', income: 2000, expense: 9800 },
    { name: 'মঙ্গল', income: 2780, expense: 3908 },
    { name: 'বুধ', income: 1890, expense: 4800 },
    { name: 'বৃহ', income: 2390, expense: 3800 },
    { name: 'শুক্র', income: 3490, expense: 4300 },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">অ্যানালিটিক্স</h2>

      <div className="grid grid-cols-2 gap-4">
        <MD3Card className="border-l-4 border-green-500">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">মোট আয়</span>
            </div>
            <p className="text-xl font-black dark:text-white">৳ {totalIncome.toLocaleString('bn-BD')}</p>
            <p className="text-[10px] text-green-500 font-bold">+১২% গত মাস থেকে</p>
          </div>
        </MD3Card>

        <MD3Card className="border-l-4 border-red-500">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-red-600">
              <TrendingDown size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">মোট ব্যয়</span>
            </div>
            <p className="text-xl font-black dark:text-white">৳ {totalExpense.toLocaleString('bn-BD')}</p>
            <p className="text-[10px] text-red-500 font-bold">-৪% গত মাস থেকে</p>
          </div>
        </MD3Card>
      </div>

      <MD3Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div>
            <h3 className="font-bold dark:text-white">আয় ও ব্যয়ের সাপ্তাহিক গতি</h3>
            <p className="text-xs text-slate-500">গত ৭ দিনের পরিসংখ্যান</p>
          </div>
        </div>
        <div className="h-64 w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 'bold' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', background: 'white' }} 
                cursor={{ fill: '#F1F5F9', radius: 8 }}
              />
              <Bar dataKey="income" fill="#6750A4" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="expense" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </MD3Card>

      <div className="space-y-4">
        <h3 className="text-lg font-bold dark:text-white">আপনার লক্ষ্যসমূহ</h3>
        <MD3Card>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
              <Target size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-end mb-1">
                <h4 className="font-bold text-sm dark:text-white">নতুন গাড়ি সঞ্চয়</h4>
                <span className="text-xs font-bold text-blue-600">৬৫%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-[10px] mt-1 text-slate-500">লক্ষ্য: ৳ ৫,০০,০০০ | বর্তমান: ৳ ৩,২৫,০০০</p>
            </div>
          </div>
        </MD3Card>
      </div>
    </div>
  );
};

export default DashboardPage;
