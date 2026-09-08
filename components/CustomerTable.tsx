"use client";
import { useEffect, useState } from "react";
import { Search, X, ServerCrash, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { CustomerWithStatus } from "@/types/customer";

interface CustomerTableProps {
  filter: "all" | "active" | "pending";
}

const PAGE_SIZE = 10;

export default function CustomerTable({ filter }: CustomerTableProps) {
  const [customers, setCustomers] = useState<CustomerWithStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithStatus | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchCustomers = (pageNum: number) => {
    setLoading(true);
    setError(false);

    // seed fixed rakha hai taaki har page pe alag-alag but consistent users aayein
    fetch(`https://randomuser.me/api/?results=${PAGE_SIZE}&page=${pageNum}&seed=dashboard`)
      .then((res) => {
        if (!res.ok) throw new Error("API request failed");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data.results)) throw new Error("Invalid response format");
        const withStatus: CustomerWithStatus[] = data.results.map((c: any, i: number) => ({
          ...c,
          // status ab global index (page ke hisaab se) se stable rahega
          status: (pageNum * PAGE_SIZE + i) % 2 === 0 ? "Registered" : "Pending",
        }));
        setCustomers(withStatus);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Server error:", err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers(page);
  }, [page]);

  // Page change hone par search reset karna better UX hai
  useEffect(() => {
    setSearch("");
  }, [page]);

  const filteredCustomers = customers.filter((c) => {
    const query = search.toLowerCase();
    const fullName = `${c.name.first} ${c.name.last}`.toLowerCase();
    const matchesSearch =
      fullName.includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.location?.city?.toLowerCase().includes(query);

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && c.status === "Registered") ||
      (filter === "pending" && c.status === "Pending");

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-green-700 rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm mt-3">Loading customers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center h-64">
        <ServerCrash className="text-red-400 mb-3" size={40} />
        <p className="text-gray-700 font-medium">Server problem</p>
        <p className="text-gray-400 text-sm mb-4">
          Unable to fetch customer data right now.
        </p>
        <button
          onClick={() => fetchCustomers(page)}
          className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white text-sm rounded-lg hover:bg-green-800 cursor-pointer"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 relative">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
        <div>
          <h3 className="font-semibold text-lg">
            {filter === "all" && "All Customers"}
            {filter === "active" && "Registered Customers"}
            {filter === "pending" && "Pending Customers"}
          </h3>
          <p className="text-green-500 text-xs">
            {filteredCustomers.length} results — Page {page}
          </p>
        </div>
        <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2 w-full sm:w-auto">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="outline-none text-sm bg-transparent w-full"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[0] md:min-w-[600px]">
          <thead>
            <tr className="text-gray-400 text-left border-b">
              <th className="py-2">Customer Name</th>
              <th className="hidden md:table-cell">Phone Number</th>
              <th className="hidden md:table-cell">Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No customer found
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr key={c.login.uuid} className="border-b last:border-0">
                  <td className="py-3 flex items-center gap-2 whitespace-nowrap">
                    <img
                      src={c.picture.thumbnail}
                      alt={c.name.first}
                      className="w-7 h-7 rounded-full"
                    />
                    {c.name.first} {c.name.last}
                  </td>
                  <td className="hidden md:table-cell whitespace-nowrap">{c.phone}</td>
                  <td className="hidden md:table-cell whitespace-nowrap">{c.email}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs border whitespace-nowrap ${
                        c.status === "Registered"
                          ? "bg-green-50 text-green-600 border-green-200"
                          : "bg-red-50 text-red-600 border-red-200"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="px-3 py-1 text-xs bg-green-700 text-white rounded-lg cursor-pointer hover:bg-green-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 cursor-pointer"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <span className="text-sm text-gray-500">Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg border hover:bg-gray-50 cursor-pointer"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm relative">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
            <div className="flex justify-center mb-4">
              <img
                src={selectedCustomer.picture.thumbnail}
                alt={selectedCustomer.name.first}
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-400">Name:</span> {selectedCustomer.name.first} {selectedCustomer.name.last}</p>
              <p><span className="text-gray-400">Email:</span> {selectedCustomer.email}</p>
              <p><span className="text-gray-400">Phone:</span> {selectedCustomer.phone}</p>
              <p><span className="text-gray-400">City:</span> {selectedCustomer.location?.city}</p>
              <p><span className="text-gray-400">Country:</span> {selectedCustomer.location?.country}</p>
              <p><span className="text-gray-400">Status:</span> {selectedCustomer.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}