import { useState } from "react";
import { Eye, EyeOff, ArrowLeft, CheckCircle, Shield, Smartphone } from "lucide-react";

interface LoginPageProps {
  setCurrentPage: (p: string) => void;
  setIsLoggedIn: (v: boolean) => void;
  setUserRole: (r: string) => void;
}

export function LoginPage({ setCurrentPage, setIsLoggedIn, setUserRole }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      if (email === "mdmahadih673@gmail.com" && password === "556677") {
        setUserRole("admin");
        setCurrentPage("admin");
      } else {
        setUserRole(role);
        setCurrentPage("dashboard");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center pt-20 pb-10 px-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => setCurrentPage("home")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-8"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="glass-card rounded-3xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-electric flex items-center justify-center mx-auto mb-4 blue-glow">
              <span className="text-white font-black text-2xl">∞</span>
            </div>
            <h1 className="text-2xl font-black text-white">Welcome Back</h1>
            <p className="text-slate-400 text-sm mt-1">Sign in to continue your learning journey</p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-2 mb-6 bg-navy/50 rounded-xl p-1.5 border border-blue-900/30">
            {["student", "instructor", "admin"].map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                  role === r
                    ? "gradient-electric text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                Email or Phone
              </label>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-navy border border-blue-800/40 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 text-sm transition-all"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-navy border border-blue-800/40 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 text-sm transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <button type="button" className="text-blue-400 text-xs hover:text-blue-300 transition-colors">
                  Forgot password?
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-amber-900/20 border border-amber-700/30 rounded-xl px-3 py-2.5">
              <Shield size={14} className="text-amber-400 flex-shrink-0" />
              <p className="text-amber-300 text-xs">Single device login — secure & private</p>
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center py-4 text-base shine-effect"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : "Sign In →"}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-blue-900/50" />
              <span className="text-slate-500 text-xs">or continue with</span>
              <div className="flex-1 h-px bg-blue-900/50" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ label: "Google", icon: "G" }, { label: "Facebook", icon: "f" }].map(s => (
                <button key={s.label} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all text-sm font-medium">
                  <span className="font-black text-base">{s.icon}</span> {s.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?{" "}
            <button onClick={() => setCurrentPage("register")} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
              Join Free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage({ setCurrentPage, setIsLoggedIn, setUserRole }: LoginPageProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "", otp: "", class: "class-10"
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setLoading(true);
      setTimeout(() => {
        setIsLoggedIn(true);
        setUserRole("student");
        setCurrentPage("dashboard");
        setLoading(false);
      }, 1200);
    }
  };

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center pt-20 pb-10 px-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => setCurrentPage("home")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-8"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="glass-card rounded-3xl p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl gradient-electric flex items-center justify-center mx-auto mb-4 blue-glow">
              <span className="text-white font-black text-2xl">∞</span>
            </div>
            <h1 className="text-2xl font-black text-white">Join Infinity</h1>
            <p className="text-slate-400 text-sm mt-1">Start your learning journey for free</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  step >= s ? "gradient-electric text-white" : "bg-white/5 text-slate-500 border border-blue-900/30"
                }`}>
                  {step > s ? <CheckCircle size={16} /> : s}
                </div>
                <span className={`text-xs font-semibold ${step >= s ? "text-white" : "text-slate-500"}`}>
                  {s === 1 ? "Personal Info" : "Verification"}
                </span>
                {s < 2 && <div className="flex-1 h-px bg-blue-900/30" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => update("name", e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-navy border border-blue-800/40 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => update("email", e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-navy border border-blue-800/40 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => update("phone", e.target.value)}
                    placeholder="+880 1X-XXXX-XXXX"
                    className="w-full bg-navy border border-blue-800/40 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Class / Level</label>
                  <select
                    value={form.class}
                    onChange={e => update("class", e.target.value)}
                    className="w-full bg-navy border border-blue-800/40 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 text-sm cursor-pointer"
                  >
                    {["class-6", "class-7", "class-8", "class-9", "class-10", "inter-1", "inter-2"].map(c => (
                      <option key={c} value={c} className="bg-[#0d1f3c]">
                        {c === "class-6" ? "Class 6" : c === "class-7" ? "Class 7" : c === "class-8" ? "Class 8" : c === "class-9" ? "Class 9" : c === "class-10" ? "Class 10 (SSC)" : c === "inter-1" ? "Inter 1st Year" : "Inter 2nd Year (HSC)"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={e => update("password", e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full bg-navy border border-blue-800/40 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm pr-12"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-900/30 border border-blue-700/40 flex items-center justify-center mx-auto mb-4">
                    <Smartphone size={28} className="text-blue-400" />
                  </div>
                  <p className="text-white font-bold mb-1">Verify Your Phone</p>
                  <p className="text-slate-400 text-sm">We've sent a 6-digit OTP to {form.phone || "+880 1X-XXXX"}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1.5 block text-center">Enter OTP</label>
                  <input
                    type="text"
                    value={form.otp}
                    onChange={e => update("otp", e.target.value)}
                    placeholder="• • • • • •"
                    maxLength={6}
                    className="w-full bg-navy border border-blue-800/40 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-xl tracking-[1rem] text-center"
                    required
                  />
                  <p className="text-center text-slate-500 text-xs mt-2">Didn't receive? <span className="text-blue-400 cursor-pointer">Resend in 45s</span></p>
                </div>
                <div className="flex items-start gap-2 p-3 bg-amber-900/20 border border-amber-700/30 rounded-xl">
                  <CheckCircle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-amber-300 text-xs">By registering, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn-primary w-full justify-center py-4 text-base shine-effect"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : step === 1 ? "Continue →" : "Create Account →"}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{" "}
            <button onClick={() => setCurrentPage("login")} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
              Sign In
            </button>
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {["Free signup", "Secure payments", "24/7 support"].map(b => (
            <div key={b} className="text-center">
              <CheckCircle size={16} className="text-green-400 mx-auto mb-1" />
              <p className="text-slate-400 text-xs">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
