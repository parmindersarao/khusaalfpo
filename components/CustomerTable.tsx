"use client";
import { useEffect, useState } from "react";
import { Search, X, ServerCrash, RefreshCw } from "lucide-react";
import { CustomerWithStatus } from "@/types/customer";

interface CustomerTableProps {
  filter: "all" | "active" | "pending";
}

export default function CustomerTable({ filter }: CustomerTableProps) {
  const [customers, setCustomers] = useState<CustomerWithStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithStatus | null>(null);

  const fetchCustomers = () => {
    setLoading(true);
    setError(false);

    fetch("https://randomuser.me/api/?reslts=200")
      .then((res) => {
        if (!res.ok) throw new Error("API request failed");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data.results)) throw new Error("Invalid response format");
        // Har customer ko ek stable status assign karo (index ke hisaab se, ek hi baar)
        const withStatus: CustomerWithStatus[] = data.results.map((c: any, i: number) => ({
          ...c,
          status: i % 2 === 0 ? "Active" : "Pending",
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
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((c) => {
    const query = search.toLowerCase();
    const fullName = `${c.name.first} ${c.name.last}`.toLowerCase();
    const matchesSearch =
      fullName.includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.location?.city?.toLowerCase().includes(query);

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && c.status === "Active") ||
      (filter === "pending" && c.status === "Pending");

    return matchesSearch && matchesFilter;
  });

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-green-700 rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm mt-3">Loading customers...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center h-64">
        <ServerCrash className="text-red-400 mb-3" size={40} />
        <p className="text-gray-700 font-medium">Server problem</p>
        <p className="text-gray-400 text-sm mb-4">
          Unable to fetch customer data right now.
        </p>
        <button
          onClick={fetchCustomers}
          className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white text-sm rounded-lg hover:bg-green-700"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-semibold text-lg">
            {filter === "all" && "All Customers"}
            {filter === "active" && "Active Customers"}
            {filter === "pending" && "Pending Customers"}
          </h3>
          <p className="text-green-500 text-xs">
            {filteredCustomers.length} results
          </p>
        </div>
        <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="outline-none text-sm bg-transparent"
          />
        </div>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 text-left border-b">
            <th className="py-2">Customer Name</th>
            <th>Phone Number</th>
            <th>Email</th>
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
                <td className="py-3 flex items-center gap-2">
                  <img
                    src={c.picture.thumbnail}
                    alt={c.name.first}
                    className="w-7 h-7 rounded-full"
                  />
                  {c.name.first} {c.name.last}
                </td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs border ${
                      c.status === "Active"
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
                    className="px-3 py-1 text-xs bg-green-700 text-white rounded-lg cursor-pointer hover:bg-green-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 relative">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
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