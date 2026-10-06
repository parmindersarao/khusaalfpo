import type { Metadata } from "next";
import GeneticsDirectory from "@/components/genetics/GeneticsDirectory";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ShieldCheck, Snowflake, Dna } from "lucide-react";

export const metadata: Metadata = {
  title: "Imported Bovine Genetics & CRV Sires | Khushal FPO",
  description:
    "Official CRV Netherlands & USA bovine genetics catalog available in India. Conventional and sexed semen straws for elite Holstein and Jersey sires.",
};

export default function GeneticsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-green-50/40 pb-20">
      {/* Hero Banner */}
      <section className="border-b border-green-100 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">
                <Dna className="w-3.5 h-3.5 text-green-600" />
                CRV Netherlands & USA Official Lineup
              </div>
              <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-green-900">
                Imported Bovine Genetics & Sire Directory
              </h1>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm text-gray-600 leading-relaxed">
                Empowering progressive Indian dairy producers with world-class Holstein and Jersey
                bloodlines. High TPI proofs, A2A2 beta-casein, enhanced daughter fertility, and
                durable udders[cite: 1, 26].
              </p>
            </div>

            {/* Catalog Download CTA */}
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <a
                href="/docs/CRV_USA_2026_AVAILABLE_BULL_IN_INDIA.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-green-800 transition-colors"
              >
                <Download className="w-4 h-4 text-green-200" />
                <span>Download CRV Proofs (PDF)</span>
              </a>
            </div>
          </div>

          {/* Quick Assurance Badges */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-green-100 pt-6">
            <div className="flex items-center gap-2.5 text-xs text-gray-600">
              <Snowflake className="w-4 h-4 text-green-600 shrink-0" />
              <span>-196°C Liquid Nitrogen Quarantine Cold Chain</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-600">
              <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
              <span>Authentic CDCB Genetic Evaluations</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-600">
              <Dna className="w-4 h-4 text-green-600 shrink-0" />
              <span>Sexed & Conventional Semen Straws</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filterable Sire Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <GeneticsDirectory />
      </section>

      {/* AI Advisory & Insemination Support Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-14">
        <div className="rounded-2xl border border-green-200 bg-green-50/70 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-green-900">
              Need Field Advisory or Estrus Synchronization Protocols?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-2xl">
              Khushal FPO veterinary teams assist members with estrus timing, cryogenic semen handling,
              and Artificial Insemination (AI) scheduling across Punjab and neighboring regions[cite: 1].
            </p>
          </div>
          <a href="https://wa.me/919417700071?text=Hello%20Khushal%20FPO,%20I%20need%20veterinary%20advisory%20for%20AI%20protocols"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-green-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-green-800 transition-colors shrink-0"
          >
            Contact Veterinary Field Officer
          </a>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}