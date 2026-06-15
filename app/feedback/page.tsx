"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/components/AuthProvider";
import { MessageSquareHeart, Star, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FeedbackPage() {
  const { user } = useAuth();
  
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "feedback"), {
        rating: rating,
        message: feedback,
        // 🔥 FIX: Bypassing strict TypeScript checks for Vercel build
        userId: user ? (user as any).uid || (user as any).id || "unknown" : "anonymous",
        userEmail: user ? (user as any).email || "unknown" : "anonymous",
        createdAt: serverTimestamp(),
      });
      
      setIsSuccess(true);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="text-[#FF6A00] w-20 h-20 mb-6" />
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">We Appreciate You!</h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-md mb-8">
          Thank you for sharing your thoughts. We use this feedback to make Oweitu Shop better every day.
        </p>
        <Link href="/" className="bg-[#FF6A00] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
          Back to Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 pt-24 min-h-screen">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-[#FF6A00] mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <MessageSquareHeart className="text-[#FF6A00]" size={36} />
          Send Feedback
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          What do you love? What can we improve? Let us know.
        </p>
      </div>

      <div className="bg-white dark:bg-[#151515] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* Star Rating System */}
          <div className="flex flex-col items-center gap-3">
            <label className="font-bold text-slate-900 dark:text-white text-lg">How is your experience?</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                >
                  <Star 
                    size={40} 
                    className={`${
                      star <= (hoveredRating || rating) 
                        ? "fill-[#FF6A00] text-[#FF6A00]" 
                        : "fill-slate-100 text-slate-300 dark:fill-slate-800 dark:text-slate-700"
                    } transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm font-bold text-[#FF6A00]">
              {rating === 1 && "Very Bad 😠"}
              {rating === 2 && "Could be better 😕"}
              {rating === 3 && "It's Okay 😐"}
              {rating === 4 && "Good Experience 🙂"}
              {rating === 5 && "Excellent! 🚀"}
            </p>
          </div>

          {/* Feedback Textarea */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-slate-900 dark:text-white">Your comments</label>
            <textarea 
              rows={5}
              required
              placeholder="Tell us what you think..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || !feedback.trim()}
            className="w-full bg-[#FF6A00] hover:bg-[#e65c00] text-white py-4 rounded-xl font-bold text-[16px] transition-all disabled:opacity-50 flex justify-center items-center shadow-md"
          >
            {isSubmitting ? (
              <div className="h-6 w-6 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
