
import React from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowRight, Package, CreditCard, Send, Calendar, Pencil, Trash2 } from 'lucide-react';
import { MD3Card } from '../components/MD3Components';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (t: Transaction) => void;
}

const HomePage: React.FC<Props> = ({ transactions, onDelete, onEdit }) => {
  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const balance = totalIncome - totalExpense;

  const getIcon = (category: string) => {
    switch(category) {
      case 'Shopping': return '🛒';
      case 'Salary': return '💰';
      case 'Utility': return '⚡';
      case 'Freelance': return '💻';
      default: return '📦';
    }
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          আসসালামু আলাইকুম, <span className="text-[#6750A4]">রাব্বি!</span> 👋
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">আপনার আজকের হিসাবের সারসংক্ষেপ</p>
      </section>

      <MD3Card className="bg-gradient-to-br from-[#6750A4] to-[#4F378B] text-white border-none p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-purple-100 text-sm font-medium mb-1 uppercase tracking-wider">বর্তমান ব্যালেন্স</p>
            <h3 className="text-3xl font-bold tracking-tight">৳ {balance.toLocaleString('bn-BD')}</h3>
          </div>
          <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-md">
            <Wallet className="text-white" size={24} />
          </div>
        </div>
        <div className="flex gap-4 pt-4 border-t border-white/10">
          <div className="flex-1">
            <p className="text-purple-200 text-xs mb-1">এই মাসের আয়</p>
            <p className="font-bold flex items-center gap-1">
              <TrendingUp size={14} className="text-green-300" />
              ৳ {totalIncome.toLocaleString('bn-BD')}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-purple-200 text-xs mb-1">এই মাসের ব্যয়</p>
            <p className="font-bold flex items-center gap-1">
              <TrendingDown size={14} className="text-orange-300" />
              ৳ {totalExpense.toLocaleString('bn-BD')}
            </p>
          </div>
        </div>
      </MD3Card>

      <section className="grid grid-cols-4 gap-3">
        {[
          { icon: Send, label: 'পাঠান', color: 'bg-blue-100 text-blue-600' },
          { icon: CreditCard, label: 'কার্ড', color: 'bg-green-100 text-green-600' },
          { icon: Package, label: 'বিল', color: 'bg-orange-100 text-orange-600' },
          { icon: Calendar, label: 'ইভেন্ট', color: 'bg-purple-100 text-purple-600' },
        ].map((action, idx) => (
          <button key={idx} className="flex flex-col items-center gap-2 group">
            <div className={`${action.color} p-4 rounded-3xl group-active:scale-90 transition-transform`}>
              <action.icon size={24} />
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{action.label}</span>
          </button>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">সাম্প্রতিক লেনদেন</h3>
          <button className="text-sm font-semibold text-[#6750A4] flex items-center gap-1">
            সব দেখুন <ArrowRight size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {transactions.length === 0 ? (
            <div className="text-center py-10 text-slate-400 font-medium">
              কোন লেনদেন পাওয়া যায়নি। নিচের "+" বাটনে ক্লিক করে যোগ করুন।
            </div>
          ) : transactions.map((item) => (
            <div key={item.id} className="group relative flex items-center gap-4 p-4 bg-white dark:bg-[#1C1B1F] rounded-[24px] border border-slate-100 dark:border-slate-800 hover:border-[#EADDFF] transition-all cursor-pointer">
              <div className="text-2xl bg-slate-50 dark:bg-[#2B2930] w-12 h-12 flex items-center justify-center rounded-2xl">
                {getIcon(item.category)}
              </div>
              <div className="flex-1" onClick={() => onEdit(item)}>
                <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.date}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className={`text-right ${item.type === 'INCOME' ? 'text-green-600' : 'text-slate-800 dark:text-white'}`}>
                  <p className="font-bold text-sm">{item.type === 'INCOME' ? '+' : ''}{item.amount.toLocaleString('bn-BD')} ৳</p>
                  <p className="text-[10px] opacity-60 font-medium uppercase">{item.category}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(item)} className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-blue-600">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => onDelete(item.id)} className="p-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
