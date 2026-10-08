import { useEffect, useState } from "react";
import { Trash2, Search, Filter } from "lucide-react";
import api from "../services/api";

const AdminPortfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  const fetchPortfolios = async () => {
    try {
      const response = await api.get("/portfolios/admin/all");
      setPortfolios(response.data.data.portfolios);
    } catch (error) {
      console.error("Failed to fetch portfolios", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const handleDelete = async () => {
    if (!selectedPortfolio) return;

    try {
      await api.delete(
        `/portfolios/admin/${selectedPortfolio._id}`
      );

      setPortfolios((prev) =>
        prev.filter(
          (portfolio) =>
            portfolio._id !== selectedPortfolio._id
        )
      );

      setSelectedPortfolio(null);
    } catch (error) {
      console.error("Failed to remove portfolio", error);
    }
  };

  const filteredPortfolios = portfolios.filter((portfolio) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      portfolio.title?.toLowerCase().includes(searchText) ||
      portfolio.userId?.name?.toLowerCase().includes(searchText) ||
      portfolio.userId?.email?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      portfolio.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="text-sm text-gray-500">
        Loading portfolios...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-[#18212f]">
          Portfolio Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Review and manage user portfolios.
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
            placeholder="Search by title, owner or email..."
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
            <option value="all">All Portfolios</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Portfolio Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#faf9f6] border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Title
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Owner
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
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
              {filteredPortfolios.length > 0 ? (
                filteredPortfolios.map((portfolio) => (
                  <tr
                    key={portfolio._id}
                    className="border-b border-gray-100 last:border-0 hover:bg-[#fcfcfa] transition"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-[#18212f]">
                      {portfolio.title}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {portfolio.userId?.name || "Unknown"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {portfolio.userId?.email || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          portfolio.status === "published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {portfolio.status === "published"
                          ? "Published"
                          : "Draft"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() =>
                          setSelectedPortfolio(portfolio)
                        }
                        className="inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition"
                      >
                        <Trash2 size={16} />
                        Remove
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
                    No portfolios found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedPortfolio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
          <div className="w-full max-w-md rounded-xl bg-white border border-gray-200 shadow-xl p-6">
            <h2 className="text-lg font-semibold text-[#18212f]">
              Remove Portfolio
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Are you sure you want to remove{" "}
              <span className="font-medium text-gray-900">
                {selectedPortfolio.title}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-red-500">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedPortfolio(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolios;