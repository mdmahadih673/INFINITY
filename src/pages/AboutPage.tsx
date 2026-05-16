import { ArrowRight, Users, BookOpen, Award, Globe, Shield, Heart, Target, Zap } from "lucide-react";
import { instructors } from "../data/courses";

interface AboutPageProps {
  setCurrentPage: (p: string) => void;
}

export default function AboutPage({ setCurrentPage }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-navy pt-20">
      {/* Hero */}
      <div className="bg-navy-light border-b border-blue-900/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-700/30 mb-6">
            <span className="text-2xl">∞</span>
            <span className="text-blue-300 font-semibold text-sm">Infinity LMS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
            Empowering <span className="text-gradient-gold">Bangladesh's</span><br />
            Next Generation
          </h1>
          <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
            We believe every student in Bangladesh deserves access to world-class education,
            regardless of their location or background. Infinity LMS was born from that belief.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-700/30 mb-4">
                <Target size={14} className="text-blue-400" />
                <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">Our Mission</span>
              </div>
              <h2 className="section-title text-white mb-6">
                Making Elite Education <span className="text-gradient-blue">Accessible</span>
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Infinity LMS was founded with a single vision: to democratize premium education
                  across Bangladesh. From the most urban districts to the most remote villages,
                  every SSC and HSC student deserves a fighting chance.
                </p>
                <p>
                  We partner with the country's most experienced educators, curriculum experts, and
                  technologists to create a learning experience that's not just educational —
                  it's transformative.
                </p>
                <p>
                  Our name, <span className="text-gold font-semibold">Infinity</span>, represents the unlimited
                  potential within every student. We're here to help unlock it.
                </p>
              </div>
              <button onClick={() => setCurrentPage("courses")} className="btn-primary mt-8">
                Explore Our Courses <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "Active Students", value: "50,000+", color: "#3b82f6" },
                { icon: BookOpen, label: "Courses Available", value: "500+", color: "#f59e0b" },
                { icon: Award, label: "Expert Instructors", value: "120+", color: "#8b5cf6" },
                { icon: Globe, label: "Districts Reached", value: "64", color: "#10b981" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="glass-card rounded-2xl p-6 text-center card-hover">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                  >
                    <Icon size={22} style={{ color }} />
                  </div>
                  <p className="text-3xl font-black text-white mb-1">{value}</p>
                  <p className="text-slate-400 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-white">
              Our Core <span className="text-gradient-gold">Values</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart, color: "#ef4444", bg: "bg-red-900/20", border: "border-red-700/20",
                title: "Student First",
                desc: "Every decision we make starts with one question: 'Does this help our students achieve more?' Our students' success is our North Star.",
              },
              {
                icon: Shield, color: "#10b981", bg: "bg-green-900/20", border: "border-green-700/20",
                title: "Quality & Integrity",
                desc: "We maintain the highest academic standards. Our content is reviewed by subject matter experts and updated regularly to match curriculum changes.",
              },
              {
                icon: Zap, color: "#f59e0b", bg: "bg-amber-900/20", border: "border-amber-700/20",
                title: "Innovation",
                desc: "We continuously innovate — from AI-powered quiz analytics to interactive live sessions — to stay ahead of traditional education methods.",
              },
            ].map(({ icon: Icon, color, bg, border, title, desc }) => (
              <div key={title} className={`glass-card rounded-2xl p-8 ${bg} border ${border} card-hover`}>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${color}20`, border: `1px solid ${color}40` }}
                >
                  <Icon size={26} style={{ color }} />
                </div>
                <h3 className="text-white font-black text-xl mb-3">{title}</h3>
                <p className="text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-white">
              Meet Our <span className="text-gradient-blue">Expert Faculty</span>
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl mx-auto">
              Bangladesh's most experienced educators committed to your success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map(inst => (
              <div key={inst.id} className="glass-card rounded-2xl p-6 text-center card-hover">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4"
                  style={{ background: `linear-gradient(135deg, ${inst.color}, ${inst.color}80)` }}
                >
                  {inst.avatar}
                </div>
                <h4 className="text-white font-bold mb-1">{inst.name}</h4>
                <p className="text-blue-400 text-sm mb-1">{inst.subject}</p>
                <p className="text-slate-500 text-xs mb-4">{inst.experience} Experience</p>
                <div className="grid grid-cols-3 gap-2 text-center border-t border-blue-900/30 pt-4">
                  <div>
                    <p className="text-white font-bold text-sm">{(inst.students / 1000).toFixed(1)}K</p>
                    <p className="text-slate-500 text-[10px]">Students</p>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{inst.courses}</p>
                    <p className="text-slate-500 text-[10px]">Courses</p>
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
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card rounded-3xl p-12 border border-blue-500/20">
            <div className="text-5xl mb-6">∞</div>
            <h2 className="text-4xl font-black text-white mb-4">
              Be Part of the <span className="text-gradient-gold">Infinity Family</span>
            </h2>
            <p className="text-slate-300 text-lg mb-8">
              Join 50,000+ students who are already transforming their academic futures with Infinity LMS.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setCurrentPage("register")} className="btn-primary px-10 py-4 text-base shine-effect">
                Start Free Today <ArrowRight size={18} />
              </button>
              <button onClick={() => setCurrentPage("courses")} className="btn-secondary px-10 py-4 text-base">
                Browse Courses
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
