
import React from 'react';
import { User, Shield, Bell, HelpCircle, LogOut, ChevronRight, Smartphone, Globe, RefreshCcw, Database } from 'lucide-react';
import { MD3Card } from '../components/MD3Components';

interface Props {
  onResetAll: () => void;
}

const SettingsPage: React.FC<Props> = ({ onResetAll }) => {
  const SettingItem = ({ icon: Icon, label, sublabel, onClick, variant = 'default' }: { icon: any, label: string, sublabel?: string, onClick?: () => void, variant?: 'default' | 'danger' }) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all group ${variant === 'danger' ? 'text-red-600' : ''}`}
    >
      <div className={`p-3 rounded-xl transition-colors ${
        variant === 'danger' 
        ? 'bg-red-50 dark:bg-red-900/20 text-red-600' 
        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-[#EADDFF] group-hover:text-[#6750A4]'
      }`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 text-left">
        <h4 className="font-bold text-sm dark:text-white">{label}</h4>
        {sublabel && <p className="text-[10px] text-slate-500">{sublabel}</p>}
      </div>
      <ChevronRight size={18} className="text-slate-400" />
    </button>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">সেটিংস</h2>

      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">অ্যাকাউন্ট সেটিংস</h3>
        <MD3Card className="p-1 space-y-0">
          <SettingItem icon={User} label="প্রোফাইল তথ্য" sublabel="নাম, ইমেইল ও ছবি পরিবর্তন করুন" />
          <SettingItem icon={Shield} label="নিরাপত্তা ও পাসওয়ার্ড" sublabel="টু-স্টেপ ভেরিফিকেশন চালু করুন" />
        </MD3Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">ডেটা ম্যানেজমেন্ট</h3>
        <MD3Card className="p-1 space-y-0">
          <SettingItem icon={Database} label="ব্যাকআপ ডাটা" sublabel="আপনার ক্লাউডে সব তথ্য ব্যাকআপ নিন" />
          <SettingItem 
            icon={RefreshCcw} 
            label="সব তথ্য রিসেট করুন" 
            sublabel="স্থায়ীভাবে সমস্ত লেনদেন মুছে ফেলুন" 
            variant="danger"
            onClick={onResetAll}
          />
        </MD3Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">অ্যাপ প্রেফারেন্স</h3>
        <MD3Card className="p-1 space-y-0">
          <SettingItem icon={Bell} label="নোটিফিকেশন" sublabel="এলার্ট ও রিমাইন্ডার সেটিংস" />
          <SettingItem icon={Smartphone} label="ডিসপ্লে থিম" sublabel="লাইট, ডার্ক ও সিস্টেম ডিফল্ট" />
          <SettingItem icon={Globe} label="ভাষা" sublabel="বাংলা অথবা ইংরেজি নির্বাচন করুন" />
        </MD3Card>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-4">সাপোর্ট</h3>
        <MD3Card className="p-1 space-y-0">
          <SettingItem icon={HelpCircle} label="সাহায্য কেন্দ্র" />
          <SettingItem icon={LogOut} label="লগ আউট" variant="danger" />
        </MD3Card>
      </div>
      
      <p className="text-center text-[10px] text-slate-400 font-medium">MIR RABBI HOSSAIN • BUILD 4022 • MADE WITH ❤️</p>
    </div>
  );
};

export default SettingsPage;
