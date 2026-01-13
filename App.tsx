
import React, { useState, useEffect } from 'react';
import { Home, LayoutDashboard, PlusCircle, BarChart3, Settings, Menu, Bell, Search, Moon, Sun, ChevronRight } from 'lucide-react';
import { Screen, Transaction } from './types';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AddTransactionPage from './pages/AddTransactionPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

const INITIAL_DATA: Transaction[] = [
  { id: '1', title: 'সুপার শপ বাজার', category: 'Shopping', amount: -1250, date: '২০২৪-০৫-২০', type: 'EXPENSE' },
  { id: '2', title: 'মাসিক বেতন', category: 'Salary', amount: 45000, date: '২০২৪-০৫-১৯', type: 'INCOME' },
  { id: '3', title: 'বিদ্যুৎ বিল', category: 'Utility', amount: -3400, date: '২০২৪-০৫-১৮', type: 'EXPENSE' },
  { id: '4', title: 'ফ্রিল্যান্সিং পেমেন্ট', category: 'Freelance', amount: 15000, date: '২০২৪-০৫-১৬', type: 'INCOME' },
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_DATA);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleAddOrUpdate = (transaction: Transaction) => {
    if (editingTransaction) {
      setTransactions(transactions.map(t => t.id === transaction.id ? transaction : t));
    } else {
      setTransactions([transaction, ...transactions]);
    }
    setEditingTransaction(null);
    setCurrentScreen(Screen.HOME);
  };

  const handleDelete = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে আপনি এই লেনদেনটি মুছে ফেলতে চান?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const handleResetAll = () => {
    if (confirm('সাবধান! এটি আপনার সমস্ত লেনদেনের তথ্য মুছে ফেলবে। আপনি কি নিশ্চিত?')) {
      setTransactions([]);
    }
  };

  const startEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setCurrentScreen(Screen.ADD);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HOME: 
        return <HomePage transactions={transactions} onDelete={handleDelete} onEdit={startEdit} />;
      case Screen.DASHBOARD: 
        return <DashboardPage transactions={transactions} />;
      case Screen.ADD: 
        return <AddTransactionPage 
          editingTransaction={editingTransaction} 
          onComplete={handleAddOrUpdate} 
          onCancel={() => { setEditingTransaction(null); setCurrentScreen(Screen.HOME); }} 
        />;
      case Screen.REPORTS: 
        return <ReportsPage transactions={transactions} />;
      case Screen.SETTINGS: 
        return <SettingsPage onResetAll={handleResetAll} />;
      default: 
        return <HomePage transactions={transactions} onDelete={handleDelete} onEdit={startEdit} />;
    }
  };

  const NavItem = ({ icon: Icon, label, screen }: { icon: any, label: string, screen: Screen }) => {
    const isActive = currentScreen === screen;
    return (
      <button 
        onClick={() => {
          setEditingTransaction(null);
          setCurrentScreen(screen);
        }}
        className="flex flex-col items-center justify-center w-full relative group py-2"
      >
        <div className={`
          flex items-center justify-center h-8 w-16 rounded-full mb-1 transition-all duration-300
          ${isActive ? 'bg-[#EADDFF] text-[#21005D]' : 'text-slate-600 dark:text-slate-400 group-hover:bg-slate-100 dark:group-hover:bg-slate-800'}
        `}>
          <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
        </div>
        <span className={`text-[11px] font-medium transition-colors ${isActive ? 'text-[#21005D] dark:text-[#EADDFF]' : 'text-slate-600 dark:text-slate-400'}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto bg-slate-50 dark:bg-[#121212] relative shadow-2xl">
      <header className="sticky top-0 z-40 bg-slate-50/80 dark:bg-[#121212]/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsDrawerOpen(true)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
            <Menu size={22} className="text-slate-700 dark:text-slate-300" />
          </button>
          <div>
            <h1 className="font-bold text-lg text-[#6750A4] leading-tight">Mir Rabbi Hossain</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Clean • Smart • Fast</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-700 dark:text-slate-300">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-700 dark:text-slate-300">
            <Bell size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-24 overflow-y-auto overflow-x-hidden scroll-smooth px-4 pt-4">
        {renderScreen()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 dark:bg-[#1C1B1F]/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1 flex items-center justify-between z-50 rounded-t-[28px] material-shadow">
        <NavItem icon={Home} label="Home" screen={Screen.HOME} />
        <NavItem icon={LayoutDashboard} label="Dashboard" screen={Screen.DASHBOARD} />
        <NavItem icon={PlusCircle} label="Add" screen={Screen.ADD} />
        <NavItem icon={BarChart3} label="Reports" screen={Screen.REPORTS} />
        <NavItem icon={Settings} label="Settings" screen={Screen.SETTINGS} />
      </nav>

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/40 z-[60] transition-opacity" onClick={() => setIsDrawerOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white dark:bg-[#1C1B1F] shadow-2xl flex flex-col p-4 animate-slide-right" onClick={e => e.stopPropagation()}>
            <div className="py-8 px-4 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div className="w-16 h-16 rounded-full bg-[#6750A4] mb-4 flex items-center justify-center text-white text-2xl font-bold">RH</div>
              <h2 className="text-xl font-bold dark:text-white">রাব্বি হোসেন</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">admin@mirrabbi.com</p>
            </div>
            <div className="space-y-1">
              {['Profile', 'Wallet', 'Security', 'Export Data', 'Help'].map((item) => (
                <button key={item} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors text-slate-700 dark:text-slate-300">
                  <span className="font-medium">{item}</span>
                  <ChevronRight size={18} />
                </button>
              ))}
            </div>
            <div className="mt-auto p-4 bg-slate-100 dark:bg-slate-800 rounded-3xl">
              <p className="text-xs text-center text-slate-500">Version 2.4.0 (Material You)</p>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slide-right { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .animate-slide-right { animation: slide-right 0.3s cubic-bezier(0, 0, 0.2, 1); }
      `}</style>
    </div>
  );
};

export default App;
