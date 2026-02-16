
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Book, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { getRamadanTip } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [tip, setTip] = useState<string>("جاري تحميل نصيحة اليوم...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRamadanTip().then(res => {
      setTip(res);
      setLoading(false);
    });
  }, []);

  const prayerData = [
    { name: 'مكتمل', value: 5 },
    { name: 'متبقي', value: 2 },
  ];

  const COLORS = ['#10b981', '#f1f5f9'];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Welcome Banner */}
      <div className="relative bg-emerald-900 rounded-[2rem] p-8 text-white shadow-2xl overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-amber-400 animate-pulse" size={20} />
            <span className="text-emerald-200 text-sm font-medium tracking-widest uppercase">رمضان ١٤٤٦ هـ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            أهلاً بك في <span className="text-amber-400">رمضان بلس</span>
          </h2>
          <div className={`transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}>
            <p className="text-emerald-50 text-lg max-w-2xl leading-relaxed italic">
              "{tip}"
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/40 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Prayers Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" size={20} />
              الصلوات
            </h3>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">اليوم</span>
          </div>
          <div className="h-40 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={prayerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {prayerData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-emerald-600">٥/٧</span>
              <span className="text-[10px] text-slate-400 font-bold">فروض</span>
            </div>
          </div>
        </div>

        {/* Quran Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <Book className="text-blue-500" size={20} />
              الورد القرآني
            </h3>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">الجزء ٤</span>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-500">التقدم في الختمة</span>
                <span className="text-blue-600">١٣٪</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: '13%' }}></div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-slate-50 p-3 rounded-2xl">
                <p className="text-[10px] text-slate-400 font-bold mb-1">آخر سورة</p>
                <p className="text-sm font-bold text-slate-700">آل عمران</p>
              </div>
              <div className="flex-1 bg-slate-50 p-3 rounded-2xl">
                <p className="text-[10px] text-slate-400 font-bold mb-1">الصفحة</p>
                <p className="text-sm font-bold text-slate-700">٦٢</p>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <Clock className="text-amber-500" size={20} />
              الإنتاجية
            </h3>
            <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">ساعات</span>
          </div>
          <div className="flex flex-col items-center justify-center h-32 space-y-2">
             <span className="text-4xl font-black text-slate-800 tracking-tighter">٠٣:٤٥</span>
             <p className="text-xs text-slate-400 font-medium">إجمالي ساعات التركيز اليوم</p>
             <div className="flex gap-1 mt-2">
               {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 w-6 rounded-full ${i <= 3 ? 'bg-amber-400' : 'bg-slate-100'}`}></div>)}
             </div>
          </div>
        </div>
      </div>

      {/* Suggested Plan */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp className="text-purple-500" size={20} />
          الخطة المقترحة لبقية اليوم
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { time: "١٢:٣٠ م", task: "صلاة الظهر وورد الذكر", status: "pending" },
            { time: "٠٢:٠٠ م", task: "جلسة دراسة/عمل (٩٠ دقيقة)", status: "pending" },
            { time: "٠٣:٤٥ م", task: "صلاة العصر وقراءة الورد", status: "pending" },
            { time: "٠٥:٣٠ م", task: "دعاء ما قبل الإفطار", status: "pending" },
          ].map((item, idx) => (
            <div key={idx} className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 hover:border-emerald-100 transition-all cursor-default">
               <div className="bg-white shadow-sm border border-slate-100 w-16 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                 {item.time}
               </div>
               <div className="flex-1 text-sm font-medium text-slate-600">{item.task}</div>
               <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-emerald-400"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
