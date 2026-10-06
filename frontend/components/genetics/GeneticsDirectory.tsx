"use client";

import { useState, useMemo } from "react";
import { CRV_BULLS } from "@/data/bulls";
import BullCard from "./BullCard";
import { Search, SlidersHorizontal } from "lucide-react";

type FilterBreed = "ALL" | "Holstein US" | "Jersey US";
type SortOption = "TPI_DESC" | "MILK_DESC" | "NM_DESC";

export default function GeneticsDirectory() {
  const [search, setSearch] = useState("");
  const [breed, setBreed] = useState<FilterBreed>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("TPI_DESC");

  const filteredBulls = useMemo(() => {
    return CRV_BULLS.filter((bull) => {
      const matchesBreed = breed === "ALL" || bull.breed === breed;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        bull.name.toLowerCase().includes(q) ||
        bull.codeName.toLowerCase().includes(q) ||
        bull.naabCode.toLowerCase().includes(q) ||
        bull.casein.toLowerCase().includes(q);

      return matchesBreed && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "MILK_DESC") {
        return b.production.milkLbs - a.production.milkLbs;
      }
      if (sortBy === "NM_DESC") {
        return b.indexes.netMeritDollars - a.indexes.netMeritDollars;
      }
      return b.indexes.tpiOrJpi - a.indexes.tpiOrJpi;
    });
  }, [search, breed, sortBy]);

  return (
    <div className="space-y-6">
      {/* Control Bar: Search + Filter Tabs + Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 rounded-2xl border border-green-100 bg-white p-3 shadow-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sire name, NAAB code, or A2A2..."
            className="w-full rounded-xl border-green-100 bg-green-50/50 pl-9 pr-4 py-2 text-xs sm:text-sm text-green-900 placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>

        {/* Breed Filter Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-green-50 p-1">
          {(["ALL", "Holstein US", "Jersey US"] as const).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBreed(b)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                breed === b
                  ? "bg-white text-green-800 shadow-xs"
                  : "text-gray-600 hover:text-green-900"
              }`}
            >
              {b === "ALL" ? "All Sires (10)" : b}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5 self-end md:self-auto">
          <SlidersHorizontal className="h-4 w-4 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-lg border-green-100 bg-green-50 py-1.5 pl-2 pr-6 text-xs font-semibold text-gray-700 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
          >
            <option value="TPI_DESC">Highest TPI / JPI</option>
            <option value="MILK_DESC">Highest Milk (lbs)</option>
            <option value="NM_DESC">Highest Net Merit ($)</option>
          </select>
        </div>
      </div>

      {/* Bull Cards Grid */}
      {filteredBulls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBulls.map((bull) => (
            <BullCard key={bull.id} bull={bull} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-green-200 p-12 text-center">
          <p className="text-sm font-semibold text-gray-600">No sires match your filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setBreed("ALL");
            }}
            className="mt-3 text-xs font-bold text-green-700 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}