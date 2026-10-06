"use client";

import { useState } from "react";
import Image from "next/image";
import { Bull } from "@/data/bulls";
import { ChevronDown, ChevronUp, PhoneCall } from "lucide-react";

interface BullCardProps {
  bull: Bull;
}

const bullImages: Record<string, string> = {
  tyrol: "/bulls/tyrol.png",
  mecanico: "/bulls/mecanico.png",
  emacs: "/bulls/emac.png",
  "lamont-p": "/bulls/lamont_p.png",
  howzer: "/bulls/howzer.png",
  tune: "/bulls/tune.png",
  tone: "/bulls/tone.png",
  venito: "/bulls/venito.png",
  fragrant: "/bulls/fragrant.png",
  brandybuck: "/bulls/brandybuck.png",
};

export default function BullCard({ bull }: BullCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const inquiryPhone = "919417700071";
  const inquiryMessage = encodeURIComponent(
    `Hello Khushal FPO, I want to inquire about CRV Semen Straws for Sire: ${bull.name} (NAAB: ${bull.naabCode}).`
  );

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-green-100 bg-white p-5 shadow-xs transition-all duration-200 hover:border-green-500 hover:shadow-md">
      <div>
        <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-green-50">
          <Image
            src={bullImages[bull.id]}
            alt={`${bull.name} bull`}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Top Header: Code Name, Breed Tag & Index */}
        <div className="flex items-start justify-between gap-2 border-b border-green-50 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-green-700">
                {bull.breed}
              </span>
              <span className="rounded bg-green-50 px-1.5 py-0.5 text-[11px] font-mono text-gray-600">
                {bull.naabCode}
              </span>
            </div>
            <h3 className="mt-1 text-lg font-extrabold text-green-900">
              {bull.name}
            </h3>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-semibold text-gray-400 block">
              {bull.indexes.indexType}
            </span>
            <span className="text-lg font-black text-green-600">
              {bull.indexes.tpiOrJpi.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Tags Row */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-green-50 border border-green-200/60 px-2 py-0.5 text-[11px] font-medium text-green-800">
            {bull.casein}
          </span>
          {bull.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Core Specs Grid */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-green-50 p-2.5 text-center text-xs">
          <div>
            <span className="text-gray-400 block text-[10px]">Net Merit</span>
            <span className="font-bold text-green-900">+${bull.indexes.netMeritDollars}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Milk (lbs)</span>
            <span className="font-bold text-green-900">
              {bull.production.milkLbs > 0 ? `+${bull.production.milkLbs}` : bull.production.milkLbs}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Fat / Prot</span>
            <span className="font-bold text-green-900">
              +{bull.production.fatLbs} / +{bull.production.proteinLbs}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <ul className="mt-3 space-y-1 text-xs text-gray-600">
          {bull.keyHighlights.slice(0, 2).map((item, idx) => (
            <li key={idx} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Expandable Technical Drawer */}
        {isExpanded && (
          <div className="mt-4 border-t border-green-50 pt-3 text-xs space-y-2.5 transition-all">
            <div className="rounded-lg border border-green-100/80 p-2.5 bg-green-50/50 space-y-1">
              <p className="text-[11px] text-green-500 font-medium">Pedigree Lineage</p>
              <p className="text-green-900 font-semibold truncate">
                <span className="text-gray-400">Sire:</span> {bull.pedigree.sire}
              </p>
              <p className="text-green-900 font-semibold truncate">
                <span className="text-gray-400">Dam:</span> {bull.pedigree.dam}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-gray-700">
              <div>
                <span className="text-gray-400 block text-[10px]">Productive Life</span>
                <span className="font-semibold">+{bull.indexes.productiveLife} Years</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Fertility Index</span>
                <span className="font-semibold">{bull.indexes.fertilityIndex}</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Udder Composite</span>
                <span className="font-semibold">
                  {bull.conformation.udderComposite > 0
                    ? `+${bull.conformation.udderComposite}`
                    : bull.conformation.udderComposite}
                </span>
              </div>
              <div>
                <span className="text-gray-400 block text-[10px]">Feet & Legs</span>
                <span className="font-semibold">
                  {bull.conformation.feetAndLegs > 0
                    ? `+${bull.conformation.feetAndLegs}`
                    : bull.conformation.feetAndLegs}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-green-50 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-green-500 hover:text-green-900 transition-colors"
        >
          {isExpanded ? "Hide Proofs" : "Full Proofs"}
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <a
          href={`https://wa.me/${inquiryPhone}?text=${inquiryMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-green-700 transition-colors"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Book Straws</span>
        </a>
      </div>
    </article>
  );
}