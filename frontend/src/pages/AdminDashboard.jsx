import { useEffect, useState } from "react";
import {
  Users,
  BriefcaseBusiness,
  UserX,
  Globe,
  FileText,
  UserCheck,
} from "lucide-react";
import api from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    blockedUsers: 0,
    totalPortfolios: 0,
    publishedPortfolios: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/admin/stats");
        setStats(response.data.data);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      }
    };

    fetchStats();
  }, []);

  const draftPortfolios =
    stats.totalPortfolios - stats.publishedPortfolios;

  const activeUsers = stats.totalUsers - stats.blockedUsers;

  const publishedPercentage =
    stats.totalPortfolios > 0
      ? Math.round(
          (stats.publishedPortfolios / stats.totalPortfolios) * 100
        )
      : 0;

  const activeUserPercentage =
    stats.totalUsers > 0
      ? Math.round((activeUsers / stats.totalUsers) * 100)
      : 0;

  return (
    <div className="min-h-full bg-[#F6F5EE] p-6 text-[#1E222D] bg-[radial-gradient(#e2dfd2_1px,transparent_1px)] [background-size:16px_16px]">
      
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#209267]">
          Overview
        </span>

        <h1 className="mt-1 text-3xl font-serif font-bold text-[#1E222D]">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Manage users and portfolios from here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        
        {/* Total Users */}
        <div className="bg-white border border-[#E5E2D8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Total Users
              </p>

              <p className="mt-2 text-3xl font-bold font-serif text-[#1E222D]">
                {stats.totalUsers}
              </p>
            </div>

            <div className="p-3 bg-[#EAF5F0] rounded-xl text-[#209267]">
              <Users size={22} />
            </div>
          </div>
        </div>

        {/* Blocked Users */}
        <div className="bg-white border border-[#E5E2D8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Blocked Users
              </p>

              <p className="mt-2 text-3xl font-bold font-serif text-[#1E222D]">
                {stats.blockedUsers}
              </p>
            </div>

            <div className="p-3 bg-red-50 rounded-xl text-red-600">
              <UserX size={22} />
            </div>
          </div>
        </div>

        {/* Total Portfolios */}
        <div className="bg-white border border-[#E5E2D8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Total Portfolios
              </p>

              <p className="mt-2 text-3xl font-bold font-serif text-[#1E222D]">
                {stats.totalPortfolios}
              </p>
            </div>

            <div className="p-3 bg-gray-100 rounded-xl text-gray-700">
              <BriefcaseBusiness size={22} />
            </div>
          </div>
        </div>

        {/* Published Portfolios */}
        <div className="bg-white border border-[#E5E2D8] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Published Portfolios
              </p>

              <p className="mt-2 text-3xl font-bold font-serif text-[#1E222D]">
                {stats.publishedPortfolios}
              </p>
            </div>

            <div className="p-3 bg-[#EAF5F0] rounded-xl text-[#209267]">
              <Globe size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* Overview Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
        
        {/* Portfolio Overview */}
        <div className="bg-white border border-[#E5E2D8] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-[#1E222D]">
                Portfolio Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Current portfolio publishing status.
              </p>
            </div>

            <div className="p-2.5 bg-gray-100 rounded-lg text-gray-700">
              <FileText size={19} />
            </div>
          </div>

          <div className="space-y-5">
            {/* Published */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#209267]" />
                  <span className="text-sm text-gray-600">
                    Published
                  </span>
                </div>

                <span className="text-sm font-semibold text-[#1E222D]">
                  {stats.publishedPortfolios}
                </span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#209267] rounded-full transition-all"
                  style={{ width: `${publishedPercentage}%` }}
                />
              </div>
            </div>

            {/* Draft */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gray-400" />
                  <span className="text-sm text-gray-600">
                    Draft
                  </span>
                </div>

                <span className="text-sm font-semibold text-[#1E222D]">
                  {draftPortfolios}
                </span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-400 rounded-full transition-all"
                  style={{
                    width:
                      stats.totalPortfolios > 0
                        ? `${100 - publishedPercentage}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Publication rate
            </span>

            <span className="text-sm font-semibold text-[#209267]">
              {publishedPercentage}%
            </span>
          </div>
        </div>

        {/* User Overview */}
        <div className="bg-white border border-[#E5E2D8] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-[#1E222D]">
                User Overview
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Current user account status.
              </p>
            </div>

            <div className="p-2.5 bg-[#EAF5F0] rounded-lg text-[#209267]">
              <UserCheck size={19} />
            </div>
          </div>

          <div className="space-y-5">
            {/* Active Users */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#209267]" />
                  <span className="text-sm text-gray-600">
                    Active Users
                  </span>
                </div>

                <span className="text-sm font-semibold text-[#1E222D]">
                  {activeUsers}
                </span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#209267] rounded-full transition-all"
                  style={{ width: `${activeUserPercentage}%` }}
                />
              </div>
            </div>

            {/* Blocked Users */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="text-sm text-gray-600">
                    Blocked Users
                  </span>
                </div>

                <span className="text-sm font-semibold text-[#1E222D]">
                  {stats.blockedUsers}
                </span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-400 rounded-full transition-all"
                  style={{
                    width:
                      stats.totalUsers > 0
                        ? `${100 - activeUserPercentage}%`
                        : "0%",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Active user rate
            </span>

            <span className="text-sm font-semibold text-[#209267]">
              {activeUserPercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;