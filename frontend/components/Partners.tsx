import NetherlandsFlag from "country-flag-icons/react/3x2/NL";
import UnitedStatesFlag from "country-flag-icons/react/3x2/US";

interface Partner {
  id: string;
  name: string;
  country: string;
  flags: readonly ("NL" | "US")[];
  website: string;
  domain: string;
  role: string;
  description: string;
  badge: string;
}

const PARTNERS: readonly Partner[] = [
  {
    id: "crv",
    name: "CRV",
    country: "The Netherlands & USA",
    flags: ["NL", "US"],
    website: "https://www.crv4all.nl",
    domain: "crv4all.nl",
    role: "Imported Bovine Genetics",
    description:
      "World leader in cattle genetics, sexed semen straws, and proven breeding indexes for superior herd longevity and production.",
    badge: "Official Genetics Partner",
  },
  {
    id: "kanters",
    name: "Kanters Animal Health",
    country: "The Netherlands",
    flags: ["NL"],
    website: "https://www.kantersanimalhealth.com",
    domain: "kantersanimalhealth.com",
    role: "Hoof & Claw Health (Exolium®)",
    description:
      "Pioneers of antibiotic-free claw care, Mortellaro prevention protocols, and chelated mineral skin sprays for dairy cattle.",
    badge: "Exclusive Hoof Care Partner",
  },
  {
    id: "denkavit",
    name: "Denkavit",
    country: "The Netherlands",
    flags: ["NL"],
    website: "https://www.denkavit.com",
    domain: "denkavit.com",
    role: "Calf Milk Replacers & Nutrition",
    description:
      "Specialists in premium young animal nutrition and balanced milk replacers to maximize calf growth rates and rumen development.",
    badge: "Specialized Feed Partner",
  },
] as const;

export default function Partners() {
  const flagComponents = {
    NL: NetherlandsFlag,
    US: UnitedStatesFlag,
  } as const;

  return (
    <section
      id="partners"
      aria-label="Global partners"
      className="relative z-10 -mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      {/* Top Banner Tag */}
      <div className="mt-15 mb-4 flex items-center justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-green-800 shadow-xs sm:text-sm">
          <svg
            className="h-4 w-4 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Direct Global Collaborations
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PARTNERS.map((partner) => (
          <article
            key={partner.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-green-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-green-400 hover:shadow-xl"
          >
            <div>
              {/* Header row: Badge + Country Flag */}
              <div className="flex items-center justify-between gap-2 border-b border-green-50 pb-3">
                <span className="rounded-md bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  {partner.badge}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500"
                  title={partner.country}
                >
                  <span className="inline-flex items-center gap-1" aria-hidden="true">
                    {partner.flags.map((countryCode) => {
                      const Flag = flagComponents[countryCode];
                      return (
                        <Flag
                          key={countryCode}
                          className="h-3.5 w-5 rounded-sm object-cover"
                        />
                      );
                    })}
                  </span>
                  <span>{partner.country}</span>
                </span>
              </div>

              {/* Partner Name & Specialty */}
              <div className="mt-4">
                <h3 className="text-xl font-bold tracking-tight text-green-900 group-hover:text-green-700 transition-colors">
                  {partner.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-green-800">
                  {partner.role}
                </p>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
                {partner.description}
              </p>
            </div>

            {/* External Link Action */}
            <div className="mt-6 border-t border-green-50 pt-4">
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit official website of ${partner.name}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition-colors hover:text-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                <span>{partner.domain}</span>
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}