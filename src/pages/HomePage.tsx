import { ArrowRight, Play, Trophy, Star, Users, BookOpen, Zap, Shield, Award, Clock, CheckCircle, Video, FileText, MessageSquare, Calendar } from "lucide-react";
import HeroSection from "../components/HeroSection";
import CourseCard from "../components/CourseCard";
import { stats, instructors, testimonials, liveClasses, leaderboard } from "../data/courses";

interface HomePageProps {
  setCurrentPage: (p: string) => void;
  setSelectedCourse: (c: any) => void;
  courses: any[];
}

export default function HomePage({ setCurrentPage, setSelectedCourse, courses }: HomePageProps) {
  const featuredCourses = courses.slice(0, 4);

  return (
    <div className="bg-navy">
      <HeroSection setCurrentPage={setCurrentPage} />

      {/* Stats Section */}
      <section className="py-16 border-y border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-black text-gradient-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-900/30 border border-amber-700/30 mb-4">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-amber-300 text-xs font-semibold uppercase tracking-wider">
                  Top Rated Courses
                </span>
              </div>
              <h2 className="section-title text-white">
                Featured <span className="text-gradient-gold">Courses</span>
              </h2>
              <p className="text-slate-400 mt-2 max-w-xl">
                Handpicked by our academic team — covering SSC, HSC, and foundational levels.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage("courses")}
              className="btn-secondary mt-4 md:mt-0 w-max"
            >
              View All Courses <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={(c) => { setSelectedCourse(c); setCurrentPage("course-detail"); }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-700/30 mb-4">
              <Zap size={14} className="text-blue-400" />
              <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">
                Everything You Need
              </span>
            </div>
            <h2 className="section-title text-white">
              Why Choose <span className="text-gradient-blue">Infinity?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Video,
                color: "#3b82f6",
                title: "HD Video Lessons",
                desc: "Crystal-clear recorded classes with speed control, subtitles, and offline download options.",
              },
              {
                icon: Play,
                color: "#f59e0b",
                title: "Live Classes",
                desc: "Real-time sessions via Zoom & Google Meet with Q&A, polls, and interactive whiteboards.",
              },
              {
                icon: Award,
                color: "#8b5cf6",
                title: "Smart Quizzes & MCQ",
                desc: "Auto-graded chapter tests, mock exams, and detailed performance analytics.",
              },
              {
                icon: FileText,
                color: "#06b6d4",
                title: "Study Materials",
                desc: "Downloadable PDFs, hand-notes, lecture sheets, and model question papers.",
              },
              {
                icon: Trophy,
                color: "#f59e0b",
                title: "Leaderboard & Rewards",
                desc: "Compete with peers across Bangladesh, earn badges, and certificates of completion.",
              },
              {
                icon: Shield,
                color: "#10b981",
                title: "Secure & Private",
                desc: "One device, one session policy with DRM-protected videos to safeguard your access.",
              },
              {
                icon: MessageSquare,
                color: "#f43f5e",
                title: "Discussion Forum",
                desc: "Ask questions, share notes, and get answers from instructors in lesson-specific threads.",
              },
              {
                icon: Calendar,
                color: "#a855f7",
                title: "Study Planner",
                desc: "Personalized study calendar with exam reminders, milestone tracking, and daily targets.",
              },
              {
                icon: CheckCircle,
                color: "#f59e0b",
                title: "Certificates",
                desc: "Earn verified digital certificates upon course completion, shareable on LinkedIn.",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className="glass-card rounded-2xl p-6 card-hover group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Classes */}
      <section className="py-20 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-900/30 border border-red-700/30 mb-4">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                <span className="text-red-300 text-xs font-semibold uppercase tracking-wider">
                  Live & Upcoming
                </span>
              </div>
              <h2 className="section-title text-white">
                Live <span className="text-gradient-gold">Classes</span>
              </h2>
            </div>
            <button onClick={() => setCurrentPage("live")} className="btn-secondary mt-4 md:mt-0 w-max">
              View Schedule <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {liveClasses.map((cls) => (
              <div key={cls.id} className="glass-card rounded-2xl p-6 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ background: `${cls.color}20`, color: cls.color, border: `1px solid ${cls.color}40` }}
                  >
                    {cls.category}
                  </span>
                  {cls.id === 1 ? (
                    <span className="flex items-center gap-1 text-xs text-red-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span> LIVE
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">{cls.platform}</span>
                  )}
                </div>
                <h3 className="text-white font-bold mb-2 text-sm">{cls.title}</h3>
                <p className="text-slate-400 text-xs mb-4">by {cls.instructor}</p>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-blue-400" /> {cls.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} className="text-blue-400" /> {cls.students} students
                  </span>
                </div>
                <button onClick={() => setCurrentPage("live")} className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${cls.id === 1 ? "btn-primary" : "btn-secondary"}`}>
                  {cls.id === 1 ? "Join Now →" : "Set Reminder"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-900/30 border border-amber-700/30 mb-4">
                <Trophy size={14} className="text-amber-400" />
                <span className="text-amber-300 text-xs font-semibold uppercase tracking-wider">
                  Top Performers
                </span>
              </div>
              <h2 className="section-title text-white mb-4">
                Rise to the <span className="text-gradient-gold">Top</span>
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Our live leaderboard shows the best performers across all courses. Earn points
                by completing lessons, acing quizzes, and submitting assignments on time.
              </p>

              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div key={entry.rank} className="glass-card rounded-xl p-4 flex items-center gap-4 card-hover">
                    <span className="text-2xl w-8 text-center">{entry.badge}</span>
                    <div className="w-10 h-10 rounded-full gradient-electric flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {entry.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{entry.name}</p>
                      <p className="text-slate-400 text-xs">{entry.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 font-black text-base">{entry.score.toLocaleString()}</p>
                      <p className="text-slate-500 text-xs">points</p>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setCurrentPage("leaderboard")} className="btn-secondary mt-6">
                Full Leaderboard <ArrowRight size={16} />
              </button>
            </div>

            {/* Right — Instructor Cards */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-700/30 mb-4">
                <Users size={14} className="text-blue-400" />
                <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">
                  Expert Instructors
                </span>
              </div>
              <h2 className="section-title text-white mb-4">
                Learn from the <span className="text-gradient-blue">Best</span>
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {instructors.map((inst) => (
                  <div key={inst.id} className="glass-card rounded-2xl p-5 card-hover text-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-3"
                      style={{ background: `linear-gradient(135deg, ${inst.color}, ${inst.color}80)` }}
                    >
                      {inst.avatar}
                    </div>
                    <h4 className="text-white font-bold text-sm mb-1">{inst.name}</h4>
                    <p className="text-blue-400 text-xs mb-3">{inst.subject}</p>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div>
                        <p className="text-white font-bold text-sm">{(inst.students / 1000).toFixed(1)}K</p>
                        <p className="text-slate-500 text-[10px]">Students</p>
                      </div>
                      <div>
                        <p className="text-amber-400 font-bold text-sm">{inst.rating}</p>
                        <p className="text-slate-500 text-[10px]">Rating</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-white">
              Student <span className="text-gradient-gold">Success Stories</span>
            </h2>
            <p className="text-slate-400 mt-2">Real results from real students across Bangladesh</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="glass-card rounded-2xl p-6 card-hover">
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{t.name}</p>
                    <p className="text-blue-400 text-xs">{t.class}</p>
                    <span className="badge-gold">{t.gpa}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-hero" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-amber-900/20" />
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <div className="w-full h-full bg-gradient-to-l from-amber-400 to-transparent" />
            </div>

            <div className="relative px-8 md:px-16 py-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/40 border border-amber-600/40 mb-6">
                <Zap size={16} className="text-amber-400" />
                <span className="text-amber-300 font-semibold text-sm">Start Your Journey Today</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Your Success Starts at{" "}
                <span className="text-gradient-gold">Infinity</span>
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
                Join 50,000+ students who are already achieving their dreams. Access world-class
                education with Bangladesh's most premium LMS platform.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setCurrentPage("register")}
                  className="btn-primary text-base px-10 py-4 shine-effect"
                >
                  Get Started Free <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => setCurrentPage("courses")}
                  className="btn-secondary text-base px-10 py-4"
                >
                  <BookOpen size={18} /> Browse Courses
                </button>
              </div>
              <p className="text-slate-500 text-sm mt-6">
                ✓ No credit card required &nbsp; ✓ Free access to select content &nbsp; ✓ Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-900/30 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-electric flex items-center justify-center">
                  <span className="text-white font-black text-lg">∞</span>
                </div>
                <span className="text-white font-black text-xl">INFINITY</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Bangladesh's premier online learning platform for Class 6–12. Empowering the next generation.
              </p>
              <div className="flex gap-3">
                {["f", "t", "in", "yt"].map(s => (
                  <div key={s} onClick={() => window.open("https://facebook.com", "_blank")} className="w-9 h-9 rounded-xl bg-blue-900/30 border border-blue-800/30 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 transition-all cursor-pointer text-sm font-bold">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {[
              { title: "Courses", links: ["Class 6–8", "Class 9–10 (SSC)", "Inter 1st Year", "Inter 2nd Year (HSC)", "All Courses"] },
              { title: "Platform", links: ["Live Classes", "Quiz System", "Study Planner", "Leaderboard", "Certificates"] },
              { title: "Support", links: ["Help Center", "WhatsApp Support", "Privacy Policy", "Terms of Service", "Refund Policy"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white font-bold mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-slate-400 text-sm hover:text-blue-400 cursor-pointer transition-colors">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-blue-900/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2025 Infinity LMS. All rights reserved. Made with ❤️ in Bangladesh.
            </p>
            <div className="flex items-center gap-3">
              {["bKash", "Nagad", "Rocket", "Upay", "SSL"].map(pay => (
                <span key={pay} className="text-xs bg-blue-900/30 border border-blue-800/30 px-2.5 py-1 rounded-lg text-slate-400">
                  {pay}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
