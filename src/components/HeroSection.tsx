import { Play, ArrowRight, Star, Users, BookOpen, Award } from "lucide-react";

interface HeroProps {
  setCurrentPage: (p: string) => void;
}

export default function HeroSection({ setCurrentPage }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d1a]/95 via-[#050d1a]/80 to-[#050d1a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a] via-transparent to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="hero-particle animate-float"
            style={{
              width: `${[12, 8, 16, 10, 14, 9][i]}px`,
              height: `${[12, 8, 16, 10, 14, 9][i]}px`,
              background: i % 2 === 0
                ? "rgba(59, 130, 246, 0.4)"
                : "rgba(245, 158, 11, 0.4)",
              top: `${[20, 40, 60, 25, 70, 45][i]}%`,
              left: `${[70, 80, 65, 90, 75, 85][i]}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-700/40 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="text-blue-300 text-sm font-semibold">
                Bangladesh's #1 Premium LMS for Class 6–12
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none text-white">
                Learn Without{" "}
                <span className="text-gradient-gold">Limits</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-black text-gradient-blue">
                Achieve Greatness
              </h2>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
              Infinity LMS brings elite education to every student. Access{" "}
              <span className="text-gold font-semibold">500+ premium courses</span>,
              live classes, AI-powered quizzes, and expert instructors — all in
              one platform built for{" "}
              <span className="text-blue-400 font-semibold">SSC & HSC excellence</span>.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Users, value: "50K+", label: "Students" },
                { icon: BookOpen, value: "500+", label: "Courses" },
                { icon: Award, value: "98%", label: "Pass Rate" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-900/50 border border-blue-700/40 flex items-center justify-center">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-none">{value}</p>
                    <p className="text-slate-400 text-xs">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white font-bold">4.9/5</span>
              <span className="text-slate-400 text-sm">from 12,000+ reviews</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setCurrentPage("courses")}
                className="btn-primary text-base px-8 py-4 shine-effect"
              >
                Explore Courses <ArrowRight size={18} />
              </button>
              <button
                onClick={() => setCurrentPage("live")}
                className="btn-secondary text-base px-8 py-4"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center">
                  <Play size={14} className="text-blue-400 fill-blue-400 ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right — Floating Cards */}
          <div className="hidden lg:block relative">
            {/* Main card */}
            <div className="relative mx-auto max-w-sm">
              <div className="glass-card rounded-2xl p-6 space-y-4 animate-float">
                <div className="flex items-center justify-between">
                  <span className="badge-gold">LIVE NOW</span>
                  <span className="text-slate-400 text-xs">342 watching</span>
                </div>
                <div className="rounded-xl overflow-hidden bg-blue-900/30 h-40 flex items-center justify-center border border-blue-700/30">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full gradient-electric flex items-center justify-center mx-auto mb-2 animate-pulse-gold">
                      <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                    <p className="text-white font-semibold text-sm">SSC Math Live Class</p>
                    <p className="text-slate-400 text-xs">Prof. Rakibul Islam</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-semibold text-sm">Chapter 12: Trigonometry</p>
                  <div className="bg-white/5 rounded-full h-2">
                    <div className="progress-bar h-2 rounded-full" style={{ width: "65%" }} />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>65% complete</span>
                    <span>Module 8/12</span>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -top-8 -right-8 glass-card rounded-xl p-3 flex items-center gap-2 border border-amber-500/20" style={{ animationDelay: "0.5s" }}>
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Award size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">GPA 5.00</p>
                  <p className="text-slate-400 text-xs">SSC Result</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-8 glass-card rounded-xl p-3 border border-blue-500/20 animate-float" style={{ animationDelay: "1s" }}>
                <p className="text-slate-400 text-xs mb-1">New lesson alert 🔔</p>
                <p className="text-white font-semibold text-sm">Organic Chemistry Ch. 5</p>
                <p className="text-blue-400 text-xs">Just uploaded by Dr. Kamrul</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-16">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-4">
            Browse by Class
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Class 6", icon: "📗" },
              { label: "Class 7", icon: "📘" },
              { label: "Class 8", icon: "📙" },
              { label: "Class 9", icon: "📕" },
              { label: "Class 10 (SSC)", icon: "🎓" },
              { label: "Inter 1st Year", icon: "🏅" },
              { label: "Inter 2nd Year (HSC)", icon: "🏆" },
            ].map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => setCurrentPage("courses")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900/20 border border-blue-800/30 hover:border-blue-500/50 hover:bg-blue-900/40 transition-all text-sm text-slate-300 hover:text-white font-medium"
              >
                <span>{icon}</span> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050d1a] to-transparent pointer-events-none" />
    </section>
  );
}
