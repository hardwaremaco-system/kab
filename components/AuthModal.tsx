"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider"; 
import { Eye, EyeOff, X, CheckCircle } from "lucide-react"; 

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // 🚀 NEW: Success States
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // 🚀 NEW: Auto-close timer for the success popup
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isSuccess) {
      timeout = setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000); // Closes after 3 seconds
    }
    return () => clearTimeout(timeout);
  }, [isSuccess, onClose]);

  // Reset states when modal closes completely
  useEffect(() => {
    if (!isOpen) {
      setIsSuccess(false);
      setError("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
        setSuccessMessage("Login Successful!");
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        await signUpWithEmail(email, password);
        setSuccessMessage("Account Created Successfully!");
      }
      // Trigger the success view instead of closing immediately
      setIsSuccess(true); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message.replace("Firebase: ", "")); 
      } else {
        setError("Authentication failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      await signInWithGoogle();
      setSuccessMessage("Login Successful!");
      setIsSuccess(true); // Trigger success view
    } catch (err: unknown) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  const handleGoToDashboard = () => {
    setIsSuccess(false);
    onClose();
    router.push("/profile");
  };

  // ==========================================
  // SUCCESS VIEW RENDER
  // ==========================================
  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl text-center animate-in zoom-in duration-300">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-slate-900 mb-2">{successMessage}</h2>
          <p className="text-slate-500 text-sm mb-6 font-medium">You are now securely logged in.</p>
          
          <button
            onClick={handleGoToDashboard}
            className="w-full rounded-xl bg-[#FF6A00] py-3.5 text-white font-bold hover:bg-[#e65c00] transition-colors shadow-sm"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // NORMAL LOGIN/SIGNUP RENDER
  // ==========================================
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
          type="button"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-black text-slate-900 mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-[#FF6A00] focus:outline-none focus:ring-1 focus:ring-[#FF6A00] bg-slate-50"
              placeholder="you@example.com"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 focus:border-[#FF6A00] focus:outline-none focus:ring-1 focus:ring-[#FF6A00] bg-slate-50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 mt-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="relative">
              <label className="block text-sm font-bold text-slate-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-10 focus:border-[#FF6A00] focus:outline-none focus:ring-1 focus:ring-[#FF6A00] bg-slate-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-3 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#FF6A00] py-3.5 text-white font-bold hover:bg-[#e65c00] focus:outline-none focus:ring-2 focus:ring-[#FF6A00] transition-colors disabled:opacity-70 shadow-sm"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <div className="h-px w-full bg-slate-200"></div>
          <span className="bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
          <div className="h-px w-full bg-slate-200"></div>
        </div>

        <button
          type="button" 
          onClick={handleGoogleSignIn}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3.5 font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 52.749 L -8.284 52.749 C -8.574 53.879 -9.254 54.819 -10.204 55.449 L -10.204 57.779 L -6.324 57.779 C -4.054 55.699 -2.624 52.589 -3.264 51.509 Z"/>
              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.279 L -10.204 57.949 C -11.274 58.669 -12.864 59.189 -14.754 59.189 C -18.384 59.189 -21.474 56.739 -22.584 53.439 L -26.584 53.439 L -26.584 56.549 C -24.404 60.859 -19.914 63.239 -14.754 63.239 Z"/>
              <path fill="#FBBC05" d="M -22.584 53.439 C -22.874 52.589 -23.034 51.689 -23.034 50.769 C -23.034 49.849 -22.874 48.949 -22.584 48.099 L -22.584 44.989 L -26.584 44.989 C -27.464 46.739 -27.974 48.699 -27.974 50.769 C -27.974 52.839 -27.464 54.799 -26.584 56.549 L -22.584 53.439 Z"/>
              <path fill="#EA4335" d="M -14.754 42.299 C -12.984 42.299 -11.404 42.909 -10.154 44.099 L -6.744 40.689 C -8.804 38.769 -11.514 37.669 -14.754 37.669 C -19.914 37.669 -24.404 40.049 -26.584 44.359 L -22.584 47.469 C -21.474 44.169 -18.384 42.299 -14.754 42.299 Z"/>
            </g>
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-600 font-medium">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="font-bold text-[#FF6A00] hover:underline"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}
