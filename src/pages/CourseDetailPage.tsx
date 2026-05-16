import { useState } from "react";
import {
  Play, Clock, BookOpen, Users, Star, Award, Download,
  ChevronDown, ChevronRight, Lock, CheckCircle, ArrowLeft,
  FileText, MessageSquare, Trophy
} from "lucide-react";

interface CourseDetailProps {
  course: any;
  setCurrentPage: (p: string) => void;
  isLoggedIn: boolean;
}



const reviews = [
  { name: "Arif H.", rating: 5, text: "Exceptional course. The instructor explains everything with great clarity.", time: "2 days ago" },
  { name: "Sadia R.", rating: 5, text: "Best investment for SSC preparation. Highly recommended!", time: "1 week ago" },
  { name: "Raihan A.", rating: 4, text: "Very comprehensive. The quiz system is excellent for self-assessment.", time: "2 weeks ago" },
];

export default function CourseDetailPage({ course, setCurrentPage, isLoggedIn }: CourseDetailProps) {
  const [openModule, setOpenModule] = useState(1);
  const [activeTab, setActiveTab] = useState("curriculum");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  if (!course) return null;

  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
  const finalPrice = promoApplied ? Math.round(course.price * 0.9) : course.price;

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "infinity10") {
      setPromoApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-navy pt-20">
      {/* Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => setCurrentPage("courses")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-6"
        >
          <ArrowLeft size={16} /> Back to Courses
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-navy-light border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="badge-electric">{course.categoryLabel}</span>
                {course.badge && <span className="badge-gold">{course.badge}</span>}
                <span className="text-slate-400 text-xs">{course.level} Level</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">
                {course.title}
              </h1>
              <p className="text-slate-300 text-base leading-relaxed">{course.description}</p>

              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={16} className={`${i <= Math.round(course.rating) ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />
                  ))}
                </div>
                <span className="text-amber-400 font-bold">{course.rating}</span>
                <span className="text-slate-400 text-sm">({course.reviews.toLocaleString()} reviews)</span>
                <span className="text-slate-400 text-sm">·</span>
                <span className="text-slate-300 text-sm flex items-center gap-1">
                  <Users size={14} className="text-blue-400" /> {course.students.toLocaleString()} students
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full gradient-electric flex items-center justify-center text-white font-bold">
                  {course.instructor.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{course.instructor}</p>
                  <p className="text-slate-400 text-xs">Senior Instructor</p>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-blue-400" /> {course.duration} total
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen size={16} className="text-blue-400" /> {course.lessons} lessons
                </span>
                <span className="flex items-center gap-2">
                  <Trophy size={16} className="text-blue-400" /> {course.modules} modules
                </span>
                <span className="flex items-center gap-2">
                  <Download size={16} className="text-blue-400" /> PDF resources
                </span>
                <span className="flex items-center gap-2">
                  <Award size={16} className="text-amber-400" /> Certificate included
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag: string) => (
                  <span key={tag} className="text-xs text-blue-300 bg-blue-900/30 border border-blue-800/40 px-3 py-1.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Purchase Card — Desktop */}
            <div className="hidden lg:block">
              <div className="glass-card rounded-2xl overflow-hidden sticky top-24">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(course.title)}&background=1a3a6e&color=fff&size=400`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f3c] to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                      <Play size={22} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {course.enrolled ? (
                    <div className="text-center py-2">
                      <p className="text-green-400 font-bold text-lg mb-1">✓ You're Enrolled!</p>
                      <p className="text-slate-400 text-sm">Continue your learning journey</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-black text-white">৳{finalPrice}</span>
                        <span className="text-slate-500 text-base line-through">৳{course.originalPrice}</span>
                        <span className="badge-gold ml-auto">{discount}% OFF</span>
                      </div>

                      {/* Promo Code */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 bg-navy border border-blue-800/40 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        />
                        <button onClick={applyPromo} className="btn-secondary py-2 px-3 text-xs">
                          Apply
                        </button>
                      </div>
                      {promoApplied && (
                        <p className="text-green-400 text-xs flex items-center gap-1">
                          <CheckCircle size={12} /> Extra 10% off applied!
                        </p>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => { if (!isLoggedIn) setCurrentPage("login"); }}
                    className="btn-primary w-full text-sm py-3.5 justify-center shine-effect"
                  >
                    {course.enrolled ? "Continue Learning →" : "Enroll Now — ৳" + finalPrice}
                  </button>

                  <div className="grid grid-cols-3 gap-2">
                    {["bKash", "Nagad", "Rocket"].map(p => (
                      <div key={p} className="text-center text-xs text-slate-500 bg-white/5 rounded-lg py-1.5">{p}</div>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2 border-t border-blue-900/30">
                    {[
                      "Full lifetime access",
                      "HD video lessons",
                      "Downloadable resources",
                      "Certificate of completion",
                      "30-day money-back guarantee",
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle size={12} className="text-green-400 flex-shrink-0" /> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 bg-navy-card rounded-xl p-1 mb-8 border border-blue-900/30">
              {[
                { id: "curriculum", label: "Curriculum" },
                { id: "overview", label: "Overview" },
                { id: "reviews", label: `Reviews (${course.reviews})` },
                { id: "discussions", label: "Discussions" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? "gradient-electric text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Curriculum */}
            {activeTab === "curriculum" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold">{course.modules} modules</h3>
                    <p className="text-slate-400 text-sm">{course.lessons} lessons · {course.duration} total</p>
                  </div>
                  <button className="text-blue-400 text-sm hover:text-blue-300">Expand All</button>
                </div>

                {(course.modulesList || []).map((mod: any) => (
                  <div key={mod.id} className="glass-card rounded-xl overflow-hidden border border-blue-900/30">
                    <button
                      onClick={() => setOpenModule(openModule === mod.id ? 0 : mod.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-white/3 transition-colors"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-8 h-8 rounded-lg gradient-electric flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {mod.id}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{mod.title}</p>
                          <p className="text-slate-400 text-xs">{mod.lessons} lessons · {mod.duration}</p>
                        </div>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform flex-shrink-0 ${openModule === mod.id ? "rotate-180" : ""}`}
                      />
                    </button>

                    {openModule === mod.id && (
                      <div className="border-t border-blue-900/30">
                        {mod.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 px-4 py-3 hover:bg-white/3 border-b border-blue-900/20 last:border-0">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              item.done ? "bg-green-900/40 border border-green-700/40" :
                              item.free ? "bg-blue-900/40 border border-blue-700/40" :
                              "bg-white/5 border border-white/10"
                            }`}>
                              {item.done ? (
                                <CheckCircle size={14} className="text-green-400" />
                              ) : item.type === "video" ? (
                                <Play size={12} className={item.free ? "text-blue-400 fill-blue-400 ml-0.5" : "text-slate-500 fill-slate-500 ml-0.5"} />
                              ) : item.type === "pdf" ? (
                                <FileText size={14} className={item.free ? "text-blue-400" : "text-slate-500"} />
                              ) : item.type === "quiz" ? (
                                <Trophy size={14} className={item.free ? "text-amber-400" : "text-slate-500"} />
                              ) : (
                                <FileText size={14} className="text-slate-500" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium truncate ${item.done ? "text-green-400" : item.free ? "text-white" : "text-slate-400"}`}>
                                {item.title}
                              </p>
                              <p className="text-xs text-slate-500 capitalize">{item.type}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500 text-xs">{item.duration}</span>
                              {!item.free && !course.enrolled && (
                                <Lock size={13} className="text-slate-600" />
                              )}
                              {item.free && (
                                <span className="text-[10px] text-green-400 bg-green-900/20 border border-green-800/30 px-1.5 py-0.5 rounded-full">FREE</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="glass-card rounded-xl p-6">
                  <h3 className="text-white font-bold text-lg mb-4">What You'll Learn</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Master all chapters with deep understanding",
                      "Solve MCQ & short questions confidently",
                      "Chapter-wise video + PDF notes",
                      "Live doubt-clearing sessions",
                      "Mock tests mirroring actual exams",
                      "Certificate upon completion",
                    ].map(item => (
                      <div key={item} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <h3 className="text-white font-bold text-lg mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    {["No prior advanced knowledge needed", "Notebook & pen for practice", "Stable internet for streaming", "Dedicated 2 hours per day"].map(r => (
                      <li key={r} className="flex items-start gap-2 text-sm text-slate-300">
                        <ChevronRight size={16} className="text-blue-400 mt-0.5 flex-shrink-0" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card rounded-xl p-6">
                  <h3 className="text-white font-bold text-lg mb-4">About the Instructor</h3>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl gradient-electric flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                      {course.instructor.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{course.instructor}</h4>
                      <p className="text-blue-400 text-sm mb-2">Senior Academic Instructor</p>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                        <span className="flex items-center gap-1"><Star size={13} className="text-amber-400 fill-amber-400" /> 4.9 Rating</span>
                        <span className="flex items-center gap-1"><Users size={13} className="text-blue-400" /> 12,000+ Students</span>
                        <span className="flex items-center gap-1"><BookOpen size={13} className="text-blue-400" /> 8 Courses</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        With over 15 years of teaching experience, this instructor has helped thousands of students achieve their academic goals. Known for breaking down complex topics into simple, memorable lessons.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="glass-card rounded-xl p-6 flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-6xl font-black text-white">{course.rating}</div>
                    <div className="flex justify-center my-2">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={18} className={`${i <= Math.round(course.rating) ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />
                      ))}
                    </div>
                    <p className="text-slate-400 text-sm">Course Rating</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3,2,1].map(star => (
                      <div key={star} className="flex items-center gap-3">
                        <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="progress-bar h-2 rounded-full"
                            style={{ width: `${star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : 1}%` }}
                          />
                        </div>
                        <div className="flex">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} size={10} className={`${i <= star ? "text-amber-400 fill-amber-400" : "text-slate-700"}`} />
                          ))}
                        </div>
                        <span className="text-slate-400 text-xs w-8">{star === 5 ? "78%" : star === 4 ? "15%" : star === 3 ? "5%" : "1%"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {reviews.map((r, i) => (
                  <div key={i} className="glass-card rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full gradient-electric flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {r.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-white font-semibold text-sm">{r.name}</h4>
                          <span className="text-slate-500 text-xs">{r.time}</span>
                        </div>
                        <div className="flex mb-2">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} size={13} className={`${i <= r.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />
                          ))}
                        </div>
                        <p className="text-slate-300 text-sm">{r.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Discussions */}
            {activeTab === "discussions" && (
              <div className="space-y-4">
                <div className="glass-card rounded-xl p-5">
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <MessageSquare size={18} className="text-blue-400" /> Ask a Question
                  </h3>
                  <textarea
                    placeholder="Ask about this course, a specific lesson, or any topic..."
                    rows={3}
                    className="w-full bg-navy border border-blue-800/30 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                  <button className="btn-primary mt-3 text-sm py-2.5">
                    Post Question
                  </button>
                </div>
                {[
                  { q: "How many mock tests are included?", a: "Each module has 2 mock tests + 1 final exam per chapter.", author: "Raihan", time: "1 day ago", answers: 3 },
                  { q: "Can I download the videos for offline viewing?", a: "Videos can be watched offline via the mobile app. Downloads are available for PDFs.", author: "Maliha", time: "3 days ago", answers: 5 },
                ].map((item, i) => (
                  <div key={i} className="glass-card rounded-xl p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full gradient-electric flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {item.author[0]}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{item.author}</p>
                        <p className="text-slate-500 text-xs">{item.time}</p>
                      </div>
                    </div>
                    <p className="text-white text-sm font-medium mb-3">Q: {item.q}</p>
                    <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3">
                      <p className="text-slate-300 text-xs font-semibold mb-1 text-blue-400">Instructor's Answer:</p>
                      <p className="text-slate-300 text-sm">{item.a}</p>
                    </div>
                    <p className="text-slate-500 text-xs mt-2">{item.answers} answers</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Purchase Card */}
          <div className="lg:hidden">
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-white">৳{finalPrice}</span>
                <span className="text-slate-500 text-base line-through">৳{course.originalPrice}</span>
                <span className="badge-gold ml-auto">{discount}% OFF</span>
              </div>
              <button className="btn-primary w-full text-sm py-3.5 justify-center shine-effect">
                {course.enrolled ? "Continue Learning →" : "Enroll Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
