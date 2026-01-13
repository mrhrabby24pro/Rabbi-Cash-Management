
import React, { useState, useEffect } from 'react';
import { MD3Input, MD3Button, MD3Card } from '../components/MD3Components';
import { ArrowLeft, Check, Plus, Minus, Calculator } from 'lucide-react';
import { Transaction } from '../types';

interface Props {
  editingTransaction: Transaction | null;
  onComplete: (t: Transaction) => void;
  onCancel: () => void;
}

const AddTransactionPage: React.FC<Props> = ({ editingTransaction, onComplete, onCancel }) => {
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (editingTransaction) {
      setType(editingTransaction.type);
      setTitle(editingTransaction.title);
      setAmount(Math.abs(editingTransaction.amount).toString());
      setCategory(editingTransaction.category);
    }
  }, [editingTransaction]);

  const handleSave = () => {
    const numericAmount = parseFloat(amount);
    const finalAmount = type === 'EXPENSE' ? -Math.abs(numericAmount) : Math.abs(numericAmount);
    
    const transaction: Transaction = {
      id: editingTransaction ? editingTransaction.id : Math.random().toString(36).substr(2, 9),
      title,
      amount: finalAmount,
      type,
      category: category || 'অন্যান্য',
      date: editingTransaction ? editingTransaction.date : new Date().toISOString().split('T')[0],
    };

    onComplete(transaction);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3">
        <button 
          onClick={onCancel}
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="dark:text-white" />
        </button>
        <h2 className="text-2xl font-bold dark:text-white">
          {editingTransaction ? 'লেনদেন এডিট করুন' : 'নতুন এন্ট্রি যোগ করুন'}
        </h2>
      </div>

      <div className="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-3xl">
        <button 
          onClick={() => setType('EXPENSE')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[24px] font-bold transition-all ${type === 'EXPENSE' ? 'bg-white dark:bg-[#2B2930] shadow-sm text-red-600' : 'text-slate-500'}`}
        >
          <Minus size={18} /> খরচ
        </button>
        <button 
          onClick={() => setType('INCOME')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[24px] font-bold transition-all ${type === 'INCOME' ? 'bg-white dark:bg-[#2B2930] shadow-sm text-green-600' : 'text-slate-500'}`}
        >
          <Plus size={18} /> আয়
        </button>
      </div>

      <MD3Card className="space-y-6 p-6">
        <MD3Input 
          label="বিবরণ" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="যেমন: সুপার শপ বাজার" 
        />
        
        <div className="relative">
          <MD3Input 
            label="পরিমাণ (টাকা)" 
            type="number"
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="0.00" 
          />
          <Calculator className="absolute right-4 bottom-4 text-slate-400" size={20} />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 ml-4">ক্যাটাগরি</label>
          <div className="grid grid-cols-3 gap-2">
            {['বাজার', 'ভ্রমণ', 'খাবার', 'উপহার', 'শিক্ষা', 'অন্যান্য'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-2 px-1 text-xs font-bold rounded-xl border-2 transition-all ${category === cat ? 'border-[#6750A4] bg-[#EADDFF] text-[#21005D]' : 'border-slate-100 dark:border-slate-800 dark:text-slate-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <MD3Button variant="tonal" className="flex-1" onClick={onCancel}>
            বাতিল
          </MD3Button>
          <MD3Button 
            variant="filled" 
            className="flex-1"
            onClick={handleSave}
            disabled={!title || !amount}
          >
            <Check size={18} /> {editingTransaction ? 'আপডেট করুন' : 'সেভ করুন'}
          </MD3Button>
        </div>
      </MD3Card>

      <p className="text-center text-xs text-slate-400">আপনার তথ্যগুলো এন্ড-টু-এন্ড এনক্রিপ্ট অবস্থায় সংরক্ষিত হবে।</p>
    </div>
  );
};

export default AddTransactionPage;
