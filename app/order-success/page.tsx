import Link from "next/link";
import { FaCheckCircle, FaHome } from "react-icons/fa";

// This component receives the search parameters (like the order ID)
export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  // Await the searchParams to get the ID
  const { id } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-200 text-center max-w-md w-full">
        
        <div className="text-green-500 text-6xl mb-6 flex justify-center">
          <FaCheckCircle />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
          Order Placed Successfully!
        </h1>
        
        <p className="text-slate-600 mb-6">
          Thank you for shopping with us. Your order has been received and is being processed.
        </p>

        {id && (
          <div className="bg-slate-100 p-4 rounded-lg mb-8">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Order ID</p>
            <p className="text-xl font-black text-slate-900 mt-1">{id}</p>
          </div>
        )}

        <Link 
          href="/" 
          className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-lg transition-all"
        >
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
}
