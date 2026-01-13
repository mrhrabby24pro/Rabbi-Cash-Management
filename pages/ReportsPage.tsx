
import React from 'react';
import { MD3Card } from '../components/MD3Components';
import { FileText, Download, Filter, Share2 } from 'lucide-react';
import { Transaction } from '../types';

interface Props {
  transactions: Transaction[];
}

const ReportsPage: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold dark:text-white">রিপোর্ট ও স্টেটমেন্ট</h2>
        <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
          <Filter size={20} className="text-slate-600 dark:text-slate-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[
          { title: 'ফেব্রুয়ারি ২০২৪ স্টেটমেন্ট', date: '২ দিন আগে জেনারেট করা হয়েছে', size: '১.২ MB' },
          { title: 'জানুয়ারি ২০২৪ স্টেটমেন্ট', date: '৩০ দিন আগে জেনারেট করা হয়েছে', size: '১.৫ MB' },
          { title: 'বার্ষিক কর রিপোর্ট ২০২৩', date: '১০ ডিসেম্বর ২০২৩', size: '৪.৮ MB' },
        ].map((report, idx) => (
          <MD3Card key={idx} className="flex items-center gap-4 group">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 text-[#6750A4] rounded-2xl">
              <FileText size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm dark:text-white">{report.title}</h4>
              <p className="text-[10px] text-slate-500">{report.date} • {report.size}</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <Download size={18} className="text-slate-600 dark:text-slate-400" />
              </button>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <Share2 size={18} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </MD3Card>
        ))}
      </div>

      <MD3Card className="bg-[#6750A4] p-6 text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <PlusIcon className="text-white" size={32} />
        </div>
        <h3 className="text-lg font-bold mb-2">কাস্টম রিপোর্ট তৈরি করুন</h3>
        <p className="text-sm opacity-80 mb-6">আপনার বর্তমান {transactions.length} টি লেনদেন দিয়ে এক্সপোর্ট করুন।</p>
        <button className="w-full bg-white text-[#6750A4] py-3 rounded-full font-bold hover:bg-slate-50 transition-colors">
          শুরু করুন
        </button>
      </MD3Card>
    </div>
  );
};

const PlusIcon = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} height={size || 24} 
    viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2.5" 
    strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14"/><path d="M12 5v14"/>
  </svg>
);

export default ReportsPage;
