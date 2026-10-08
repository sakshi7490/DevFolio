import { useEffect, useState } from "react";
import { UserX, UserCheck, Search, Filter } from "lucide-react";
import api from "../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/users");
      setUsers(response.data.data.users);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockToggle = async () => {
    if (!selectedUser) return;

    try {
      await api.patch(`/users/users/${selectedUser._id}/block`, {
        isBlocked: !selectedUser.isBlocked,
      });

      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user status", error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "blocked" && user.isBlocked) ||
      (statusFilter === "active" && !user.isBlocked);

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="text-sm text-gray-500">
        Loading users...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-[#18212f]">
          User Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage registered users and their access.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="mb-5 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="relative">
          <Filter
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-44 pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[#faf9f6] border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Name
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-[#fcfcfa] transition"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-[#18212f]">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                      {user.role}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.isBlocked
                            ? "bg-red-50 text-red-600"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className={`inline-flex items-center gap-2 text-sm font-medium transition ${
                          user.isBlocked
                            ? "text-emerald-600 hover:text-emerald-700"
                            : "text-red-500 hover:text-red-600"
                        }`}
                      >
                        {user.isBlocked ? (
                          <>
                            <UserCheck size={16} />
                            Unblock
                          </>
                        ) : (
                          <>
                            <UserX size={16} />
                            Block
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
          <div className="w-full max-w-md rounded-xl bg-white border border-gray-200 shadow-xl p-6">
            <h2 className="text-lg font-semibold text-[#18212f]">
              {selectedUser.isBlocked
                ? "Unblock User"
                : "Block User"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Are you sure you want to{" "}
              {selectedUser.isBlocked ? "unblock" : "block"}{" "}
              <span className="font-medium text-gray-900">
                {selectedUser.name}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleBlockToggle}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition ${
                  selectedUser.isBlocked
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {selectedUser.isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;