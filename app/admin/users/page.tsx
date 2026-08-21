"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider";
import { User } from "@/types";

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // 🔥 NEW: Search state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (!user || user.role !== "admin") return;
      try {
        const res = await fetch(`/api/admin/users?adminId=${user.id}`);
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users || []);
        }
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, [user]);

  const handleRoleChange = async (targetUserId: string, newRole: string) => {
    if (!user || user.role !== "admin") return;
    if (user.id === targetUserId) {
      alert("Safety Lock: You cannot modify your own account access from this dashboard.");
      return;
    }

    const confirm = window.confirm(`Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`);
    if (!confirm) return;

    setProcessingId(targetUserId);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminId: user.id,
          targetUserId,
          newRole
        })
      });

      if (res.ok) {
        setUsers(prev => prev.map(u => 
          u.id === targetUserId ? { ...u, role: newRole as any } : u
        ));
        alert("User role updated successfully.");
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to update role.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setProcessingId(null);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'editor': return 'bg-emerald-100 text-emerald-800 border-emerald-200'; 
      case 'vendor': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200'; 
    }
  };

  // 🔥 NEW: Filter users based on search query
  const filteredUsers = users.filter(u => {
    const query = searchQuery.toLowerCase();
    const nameMatch = u.displayName?.toLowerCase().includes(query);
    const emailMatch = u.email?.toLowerCase().includes(query);
    const idMatch = u.id?.toLowerCase().includes(query);
    
    return nameMatch || emailMatch || idMatch;
  });

  return (
    <div className="max-w-6xl mx-auto pb-20 md:pb-0">
      <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">User & Role Management</h1>
          <p className="text-slate-600 mt-2 font-medium">Control platform access for Mbarara Online, assign content editors, and manage vendors.</p>
        </div>

        {/* 🔥 NEW: Search Bar UI */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            placeholder="Search user, email, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg outline-none focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] transition-colors"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Current Role</th>
                <th className="px-6 py-4 text-right">Manage Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Loading registered users...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                    {searchQuery ? "No users match your search." : "No users found."}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const safeName = u.displayName ?? "Unknown User";
                  const isSelf = user?.id === u.id;

                  return (
                    <tr key={u.id} className={`hover:bg-slate-50 transition-colors ${isSelf ? 'bg-slate-50/50' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center font-bold overflow-hidden flex-shrink-0">
                            {u.photoURL ? (
                              <Image src={u.photoURL} alt={safeName} width={40} height={40} className="object-cover" />
                            ) : (
                              safeName.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 flex items-center gap-2">
                              {safeName}
                              {isSelf && <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">YOU</span>}
                            </p>
                            <p className="text-xs font-mono text-slate-500 mt-0.5">{u.id.slice(0, 10)}...</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700 font-medium">{u.email || "No email"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Unknown"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border ${getRoleBadge(u.role || 'customer')}`}>
                          {u.role || 'customer'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {processingId === u.id ? (
                          <span className="text-sm font-bold text-slate-400">Updating...</span>
                        ) : (
                          <select
                            disabled={isSelf}
                            value={u.role || "customer"}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className={`text-sm border rounded-lg px-3 py-2 outline-none font-medium cursor-pointer ${
                              isSelf 
                                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
                                : 'bg-white border-slate-300 focus:border-[#FF6A00] focus:ring-1 focus:ring-[#FF6A00] text-slate-700'
                            }`}
                          >
                            <option value="customer">Customer</option>
                            <option value="vendor">Vendor</option>
                            <option value="editor">Editor (Content Only)</option>
                            <option value="admin">System Admin</option>
                            <option value="suspended">Suspended</option>
                          </select>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
