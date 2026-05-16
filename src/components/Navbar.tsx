import { useState, useEffect } from "react";
import { BookOpen, Menu, X, Bell, Search, ChevronDown, LogIn, User } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  userRole: string;
}

const navLinks = [
  { label: "Home", page: "home" },
  { label: "Courses", page: "courses" },
  { label: "Live Classes", page: "live" },
  { label: "Leaderboard", page: "leaderboard" },
  { label: "About", page: "about" },
];

export default function Navbar({ currentPage, setCurrentPage, isLoggedIn, setIsLoggedIn, userRole }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050d1a]/95 backdrop-blur-xl border-b border-blue-900/30 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => setCurrentPage("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl gradient-electric flex items-center justify-center blue-glow group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-lg">∞</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-xl tracking-tight">
                INFINITY
              </span>
              <span className="text-[10px] text-gold font-semibold tracking-[3px] uppercase">
                Learn Limitless
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => setCurrentPage(link.page)}
                className={`nav-link text-sm font-semibold transition-colors ${
                  currentPage === link.page
                    ? "text-gold active"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setCurrentPage("courses")} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/10">
              <Search size={18} />
            </button>
            {isLoggedIn && (
              <button onClick={() => alert("No new notifications")} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/10 relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400"></span>
              </button>
            )}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-900/30 border border-blue-700/30 hover:border-blue-500/50 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg gradient-electric flex items-center justify-center text-white font-bold text-sm">
                    {userRole === "admin" ? "A" : userRole === "instructor" ? "I" : "S"}
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-semibold leading-none">
                      {userRole === "admin" ? "Admin" : userRole === "instructor" ? "Instructor" : "Student"}
                    </p>
                    <p className="text-blue-400 text-xs">View Profile</p>
                  </div>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl shadow-2xl py-2 border border-blue-800/30">
                    <button
                      onClick={() => { setCurrentPage("dashboard"); setShowDropdown(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                    >
                      <User size={15} /> Dashboard
                    </button>
                    <button
                      onClick={() => { setCurrentPage("courses"); setShowDropdown(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
                    >
                      <BookOpen size={15} /> My Courses
                    </button>
                    <hr className="border-blue-900/50 my-1" />
                    <button
                      onClick={() => { setIsLoggedIn(false); setCurrentPage("home"); setShowDropdown(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage("login")}
                  className="btn-secondary text-sm py-2 px-5"
                >
                  <LogIn size={15} /> Login
                </button>
                <button
                  onClick={() => setCurrentPage("register")}
                  className="btn-primary text-sm py-2 px-5"
                >
                  Join Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#050d1a]/98 backdrop-blur-xl border-t border-blue-900/30 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => { setCurrentPage(link.page); setMobileOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                currentPage === link.page
                  ? "bg-blue-900/40 text-gold border border-amber-500/30"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => { setCurrentPage("dashboard"); setMobileOpen(false); }}
                  className="btn-secondary text-sm"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { setIsLoggedIn(false); setCurrentPage("home"); setMobileOpen(false); }}
                  className="w-full py-3 rounded-xl bg-red-900/30 text-red-400 border border-red-800/30 font-semibold text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setCurrentPage("login"); setMobileOpen(false); }} className="btn-secondary text-sm">
                  Login
                </button>
                <button onClick={() => { setCurrentPage("register"); setMobileOpen(false); }} className="btn-primary text-sm">
                  Join Free
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
