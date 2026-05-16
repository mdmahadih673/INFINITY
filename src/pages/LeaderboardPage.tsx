import { useState } from "react";
import { Trophy, Star } from "lucide-react";
import { categories } from "../data/courses";

const fullLeaderboard = [
  { rank: 1, name: "Ariful Hasan", score: 9850, quizzes: 45, correct: 42, course: "SSC Math", avatar: "AH", color: "#f59e0b", streak: 28 },
  { rank: 2, name: "Sadia Islam", score: 9720, quizzes: 43, correct: 41, course: "HSC Physics", avatar: "SI", color: "#3b82f6", streak: 21 },
  { rank: 3, name: "Raihan Ahmed", score: 9610, quizzes: 40, correct: 38, course: "SSC English", avatar: "RA", color: "#8b5cf6", streak: 18 },
  { rank: 4, name: "Nadia Khatun", score: 9480, quizzes: 44, correct: 40, course: "HSC Chemistry", avatar: "NK", color: "#10b981", streak: 15 },
  { rank: 5, name: "Imran Hossain", score: 9350, quizzes: 38, correct: 36, course: "SSC Math", avatar: "IH", color: "#06b6d4", streak: 12 },
  { rank: 6, name: "Fahima Akter", score: 9210, quizzes: 42, correct: 38, course: "Inter 1st — Bangla", avatar: "FA", color: "#f97316", streak: 10 },
  { rank: 7, name: "Tanvir Mahmud", score: 9080, quizzes: 36, correct: 34, course: "HSC Physics", avatar: "TM", color: "#ef4444", streak: 8 },
  { rank: 8, name: "Lamia Hossain", score: 8940, quizzes: 39, correct: 36, course: "SSC Science", avatar: "LH", color: "#a855f7", streak: 7 },
  { rank: 9, name: "Mehedi Hasan", score: 8820, quizzes: 35, correct: 32, course: "HSC Chemistry", avatar: "MH", color: "#14b8a6", streak: 5 },
  { rank: 10, name: "Riya Ahmed", score: 8690, quizzes: 33, correct: 30, course: "Class 9 Math", avatar: "RA", color: "#ec4899", streak: 4 },
];

const medals = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [timeFilter, setTimeFilter] = useState("weekly");

  const top3 = fullLeaderboard.slice(0, 3);

  return (
    <div className="min-h-screen bg-navy pt-20">
      {/* Header */}
      <div className="bg-navy-light border-b border-blue-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-900/30 border border-amber-700/30 mb-4">
            <Trophy size={14} className="text-amber-400" />
            <span className="text-amber-300 text-xs font-semibold uppercase tracking-wider">Top Performers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Hall of <span className="text-gradient-gold">Fame</span>
          </h1>
          <p className="text-slate-400 text-lg">Celebrate the best learners across Infinity LMS</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-between items-center mb-10">
          <div className="flex gap-2">
            {["weekly", "monthly", "alltime"].map(f => (
              <button
                key={f}
                onClick={() => setTimeFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
                  timeFilter === f ? "gradient-gold text-navy-card" : "bg-blue-900/20 text-slate-300 border border-blue-800/30 hover:border-blue-500/50"
                }`}
              >
                {f === "alltime" ? "All Time" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <select
            value={activeCategory}
            onChange={e => setActiveCategory(e.target.value)}
            className="bg-navy-card border border-blue-800/30 rounded-xl px-4 py-2 text-slate-300 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all" className="bg-[#0d1f3c]">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id} className="bg-[#0d1f3c]">{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Podium — Top 3 */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {/* 2nd */}
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">{medals[1]}</div>
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-2 shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${top3[1].color}, ${top3[1].color}80)` }}
            >
              {top3[1].avatar}
            </div>
            <p className="text-white font-bold text-sm text-center">{top3[1].name.split(" ")[0]}</p>
            <p className="text-slate-400 text-xs">{top3[1].score.toLocaleString()} pts</p>
            <div className="w-28 h-24 bg-gradient-to-t from-blue-700/30 to-blue-700/10 border border-blue-700/30 rounded-t-xl mt-2 flex items-center justify-center">
              <span className="text-white font-black text-2xl">2</span>
            </div>
          </div>

          {/* 1st */}
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-2 animate-float">{medals[0]}</div>
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-2 shadow-2xl gold-glow"
              style={{ background: `linear-gradient(135deg, ${top3[0].color}, ${top3[0].color}80)` }}
            >
              {top3[0].avatar}
            </div>
            <p className="text-white font-bold text-base text-center">{top3[0].name.split(" ")[0]}</p>
            <p className="text-amber-400 font-bold">{top3[0].score.toLocaleString()} pts</p>
            <div className="w-28 h-36 bg-gradient-to-t from-amber-600/30 to-amber-600/10 border border-amber-600/30 rounded-t-xl mt-2 flex items-center justify-center">
              <span className="text-white font-black text-3xl">1</span>
            </div>
          </div>

          {/* 3rd */}
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">{medals[2]}</div>
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-xl mb-2 shadow-2xl"
              style={{ background: `linear-gradient(135deg, ${top3[2].color}, ${top3[2].color}80)` }}
            >
              {top3[2].avatar}
            </div>
            <p className="text-white font-bold text-sm text-center">{top3[2].name.split(" ")[0]}</p>
            <p className="text-slate-400 text-xs">{top3[2].score.toLocaleString()} pts</p>
            <div className="w-28 h-16 bg-gradient-to-t from-orange-700/30 to-orange-700/10 border border-orange-700/30 rounded-t-xl mt-2 flex items-center justify-center">
              <span className="text-white font-black text-2xl">3</span>
            </div>
          </div>
        </div>

        {/* Full List */}
        <div className="space-y-3">
          {fullLeaderboard.map((entry, i) => (
            <div
              key={entry.rank}
              className={`glass-card rounded-xl p-4 flex items-center gap-4 card-hover ${i < 3 ? "border-amber-500/20" : ""}`}
            >
              {/* Rank */}
              <div className="w-10 text-center flex-shrink-0">
                {i < 3 ? (
                  <span className="text-2xl">{medals[i]}</span>
                ) : (
                  <span className="text-slate-400 font-black text-lg">#{entry.rank}</span>
                )}
              </div>

              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${entry.color}, ${entry.color}80)` }}
              >
                {entry.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white font-bold text-sm">{entry.name}</p>
                  {entry.streak > 20 && <span className="badge-gold">🔥 {entry.streak}d streak</span>}
                </div>
                <p className="text-slate-400 text-xs">{entry.course}</p>
              </div>

              {/* Stats */}
              <div className="hidden md:flex items-center gap-6 text-sm flex-shrink-0">
                <div className="text-center">
                  <p className="text-white font-bold">{entry.quizzes}</p>
                  <p className="text-slate-500 text-xs">Quizzes</p>
                </div>
                <div className="text-center">
                  <p className="text-green-400 font-bold">{Math.round((entry.correct / entry.quizzes) * 100)}%</p>
                  <p className="text-slate-500 text-xs">Accuracy</p>
                </div>
              </div>

              {/* Score */}
              <div className="text-right flex-shrink-0">
                <p className={`font-black text-lg ${i === 0 ? "text-gradient-gold" : i < 3 ? "text-white" : "text-blue-400"}`}>
                  {entry.score.toLocaleString()}
                </p>
                <p className="text-slate-500 text-xs">points</p>
              </div>

              {/* Stars */}
              <div className="hidden sm:flex flex-shrink-0">
                {[1,2,3].map(s => (
                  <Star
                    key={s}
                    size={12}
                    className={`${s <= (i < 3 ? 3 : i < 6 ? 2 : 1) ? "text-amber-400 fill-amber-400" : "text-slate-700"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Your Position Banner */}
        <div className="mt-8 glass-card rounded-2xl p-6 border border-blue-500/30 bg-blue-900/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl gradient-electric flex items-center justify-center text-white font-black text-xl">
              S
            </div>
            <div className="flex-1">
              <p className="text-white font-bold">Your Current Ranking</p>
              <p className="text-slate-400 text-sm">Keep learning to climb the leaderboard!</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-gradient-blue">#12</p>
              <p className="text-slate-400 text-xs">7,840 pts</p>
            </div>
          </div>
          <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="progress-bar h-2 rounded-full" style={{ width: "75%" }} />
          </div>
          <p className="text-slate-400 text-xs mt-1">410 points away from Top 10</p>
        </div>
      </div>
    </div>
  );
}
