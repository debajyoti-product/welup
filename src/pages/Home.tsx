import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Droplets, TrendingUp, ChevronRight, ArrowRight, FileText, X, Clock, Pill, Send, Plus, Mic, History, Activity, Sun, Star } from "lucide-react";

import hba1cImg from "@/assets/content/hba1c.jpg";
import metforminImg from "@/assets/content/metformin.jpg";
import cholesterolImg from "@/assets/content/cholesterol.jpg";

import {
  ConsultIllustration,
  HealthIllustration,
} from "@/components/illustrations";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const historyQuery = searchParams.get("historyQuery");
  const [chatInput, setChatInput] = useState("");
  const [lastChatQuery, setLastChatQuery] = useState<string | null>(historyQuery);
  const [hasReport, setHasReport] = useState(false);

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const query = chatInput;
    setChatInput("");
    setLastChatQuery("free_chat");
    navigate(`/chat?freeText=${encodeURIComponent(query)}`);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#F9F7F5] dark:bg-zinc-950 pb-24 relative overflow-hidden">
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-orange-100/80 to-transparent dark:from-orange-900/30 pointer-events-none z-0" />
      
      <div className="px-5 pt-12 pb-6 relative z-10 max-w-[390px] mx-auto flex flex-col min-h-[calc(100vh-90px)]">
        {/* Flip Button */}
        <div className="absolute top-4 left-5 z-20">
          <button 
            onClick={() => setHasReport(!hasReport)}
            className="text-xs bg-white/50 dark:bg-black/50 px-3 py-1 rounded-full border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            Flip State
          </button>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-start justify-between"
        >
          <div>
            <p className="text-sm text-muted-foreground font-medium">Hello,</p>
            <h1 className="text-4xl font-semibold text-primary tracking-tight">Debajyoti</h1>
          </div>
          <button 
            disabled={!lastChatQuery}
            onClick={() => lastChatQuery && navigate(`/chat?query=${lastChatQuery}`)}
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-card border border-border/60 shadow-sm transition-all ${
              !lastChatQuery ? 'opacity-40 cursor-not-allowed' : 'active:scale-95 hover:shadow-md cursor-pointer text-primary'
            }`}
          >
            <History className="w-[18px] h-[18px]" />
          </button>
        </motion.div>

        {/* Chat Module */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col min-h-0"
        >
          <motion.h2 
            variants={itemVariant}
            className="text-xl font-bold text-foreground mb-4 px-1"
          >
            {hasReport ? (
              <div className="flex items-center flex-wrap gap-2 w-full">
                <span className="text-xl font-bold text-foreground shrink-0">Report uploaded:</span>
                <div className="inline-flex items-center justify-between gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-full pl-2 pr-1.5 py-1 shadow-sm shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center justify-center shrink-0">
                      <FileText className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">report.pdf</span>
                  </div>
                  <button 
                    onClick={() => setHasReport(false)} 
                    className="w-5 h-5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              "How can I help you today?"
            )}
          </motion.h2>

          {hasReport ? (
            <motion.div variants={itemVariant} className="flex-1 flex flex-col overflow-y-auto hide-scrollbar -mx-5 px-5 space-y-5 pb-2">
              {/* Health Overview */}
              <div className="bg-white/60 dark:bg-white/5 rounded-[24px] p-4 shadow-sm border border-white/50 dark:border-white/10 backdrop-blur-md">
                 <h3 className="text-[14.5px] font-semibold text-foreground mb-3">Here's an overview of your health</h3>
                 <ul className="space-y-2 mb-3.5">
                    <li className="flex items-center gap-2.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 shrink-0" />
                       <span className="text-[14px] font-medium text-foreground">Cholesterol</span>
                       <span className="text-[11px] font-semibold text-red-600 bg-red-100 dark:bg-red-950/50 dark:text-red-400 px-2 py-0.5 rounded-full">High</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 shrink-0" />
                       <span className="text-[14px] font-medium text-foreground">Vitamin D</span>
                       <span className="text-[11px] font-semibold text-orange-600 bg-orange-100 dark:bg-orange-950/50 dark:text-orange-400 px-2 py-0.5 rounded-full">Low</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 shrink-0" />
                       <span className="text-[14px] font-medium text-foreground">HbA1c</span>
                       <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 px-2 py-0.5 rounded-full">Normal</span>
                    </li>
                 </ul>
                 <p className="text-[13px] text-muted-foreground font-medium leading-relaxed">
                   For detailed insights, go to your <span onClick={() => navigate('/profile?unlocked=true')} className="text-primary cursor-pointer font-semibold underline decoration-primary/30 underline-offset-2">health profile</span>
                 </p>
              </div>
              
              {/* Doctor Suggestion */}
              <div className="space-y-4 pb-2">
                 <p className="text-[14.5px] font-medium text-foreground px-1 leading-relaxed">
                   Based on your report, we suggest a doctor consultation specializing in <span className="font-semibold text-primary">General health</span>
                 </p>
                 <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 hide-scrollbar">
                    {/* Doctor Card 1 */}
                    <div className="w-[260px] bg-white dark:bg-zinc-900 rounded-[24px] p-4 shadow-sm border border-emerald-500/30 dark:border-emerald-500/30 shrink-0 flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 left-0 bg-emerald-500 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-br-[10px] tracking-wide">
                        RECOMMENDED
                      </div>
                      <div className="flex gap-3 items-center mb-4 mt-1.5">
                        <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop" className="w-14 h-14 rounded-[16px] object-cover bg-zinc-100" alt="Doctor" />
                        <div>
                          <h4 className="text-[15px] font-semibold text-foreground">Dr. Sarah Jenkins</h4>
                          <p className="text-xs text-muted-foreground font-medium mt-0.5">MBBS, MD • 12 yrs exp</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-white/5 mt-auto">
                        <span className="text-[15px] font-semibold text-foreground">₹499</span>
                        <button className="text-[13px] font-semibold bg-primary/10 text-primary px-4 py-1.5 rounded-full transition-transform active:scale-95">Book</button>
                      </div>
                    </div>
                    {/* Doctor Card 2 */}
                    <div className="w-[260px] bg-white dark:bg-zinc-900 rounded-[24px] p-4 shadow-sm border border-zinc-200 dark:border-white/10 shrink-0 flex flex-col">
                      <div className="flex gap-3 items-center mb-4">
                        <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop" className="w-14 h-14 rounded-[16px] object-cover bg-zinc-100" alt="Doctor" />
                        <div>
                          <h4 className="text-[15px] font-semibold text-foreground">Dr. Arun Sharma</h4>
                          <p className="text-xs text-muted-foreground font-medium mt-0.5">MBBS, DO • 8 yrs exp</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-white/5 mt-auto">
                        <span className="text-[15px] font-semibold text-foreground">₹399</span>
                        <button className="text-[13px] font-semibold bg-primary/10 text-primary px-4 py-1.5 rounded-full transition-transform active:scale-95">Book</button>
                      </div>
                    </div>
                    {/* Doctor Card 3 */}
                    <div className="w-[260px] bg-white dark:bg-zinc-900 rounded-[24px] p-4 shadow-sm border border-zinc-200 dark:border-white/10 shrink-0 flex flex-col">
                      <div className="flex gap-3 items-center mb-4">
                        <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&auto=format&fit=crop" className="w-14 h-14 rounded-[16px] object-cover bg-zinc-100" alt="Doctor" />
                        <div>
                          <h4 className="text-[15px] font-semibold text-foreground">Dr. Priya Desai</h4>
                          <p className="text-xs text-muted-foreground font-medium mt-0.5">MBBS, DNB • 10 yrs exp</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-white/5 mt-auto">
                        <span className="text-[15px] font-semibold text-foreground">₹449</span>
                        <button className="text-[13px] font-semibold bg-primary/10 text-primary px-4 py-1.5 rounded-full transition-transform active:scale-95">Book</button>
                      </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div variants={itemVariant} className="mb-5 px-1">
              <ul className="space-y-3.5">
                <li className="flex items-center gap-3 text-[14px] text-foreground font-medium">
                  <div className="w-[30px] h-[30px] rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  Book doctor consults & blood tests
                </li>
                <li className="flex items-center gap-3 text-[14px] text-foreground font-medium">
                  <div className="w-[30px] h-[30px] rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  Get insights on your lab reports
                </li>
                <li className="flex items-center gap-3 text-[14px] text-foreground font-medium">
                  <div className="w-[30px] h-[30px] rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Pill className="w-4 h-4" />
                  </div>
                  Understand your medications
                </li>
              </ul>
            </motion.div>
          )}

          <div className="mt-auto pt-2 shrink-0">
            {/* Compact Action Cards */}
            {!hasReport && (
              <motion.div variants={itemVariant} className="mb-8">
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => {
                      setLastChatQuery("consult_doctor");
                      navigate("/chat?query=consult_doctor");
                    }}
                    className="bg-card bg-gradient-to-tr from-orange-100/60 to-transparent dark:from-orange-900/20 rounded-card shadow-card p-2.5 relative overflow-hidden h-[74px] flex flex-col justify-between cursor-pointer group transition-transform active:scale-[0.98] border border-border/50"
                  >
                    <h3 className="text-[13px] font-semibold text-foreground leading-tight pr-6">
                      Consult<br/><span className="text-[17px] block mt-0.5">Doctor</span>
                    </h3>
                    <div className="absolute bottom-[-4px] right-[-6px] opacity-90 -rotate-12 drop-shadow-lg scale-100">
                      <ConsultIllustration className="w-[44px] h-[44px]" />
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setLastChatQuery("book_test");
                      navigate("/chat?query=book_test");
                    }}
                    className="bg-card bg-gradient-to-tr from-orange-100/60 to-transparent dark:from-orange-900/20 rounded-card shadow-card p-2.5 relative overflow-hidden h-[74px] flex flex-col justify-between cursor-pointer group transition-transform active:scale-[0.98] border border-border/50"
                  >
                    <h3 className="text-[13px] font-semibold text-foreground leading-tight pr-6">
                      Book<br/><span className="text-[17px] block mt-0.5">Checkup</span>
                    </h3>
                    <div className="absolute bottom-[-4px] right-[-6px] opacity-90 rotate-12 drop-shadow-lg scale-100">
                      <HealthIllustration className="w-[44px] h-[44px]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Chat Input */}
            <motion.div variants={itemVariant} className="mb-2">
              <div className="relative p-[2px] rounded-full overflow-hidden shadow-lg shadow-primary/20 group">
                <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,hsl(var(--primary))_50%,transparent_100%)] opacity-80" />
                <div className="relative flex items-center bg-card rounded-full w-full">
                  <button className="pl-4 pr-2 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
                    <Plus className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent py-4 text-[14.5px] focus:outline-none text-foreground placeholder:text-muted-foreground"
                  />
                  <div className="pr-2 pl-2 flex items-center gap-2 flex-shrink-0">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Mic className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleChatSend}
                      className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center transition-transform active:scale-95"
                    >
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
