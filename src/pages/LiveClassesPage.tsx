import { useState } from "react";
import { Play, Video, Users, Clock, Calendar, Bell, ExternalLink, Wifi } from "lucide-react";
import { liveClasses, categories } from "../data/courses";

const upcomingSchedule = [
  { date: "June 26", day: "Thursday", classes: [
    { time: "4:00 PM", title: "SSC Math — Trigonometry", instructor: "Prof. Rakibul Islam", category: "Class 10", platform: "Zoom", students: 342 },
    { time: "7:00 PM", title: "Class 9 — Chemistry Basics", instructor: "Md. Tanvir Ahmed", category: "Class 9", platform: "Google Meet", students: 189 },
  ]},
  { date: "June 27", day: "Friday", classes: [
    { time: "4:00 PM", title: "HSC Physics — Wave Optics Q&A", instructor: "Dr. Farhana Begum", category: "Inter 2nd Year", platform: "Zoom", students: 215 },
    { time: "6:00 PM", title: "Inter 1st Year — Bangla Sahitya", instructor: "Nusrat Jahan", category: "Inter 1st Year", platform: "Google Meet", students: 167 },
  ]},
  { date: "June 28", day: "Saturday", classes: [
    { time: "10:00 AM", title: "SSC English — Writing Skills", instructor: "Shahriar Khan", category: "Class 10", platform: "Zoom", students: 298 },
    { time: "3:00 PM", title: "Class 8 — General Science", instructor: "Afsana Khatun", category: "Class 8", platform: "Google Meet", students: 145 },
    { time: "6:00 PM", title: "HSC Chemistry — Organic Reactions", instructor: "Dr. Kamrul Hasan", category: "Inter 2nd Year", platform: "Zoom", students: 312 },
  ]},
];

export default function LiveClassesPage({ setCurrentPage: _setCurrentPage }: { setCurrentPage: (p: string) => void }) {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="min-h-screen bg-navy pt-20">
      {/* Header */}
      <div className="bg-navy-light border-b border-blue-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
            <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Live & Upcoming</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Live <span className="text-gradient-gold">Classes</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Join interactive live sessions with expert instructors. Q&A, polls, and real-time learning.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Currently Live */}
        <div className="mb-12">
          <h2 className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              Happening Now
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveClasses.filter(c => c.id === 1).map(cls => (
              <div key={cls.id} className="glass-card rounded-2xl overflow-hidden animate-pulse-gold border border-amber-500/20">
                <div className="relative bg-gradient-to-br from-red-900/30 to-blue-900/30 h-40 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto mb-3">
                      <Wifi size={28} className="text-red-400" />
                    </div>
                    <span className="flex items-center gap-1.5 text-red-400 font-bold text-sm justify-center">
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> LIVE
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Users size={11} /> {cls.students}
                  </div>
                </div>
                <div className="p-5">
                  <span className="badge-electric mb-2 inline-block">{cls.category}</span>
                  <h3 className="text-white font-bold mb-1">{cls.title}</h3>
                  <p className="text-slate-400 text-sm mb-1">by {cls.instructor}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Clock size={11} className="text-blue-400" /> {cls.duration}</span>
                    <span className="flex items-center gap-1"><Video size={11} className="text-blue-400" /> {cls.platform}</span>
                  </div>
                  <button className="btn-primary w-full py-3 text-sm justify-center">
                    <Play size={15} className="fill-current" /> Join Live Class
                  </button>
                </div>
              </div>
            ))}

            {/* Upcoming Soon */}
            {liveClasses.filter(c => c.id !== 1).map(cls => (
              <div key={cls.id} className="glass-card rounded-2xl overflow-hidden card-hover">
                <div
                  className="h-40 flex items-center justify-center relative"
                  style={{ background: `linear-gradient(135deg, ${cls.color}10, ${cls.color}05)`, borderBottom: `1px solid ${cls.color}20` }}
                >
                  <div className="text-center">
                    <Calendar size={32} style={{ color: cls.color }} className="mx-auto mb-2" />
                    <p className="text-white font-bold text-sm">{cls.date}</p>
                    <p className="text-slate-400 text-xs">{cls.duration} session</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: `${cls.color}20`, color: cls.color, border: `1px solid ${cls.color}40` }}>
                      Upcoming
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="badge-electric mb-2 inline-block">{cls.category}</span>
                  <h3 className="text-white font-bold mb-1 text-sm">{cls.title}</h3>
                  <p className="text-slate-400 text-xs mb-1">by {cls.instructor}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Clock size={11} className="text-blue-400" /> {cls.date}</span>
                    <span className="flex items-center gap-1"><Users size={11} className="text-blue-400" /> {cls.students}</span>
                  </div>
                  <button className="btn-secondary w-full py-2.5 text-sm justify-center">
                    <Bell size={14} /> Set Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div>
          <h2 className="text-white font-bold text-2xl mb-6 flex items-center gap-2">
            <Calendar size={22} className="text-blue-400" /> Upcoming Schedule
          </h2>

          {/* Category filter */}
          <div className="flex items-center gap-3 overflow-x-auto pb-3 mb-8">
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeFilter === "all" ? "gradient-gold text-navy-card" : "bg-blue-900/20 text-slate-300 border border-blue-800/30 hover:border-blue-500/50"}`}
            >
              All Classes
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeFilter === cat.id ? "gradient-gold text-navy-card" : "bg-blue-900/20 text-slate-300 border border-blue-800/30 hover:border-blue-500/50"}`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {upcomingSchedule.map(day => (
              <div key={day.date}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-electric flex items-center justify-center text-white font-black text-sm text-center leading-tight">
                    <div>
                      <div className="text-xs opacity-80">{day.day.slice(0,3)}</div>
                      <div>{day.date.split(" ")[1]}</div>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-bold">{day.date}</p>
                    <p className="text-slate-400 text-sm">{day.day} · {day.classes.length} classes</p>
                  </div>
                </div>

                <div className="space-y-3 ml-4 pl-8 border-l border-blue-900/30">
                  {day.classes.map((cls, i) => (
                    <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4 card-hover">
                      <div className="text-right w-16 flex-shrink-0">
                        <p className="text-white font-bold text-sm">{cls.time}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{cls.title}</p>
                        <p className="text-slate-400 text-xs">by {cls.instructor} · {cls.category}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 flex-shrink-0">
                        <span className="flex items-center gap-1"><Users size={11} className="text-blue-400" /> {cls.students}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-blue-400">{cls.platform}</span>
                      </div>
                      <button className="btn-secondary text-xs py-2 px-3 flex-shrink-0">
                        <Bell size={12} /> Remind
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {[
            { platform: "Zoom", icon: "🔵", desc: "Interactive whiteboard, breakout rooms, and Q&A for immersive learning.", color: "#3b82f6" },
            { platform: "Google Meet", icon: "🟢", desc: "Seamless video conferencing with screen sharing and real-time captions.", color: "#10b981" },
          ].map(p => (
            <div key={p.platform} className="glass-card rounded-2xl p-6 flex items-start gap-4">
              <div className="text-4xl">{p.icon}</div>
              <div>
                <h3 className="text-white font-bold mb-1">{p.platform} Integration</h3>
                <p className="text-slate-400 text-sm">{p.desc}</p>
                <button className="flex items-center gap-1.5 text-blue-400 text-sm mt-3 hover:text-blue-300 transition-colors">
                  <ExternalLink size={13} /> Learn more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
