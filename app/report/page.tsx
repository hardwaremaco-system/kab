"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/components/AuthProvider";
import { AlertTriangle, CheckCircle2, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ReportPage() {
  const { user } = useAuth();
  
  const [reportType, setReportType] = useState("suspicious_listing");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Please provide details about the issue.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await addDoc(collection(db, "reports"), {
        type: reportType,
        url: url,
        description: description,
        reportedBy: user ? user.uid : "anonymous",
        userEmail: user ? user.email : "anonymous",
        status: "pending", // You can update this to 'resolved' later in your admin panel
        createdAt: serverTimestamp(),
      });
      
      setIsSuccess(true);
    } catch (err) {
      console.error("Error submitting report:", err);
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="text-[#25D366] w-20 h-20 mb-6" />
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Report Submitted</h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-md mb-8">
          Thank you for helping keep Kabale Online safe. Our admin team will review this immediately.
        </p>
        <Link href="/" className="bg-[#FF6A00] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
          Return to Home
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
          <ShieldAlert className="text-[#FF6A00]" size={36} />
          Report an Issue
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Your reports help us maintain a 100% secure and genuine marketplace.
        </p>
      </div>

      <div className="bg-white dark:bg-[#151515] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Report Type */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-slate-900 dark:text-white">What are you reporting?</label>
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
            >
              <option value="suspicious_listing">Suspicious or Fake Product</option>
              <option value="scam_seller">Problem with a Seller/Owner</option>
              <option value="technical_bug">Technical Bug / App Error</option>
              <option value="other">Other Violation</option>
            </select>
          </div>

          {/* URL Reference */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-slate-900 dark:text-white">Product Link or URL (Optional)</label>
            <input 
              type="text"
              placeholder="e.g. https://kabaleonline.com/product/123"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00]"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="font-bold text-slate-900 dark:text-white">Details <span className="text-red-500">*</span></label>
            <textarea 
              rows={5}
              placeholder="Please provide as much detail as possible so we can investigate..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] resize-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium">
              <AlertTriangle size={18} /> {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#151515] hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 py-4 rounded-xl font-bold text-[16px] transition-all disabled:opacity-70 flex justify-center items-center"
          >
            {isSubmitting ? (
              <div className="h-6 w-6 rounded-full border-2 border-white dark:border-slate-900 border-t-transparent animate-spin"></div>
            ) : (
              "Submit Report"
            )}
          </button>

          <p className="text-xs text-center text-slate-500 mt-2">
            For immediate assistance regarding an order, please use our WhatsApp support channel.
          </p>
        </form>
      </div>
    </div>
  );
}
