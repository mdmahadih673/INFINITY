import { useState } from "react";
import {
  BookOpen, Trophy, Clock, Award, Play,
  TrendingUp, Bell, Download, CheckCircle, BarChart3
} from "lucide-react";
interface DashboardProps {
  setCurrentPage: (p: string) => void;
  setSelectedCourse: (c: any) => void;
  userRole: string;
  courses: any[];
}

const upcomingTasks = [
  { task: "Chapter 12 Quiz — SSC Math", due: "Today, 11:59 PM", type: "quiz", color: "#f59e0b" },
  { task: "Submit Assignment — Physics Wave", due: "Tomorrow, 6:00 PM", type: "assignment", color: "#3b82f6" },
  { task: "Live Class — Trigonometry", due: "Today, 7:00 PM", type: "live", color: "#ef4444" },
  { task: "Chapter 5 — Organic Chemistry", due: "28 Jun", type: "lesson", color: "#8b5cf6" },
];

const recentActivity = [
  { action: "Completed", item: "Video: Introduction to Trigonometry", time: "2h ago", icon: CheckCircle, color: "#10b981" },
  { action: "Scored 92%", item: "Quiz: Algebra Chapter 10", time: "Yesterday", icon: Trophy, color: "#f59e0b" },
  { action: "Downloaded", item: "PDF: Wave Optics Notes", time: "2 days ago", icon: Download, color: "#3b82f6" },
  { action: "Joined", item: "Live Class: Organic Chemistry Q&A", time: "3 days ago", icon: Play, color: "#ef4444" },
];

export default function DashboardPage({ setCurrentPage, setSelectedCourse, userRole, courses }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const enrolledCourses = courses.filter(c => c.enrolled);

  const statCards = [
    { label: "Courses Enrolled", value: "5", icon: BookOpen, color: "#3b82f6", bg: "bg-blue-900/30", border: "border-blue-700/30" },
    { label: "Lessons Completed", value: "87", icon: CheckCircle, color: "#10b981", bg: "bg-green-900/30", border: "border-green-700/30" },
    { label: "Quiz Score Avg.", value: "89%", icon: Trophy, color: "#f59e0b", bg: "bg-amber-900/30", border: "border-amber-700/30" },
    { label: "Hours Learned", value: "124h", icon: Clock, color: "#8b5cf6", bg: "bg-purple-900/30", border: "border-purple-700/30" },
  ];

  return (
    <div className="min-h-screen bg-navy pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-2xl gradient-electric flex items-center justify-center text-white font-black text-xl">
                {userRole === "admin" ? "A" : userRole === "instructor" ? "I" : "S"}
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">
                  Welcome back, {userRole === "admin" ? "Admin" : userRole === "instructor" ? "Instructor" : "Student"}! 👋
                </h1>
                <p className="text-slate-400 text-sm">Here's your learning overview for today.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => alert("No new notifications")} className="relative p-2.5 rounded-xl bg-navy-card border border-blue-900/30 text-slate-400 hover:text-white transition-all">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400"></span>
            </button>
            {userRole === "admin" && (
              <button onClick={() => setCurrentPage("admin")} className="btn-primary text-sm py-2.5 px-4">
                <BarChart3 size={15} /> Admin Panel
              </button>
            )}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, color, bg, border }) => (
            <div key={label} className={`glass-card rounded-2xl p-5 ${bg} border ${border}`}>
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <TrendingUp size={14} className="text-green-400" />
              </div>
              <p className="text-3xl font-black text-white mb-1">{value}</p>
              <p className="text-slate-400 text-xs">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-navy-card rounded-xl p-1 mb-8 border border-blue-900/30 overflow-x-auto">
          {[
            { id: "overview", label: "Overview" },
            { id: "mycourses", label: "My Courses" },
            { id: "quizzes", label: "Quizzes & Exams" },
            { id: "schedule", label: "Schedule" },
            { id: "certificates", label: "Certificates" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "gradient-electric text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue Learning */}
              <div>
                <h2 className="text-white font-bold text-lg mb-4">Continue Learning</h2>
                <div className="space-y-4">
                  {enrolledCourses.map(course => (
                    <div
                      key={course.id}
                      className="glass-card rounded-xl p-4 flex items-center gap-4 card-hover cursor-pointer"
                      onClick={() => { setSelectedCourse(course); setCurrentPage("course-detail"); }}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-20 h-16 rounded-xl object-cover flex-shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.title)}&background=1a3a6e&color=fff`; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate mb-1">{course.title}</p>
                        <p className="text-slate-400 text-xs mb-2">by {course.instructor}</p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-blue-400 font-semibold">{course.progress}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/5">
                            <div className="progress-bar h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                          </div>
                        </div>
                      </div>
                      <button className="btn-primary text-xs py-2 px-4 flex-shrink-0">
                        <Play size={12} /> Resume
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-white font-bold text-lg mb-4">Recent Activity</h2>
                <div className="glass-card rounded-xl overflow-hidden">
                  {recentActivity.map((act, i) => {
                    const Icon = act.icon;
                    return (
                      <div key={i} className={`flex items-center gap-4 p-4 ${i < recentActivity.length - 1 ? "border-b border-blue-900/20" : ""}`}>
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${act.color}20`, border: `1px solid ${act.color}40` }}
                        >
                          <Icon size={16} style={{ color: act.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm">
                            <span className="font-semibold">{act.action}</span>{" "}
                            <span className="text-slate-300">{act.item}</span>
                          </p>
                        </div>
                        <span className="text-slate-500 text-xs flex-shrink-0">{act.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Tasks */}
              <div>
                <h2 className="text-white font-bold text-lg mb-4">Upcoming Tasks</h2>
                <div className="space-y-3">
                  {upcomingTasks.map((task, i) => (
                    <div key={i} className="glass-card rounded-xl p-4 flex items-start gap-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: task.color, boxShadow: `0 0 8px ${task.color}60` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{task.task}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{task.due}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Progress */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <BarChart3 size={18} className="text-blue-400" /> Weekly Progress
                </h3>
                <div className="flex items-end justify-between gap-2 h-24 mb-2">
                  {[
                    { day: "Mon", h: 70 }, { day: "Tue", h: 90 }, { day: "Wed", h: 50 },
                    { day: "Thu", h: 85 }, { day: "Fri", h: 60 }, { day: "Sat", h: 100 }, { day: "Sun", h: 40 },
                  ].map(({ day, h }) => (
                    <div key={day} className="flex flex-col items-center gap-1 flex-1">
                      <div
                        className="w-full rounded-t-lg progress-bar"
                        style={{ height: `${h}%`, minHeight: "4px" }}
                      />
                      <span className="text-slate-500 text-[9px]">{day}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-xs">14.5 hours this week · +12% vs last week</p>
              </div>

              {/* Leaderboard Mini */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Trophy size={18} className="text-amber-400" /> Your Rank
                </h3>
                <div className="text-center py-4">
                  <div className="text-5xl font-black text-gradient-gold mb-2">#12</div>
                  <p className="text-slate-400 text-sm">in SSC Mathematics</p>
                  <div className="mt-4 bg-white/5 rounded-xl p-3">
                    <p className="text-white font-bold text-xl">7,840</p>
                    <p className="text-slate-400 text-xs">total points earned</p>
                  </div>
                </div>
                <button onClick={() => setCurrentPage("leaderboard")} className="btn-secondary w-full text-sm py-2.5">
                  View Full Leaderboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* My Courses Tab */}
        {activeTab === "mycourses" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">My Enrolled Courses ({enrolledCourses.length})</h2>
              <button onClick={() => setCurrentPage("courses")} className="btn-secondary text-sm py-2.5 px-4">
                Browse More
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {enrolledCourses.map(course => (
                <div key={course.id} className="glass-card rounded-xl overflow-hidden card-hover">
                  <div className="relative h-36">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.title)}&background=1a3a6e&color=fff`; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f3c] to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="h-1.5 bg-white/20 rounded-full">
                        <div className="progress-bar h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-white font-bold text-sm mb-1 line-clamp-1">{course.title}</p>
                    <p className="text-slate-400 text-xs mb-3">by {course.instructor}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 font-semibold text-sm">{course.progress}% complete</span>
                      <button
                        onClick={() => { setSelectedCourse(course); setCurrentPage("course-detail"); }}
                        className="btn-primary text-xs py-1.5 px-3"
                      >
                        <Play size={12} /> Resume
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === "quizzes" && (
          <div className="space-y-4">
            <h2 className="text-white font-bold text-lg mb-4">Quizzes & Assessments</h2>
            {[
              { title: "Chapter 12 Quiz — SSC Mathematics", score: "92%", status: "Completed", date: "20 Jun", total: 25, correct: 23 },
              { title: "Algebra Chapter 10 Test", score: "88%", status: "Completed", date: "18 Jun", total: 30, correct: 26 },
              { title: "Wave Optics MCQ", score: "Pending", status: "Upcoming", date: "Today, 7 PM", total: 20, correct: 0 },
              { title: "Chapter 5 — Organic Chemistry Quiz", score: "78%", status: "Completed", date: "15 Jun", total: 20, correct: 16 },
            ].map((quiz, i) => (
              <div key={i} className="glass-card rounded-xl p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  quiz.status === "Completed" ? "bg-green-900/30 border border-green-700/30" : "bg-amber-900/30 border border-amber-700/30"
                }`}>
                  {quiz.status === "Completed"
                    ? <CheckCircle size={22} className="text-green-400" />
                    : <Clock size={22} className="text-amber-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm mb-1 truncate">{quiz.title}</p>
                  <p className="text-slate-400 text-xs">{quiz.date} · {quiz.total} questions</p>
                </div>
                <div className="text-right">
                  <p className={`font-black text-xl ${quiz.status === "Completed" ? "text-green-400" : "text-amber-400"}`}>
                    {quiz.score}
                  </p>
                  <p className="text-slate-500 text-xs">{quiz.status}</p>
                </div>
                <button onClick={() => alert(quiz.status === "Upcoming" ? "Quiz starting soon!" : "Reviewing quiz results...")} className={`${quiz.status === "Upcoming" ? "btn-primary" : "btn-secondary"} text-xs py-2 px-3 flex-shrink-0`}>
                  {quiz.status === "Upcoming" ? "Start Quiz" : "Review"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            <h2 className="text-white font-bold text-lg">Study Planner</h2>
            <div className="grid md:grid-cols-7 gap-2 mb-6">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={day} className={`glass-card rounded-xl p-3 text-center ${i === 4 ? "border-amber-500/40 bg-amber-900/20" : ""}`}>
                  <p className="text-slate-400 text-xs mb-1">{day}</p>
                  <p className={`font-bold text-sm ${i === 4 ? "text-amber-400" : "text-white"}`}>{i + 22}</p>
                  {i === 4 && <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mx-auto mt-1"></div>}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Today's Schedule</h3>
              {[
                { time: "4:00 PM", event: "Study — SSC Math Chapter 12", type: "study", color: "#3b82f6" },
                { time: "7:00 PM", event: "Live Class — Trigonometry with Prof. Rakibul", type: "live", color: "#ef4444" },
                { time: "9:00 PM", event: "Chapter Quiz — Complete before midnight", type: "quiz", color: "#f59e0b" },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4">
                  <div className="text-right w-16 flex-shrink-0">
                    <p className="text-white font-bold text-sm">{item.time}</p>
                  </div>
                  <div className="w-0.5 h-10 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{item.event}</p>
                    <p className="text-slate-400 text-xs capitalize">{item.type}</p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}80` }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div className="space-y-4">
            <h2 className="text-white font-bold text-lg mb-4">My Certificates</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Class 9 General Science", date: "Completed: 15 May 2025", credential: "INF-2025-GS09-0041", color: "#10b981" },
                { title: "Class 8 Mathematics", date: "Completed: 1 Mar 2025", credential: "INF-2025-MA08-0012", color: "#3b82f6" },
              ].map((cert, i) => (
                <div key={i} className="glass-card rounded-2xl overflow-hidden">
                  <div
                    className="h-32 relative flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}10)`, borderBottom: `1px solid ${cert.color}30` }}
                  >
                    <div className="text-center">
                      <Award size={36} style={{ color: cert.color }} className="mx-auto mb-2" />
                      <p className="text-white font-black text-lg">Certificate</p>
                      <p className="text-slate-300 text-xs">of Completion</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-white font-bold mb-1">{cert.title}</p>
                    <p className="text-slate-400 text-xs mb-1">{cert.date}</p>
                    <p className="text-slate-500 text-xs mb-4">ID: {cert.credential}</p>
                    <button onClick={() => alert("Certificate downloaded successfully!")} className="btn-primary text-xs py-2 px-4">
                      <Download size={13} /> Download PDF
                    </button>
                  </div>
                </div>
              ))}
              <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center border-dashed border-2 border-blue-900/50">
                <Award size={40} className="text-slate-600 mb-3" />
                <p className="text-slate-400 font-semibold mb-1">More on the way!</p>
                <p className="text-slate-500 text-sm mb-4">Complete your enrolled courses to earn more certificates.</p>
                <button onClick={() => setCurrentPage("courses")} className="btn-secondary text-sm py-2 px-4">
                  My Active Courses
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
