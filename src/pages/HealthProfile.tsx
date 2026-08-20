import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, Lock, ChevronRight, FileUp, Plus, X, Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import BottomNav from "@/components/BottomNav";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";

const historyData = [
  { date: "Jul 1", value: 92 },
  { date: "Jul 4", value: 94 },
  { date: "Jul 7", value: 93 },
  { date: "Jul 10", value: 95 },
  { date: "Jul 14", value: 95 },
];

// Mock Data
const biomarkers = [
  { 
    id: 1, 
    name: "Fasting Blood Sugar", 
    value: "95 mg/dL", 
    status: "optimal", 
    path: "/history"
  },
  { 
    id: 2, 
    name: "LDL Cholesterol", 
    value: "110 mg/dL", 
    status: "high", 
    path: "/book-test"
  }
];

const HealthProfile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [logValue, setLogValue] = useState("");
  const [selectedBiomarker, setSelectedBiomarker] = useState("Fasting Blood Sugar");
  const [bpSystolic, setBpSystolic] = useState("");
  const [bpDiastolic, setBpDiastolic] = useState("");
  const [isInsightsUnlocked, setIsInsightsUnlocked] = useState(searchParams.get("unlocked") === "true");

  const handleLogSubmit = () => {
    // Mock save
    setIsDrawerOpen(false);
    setLogValue("");
    setBpSystolic("");
    setBpDiastolic("");
  };

  return (
    <div className="min-h-screen bg-[#F9F7F5] dark:bg-zinc-950 pb-32 relative overflow-hidden flex flex-col">
       {/* Background Orbs */}
       <div className="absolute top-[10%] right-[-10%] w-[300px] h-[300px] bg-emerald-200/30 dark:bg-emerald-900/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="px-5 pt-12 relative z-10 max-w-[390px] mx-auto flex-1 w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Health Profile
          </h1>
        </div>

        {/* Action Cards (CTAs) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
           <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
               <div className="bg-card rounded-card shadow-card p-3 h-[90px] flex flex-col justify-between cursor-pointer border border-border/50 transition-transform active:scale-[0.98]">
                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                   <Plus className="w-4 h-4 text-primary" />
                 </div>
                 <h3 className="text-[13px] font-semibold text-foreground">Log Vitals</h3>
               </div>
             </DrawerTrigger>
             <DrawerContent className="bg-[#F9F7F5] dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/10">
                <div className="p-6 max-w-[390px] mx-auto w-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Log a Reading</h2>
                    <DrawerClose asChild>
                      <button className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center">
                        <X className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                      </button>
                    </DrawerClose>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">Biomarker</label>
                      <select 
                        value={selectedBiomarker}
                        onChange={(e) => setSelectedBiomarker(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-sm appearance-none"
                      >
                        <option>Fasting Blood Sugar</option>
                        <option>Blood Pressure</option>
                      </select>
                    </div>
                    <div>
                      {selectedBiomarker === "Blood Pressure" ? (
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">Systole</label>
                            <input 
                              type="number" 
                              value={bpSystolic}
                              onChange={(e) => setBpSystolic(e.target.value)}
                              placeholder="e.g. 120" 
                              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-sm"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">Diastole</label>
                            <input 
                              type="number" 
                              value={bpDiastolic}
                              onChange={(e) => setBpDiastolic(e.target.value)}
                              placeholder="e.g. 80" 
                              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-sm"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 block">Value</label>
                          <input 
                            type="number" 
                            value={logValue}
                            onChange={(e) => setLogValue(e.target.value)}
                            placeholder="e.g. 95" 
                            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleLogSubmit}
                    disabled={selectedBiomarker === "Blood Pressure" ? (!bpSystolic || !bpDiastolic) : !logValue}
                    className="w-full bg-amber-600 disabled:opacity-50 text-white text-base font-medium py-4 rounded-[20px] transition-transform active:scale-[0.98] shadow-lg shadow-amber-600/20"
                  >
                    Save Reading
                  </button>
                </div>
              </DrawerContent>
           </Drawer>

           <div 
             onClick={() => setIsInsightsUnlocked(true)}
             className="bg-card rounded-card shadow-card p-3 h-[90px] flex flex-col justify-between cursor-pointer border border-border/50 transition-transform active:scale-[0.98]"
           >
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
               <FileUp className="w-4 h-4 text-primary" />
             </div>
             <h3 className="text-[13px] font-semibold text-foreground">Upload Report</h3>
           </div>
        </div>

        {/* Insights Card */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-[20px] border border-white/80 dark:border-white/10 shadow-sm" />
          <div className={`relative p-4 flex gap-3 items-start ${!isInsightsUnlocked ? 'filter blur-[3px] opacity-40 pointer-events-none select-none' : ''}`}>
             <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-amber-600 dark:fill-amber-400" />
             </div>
             <div>
               <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 block mb-1">Insights</span>
               <p className="text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                 Your blood sugar levels are stable. But your cholesterol levels were high on your last test. Recommend checking them again.
               </p>
             </div>
          </div>
          {!isInsightsUnlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
              <Lock className="w-6 h-6 text-zinc-500 mb-2" />
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium px-4 text-center">Upload your latest report to unlock insights</p>
            </div>
          )}
        </div>

        {/* Trends Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-3 px-1">Trends</h3>
          
          {!isInsightsUnlocked ? (
            <div className="bg-card rounded-[20px] p-6 border border-border/50 shadow-sm h-[200px] flex flex-col items-center justify-center text-center">
              <p className="text-[17px] font-medium text-muted-foreground mb-1">No trends available</p>
              <p className="text-[13px] text-muted-foreground/70 px-4">Add your past reports in profile to enable trends</p>
            </div>
          ) : (
            <>
              {/* Pills */}
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide px-1">
                <button className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-medium shrink-0">Blood Sugar</button>
                <button className="px-4 py-1.5 rounded-full bg-card border border-border text-foreground text-xs font-medium shrink-0">LDL</button>
                <button className="px-4 py-1.5 rounded-full bg-card border border-border text-foreground text-xs font-medium shrink-0">Vit. D</button>
              </div>

              {/* Trend Graph */}
              <div className="bg-card rounded-[20px] p-4 border border-border/50 shadow-sm mb-4 h-[180px]">
                <div className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historyData} margin={{ top: 5, right: 5, bottom: 0, left: -25 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150, 150, 150, 0.2)" />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[85, 105]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(val: number) => [`${val} mg/dL`, 'Blood Sugar']}
                        labelStyle={{ color: 'black', fontWeight: 'bold', marginBottom: '4px' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#10b981" 
                        strokeWidth={3} 
                        dot={{ r: 4, fill: "#10b981", stroke: "white", strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: "#10b981", stroke: "white", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Secondary CTA */}
              <button className="w-full bg-card border border-primary/20 text-primary text-sm font-semibold py-3.5 rounded-full shadow-sm transition-transform active:scale-[0.98]">
                Check detail health trends
              </button>
            </>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default HealthProfile;
