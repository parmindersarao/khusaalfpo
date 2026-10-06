export interface SireProduction {
  milkLbs: number;
  fatLbs: number;
  fatPercent: number;
  proteinLbs: number;
  proteinPercent: number;
}

export interface SireConformation {
  udderComposite: number;
  feetAndLegs: number;
  totalType: number;
}

export interface SireIndexes {
  tpiOrJpi: number;
  indexType: "TPI" | "JPI";
  netMeritDollars: number;
  cheeseMeritDollars: number;
  fertilityIndex: number;
  productiveLife: number;
}

export interface Bull {
  id: string;
  name: string;
  codeName: string;
  breed: "Holstein US" | "Jersey US";
  naabCode: string;
  sireId: string;
  born: string;
  casein: string; // Beta & Kappa Casein
  aAaCode?: string;
  pedigree: {
    sire: string;
    dam: string;
  };
  keyHighlights: string[];
  indexes: SireIndexes;
  production: SireProduction;
  conformation: SireConformation;
  tags: ("A2A2" | "Polled" | "Robot Ready" | "High Fertility" | "Index Topper")[];
}

export const CRV_BULLS: readonly Bull[] = [
  {
    id: "tyrol",
    name: "Aurora Tyrol",
    codeName: "TYROL",
    breed: "Holstein US",
    naabCode: "097H042788",
    sireId: "US 3237112600",
    born: "04/08/2021",
    casein: "A2A2 / Kappa AB",
    aAaCode: "234156",
    pedigree: {
      sire: "Siemers Renegade Parfect",
      dam: "Aurora Eisaku 22100",
    },
    keyHighlights: ["High Type (+1.57)", "Positive Teat Length", "High Daughter Fertility"],
    indexes: {
      tpiOrJpi: 3237,
      indexType: "TPI",
      netMeritDollars: 536,
      cheeseMeritDollars: 570,
      fertilityIndex: 105,
      productiveLife: 3.0,
    },
    production: {
      milkLbs: 950,
      fatLbs: 62,
      fatPercent: 0.08,
      proteinLbs: 52,
      proteinPercent: 0.08,
    },
    conformation: {
      udderComposite: 0.65,
      feetAndLegs: 1.28,
      totalType: 1.57,
    },
    tags: ["A2A2", "High Fertility", "Index Topper"],
  },
  {
    id: "mecanico",
    name: "Peak Mecanico",
    codeName: "MECANICO",
    breed: "Holstein US",
    naabCode: "097H042852",
    sireId: "US 3247843199",
    born: "08/02/2022",
    casein: "A1A2 / Kappa BB",
    aAaCode: "243651",
    pedigree: {
      sire: "Peak Altakevlow",
      dam: "Peak Mecca",
    },
    keyHighlights: ["Index Topper (TPI 3,190)", "Exceptional Productive Life (+3.5)", "Great Efficiency (+16%)"],
    indexes: {
      tpiOrJpi: 3190,
      indexType: "TPI",
      netMeritDollars: 929,
      cheeseMeritDollars: 984,
      fertilityIndex: 106,
      productiveLife: 3.5,
    },
    production: {
      milkLbs: 91,
      fatLbs: 91,
      fatPercent: 0.33,
      proteinLbs: 40,
      proteinPercent: 0.14,
    },
    conformation: {
      udderComposite: -0.05,
      feetAndLegs: -0.64,
      totalType: -0.45,
    },
    tags: ["Index Topper", "High Fertility"],
  },
  {
    id: "emacs",
    name: "Pine Tree Emacs",
    codeName: "EMACS",
    breed: "Holstein US",
    naabCode: "097H042917",
    sireId: "US 3250267114",
    born: "26/08/2022",
    casein: "A2A2 / Kappa AB",
    aAaCode: "423561",
    pedigree: {
      sire: "Winstar Zazzle 3171",
      dam: "Pine-Tree 7593 Purs 8418",
    },
    keyHighlights: ["Positive Teat Length (+0.78)", "Long Lasting Daughters (PL +4.5)", "High Efficiency (+20%)"],
    indexes: {
      tpiOrJpi: 3152,
      indexType: "TPI",
      netMeritDollars: 784,
      cheeseMeritDollars: 813,
      fertilityIndex: 109,
      productiveLife: 4.5,
    },
    production: {
      milkLbs: 528,
      fatLbs: 56,
      fatPercent: 0.13,
      proteinLbs: 33,
      proteinPercent: 0.05,
    },
    conformation: {
      udderComposite: 0.45,
      feetAndLegs: 0.74,
      totalType: 0.56,
    },
    tags: ["A2A2", "High Fertility"],
  },
  {
    id: "lamont-p",
    name: "Wesselcrest Lamont P",
    codeName: "LAMONT P",
    breed: "Holstein US",
    naabCode: "097H042974",
    sireId: "US 3244387116",
    born: "04/10/2022",
    casein: "Polled / A2A2",
    pedigree: {
      sire: "Peak High Energy",
      dam: "Wesselcrest Lime Lambry",
    },
    keyHighlights: ["Naturally Polled Genetics", "High Udder Composite (+1.16)", "Desirable Milking Speed & Temperament"],
    indexes: {
      tpiOrJpi: 3135,
      indexType: "TPI",
      netMeritDollars: 594,
      cheeseMeritDollars: 636,
      fertilityIndex: 109,
      productiveLife: 2.6,
    },
    production: {
      milkLbs: 293,
      fatLbs: 67,
      fatPercent: 0.21,
      proteinLbs: 40,
      proteinPercent: 0.11,
    },
    conformation: {
      udderComposite: 1.16,
      feetAndLegs: 0.06,
      totalType: 0.85,
    },
    tags: ["Polled", "A2A2", "Robot Ready"],
  },
  {
    id: "howzer",
    name: "AOT Howzer",
    codeName: "HOWZER",
    breed: "Holstein US",
    naabCode: "097H042885",
    sireId: "US 3254482704",
    born: "28/06/2022",
    casein: "A1A2 / Kappa AB",
    aAaCode: "321456",
    pedigree: {
      sire: "Progenesis Grandmaster",
      dam: "AOT Austad Hindu",
    },
    keyHighlights: ["Quintessential Udder Composition", "Balanced Health & Efficiency (+15%)", "Fertility 109"],
    indexes: {
      tpiOrJpi: 3098,
      indexType: "TPI",
      netMeritDollars: 686,
      cheeseMeritDollars: 730,
      fertilityIndex: 109,
      productiveLife: 3.0,
    },
    production: {
      milkLbs: 167,
      fatLbs: 58,
      fatPercent: 0.19,
      proteinLbs: 34,
      proteinPercent: 0.11,
    },
    conformation: {
      udderComposite: 0.70,
      feetAndLegs: -0.33,
      totalType: 0.68,
    },
    tags: ["High Fertility"],
  },
  {
    id: "tune",
    name: "Ladys Manor Tune",
    codeName: "TUNE",
    breed: "Holstein US",
    naabCode: "097H042717",
    sireId: "US 3238997219",
    born: "13/07/2021",
    casein: "A1A2 / Kappa AB",
    aAaCode: "234165",
    pedigree: {
      sire: "Ladys-Manor Outcome",
      dam: "Ladys-Manor Alphabt Tuba",
    },
    keyHighlights: ["Fertility at Forefront (Positive DPR, HCR, CCR)", "Balanced Health (+4%) & Efficiency (+11%)"],
    indexes: {
      tpiOrJpi: 3026,
      indexType: "TPI",
      netMeritDollars: 471,
      cheeseMeritDollars: 511,
      fertilityIndex: 106,
      productiveLife: 1.6,
    },
    production: {
      milkLbs: 354,
      fatLbs: 54,
      fatPercent: 0.15,
      proteinLbs: 40,
      proteinPercent: 0.11,
    },
    conformation: {
      udderComposite: 0.53,
      feetAndLegs: -0.19,
      totalType: 0.68,
    },
    tags: ["High Fertility"],
  },
  {
    id: "tone",
    name: "Ladys Manor Tone",
    codeName: "TONE",
    breed: "Holstein US",
    naabCode: "097H042718",
    sireId: "US 3238997220",
    born: "13/07/2021",
    casein: "A1A2 / Kappa AB",
    aAaCode: "351426",
    pedigree: {
      sire: "Ladys-Manor Outcome",
      dam: "Ladys-Manor Alphabt Tuba",
    },
    keyHighlights: ["Durable Udders (+0.73)", "Moderate Stature with Persistency", "High Feed Efficiency (111)"],
    indexes: {
      tpiOrJpi: 3009,
      indexType: "TPI",
      netMeritDollars: 541,
      cheeseMeritDollars: 569,
      fertilityIndex: 108,
      productiveLife: 2.1,
    },
    production: {
      milkLbs: 559,
      fatLbs: 50,
      fatPercent: 0.10,
      proteinLbs: 36,
      proteinPercent: 0.07,
    },
    conformation: {
      udderComposite: 0.73,
      feetAndLegs: -0.10,
      totalType: 0.66,
    },
    tags: ["High Fertility"],
  },
  {
    id: "venito",
    name: "Progenesis Venito",
    codeName: "VENITO",
    breed: "Holstein US",
    naabCode: "097H042267",
    sireId: "CA 13269232",
    born: "29/10/2018",
    casein: "A1A2 / Kappa BB",
    aAaCode: "432516",
    pedigree: {
      sire: "Sandy-Valley Challenger",
      dam: "England-Ammon TM",
    },
    keyHighlights: ["Robot Milking Specialist (107)", "Compact Body with Strong Wide Udders", "High Fertility (109)"],
    indexes: {
      tpiOrJpi: 2793,
      indexType: "TPI",
      netMeritDollars: 307,
      cheeseMeritDollars: 323,
      fertilityIndex: 109,
      productiveLife: 3.6,
    },
    production: {
      milkLbs: 112,
      fatLbs: 6,
      fatPercent: 0.01,
      proteinLbs: 14,
      proteinPercent: 0.04,
    },
    conformation: {
      udderComposite: 0.49,
      feetAndLegs: -0.59,
      totalType: -0.12,
    },
    tags: ["Robot Ready", "High Fertility"],
  },
  {
    id: "fragrant",
    name: "Bush Bros Fragrant",
    codeName: "FRAGRANT",
    breed: "Holstein US",
    naabCode: "097H042355",
    sireId: "US 3205149655",
    born: "12/05/2019",
    casein: "A1A2 / Kappa AB",
    aAaCode: "432156",
    pedigree: {
      sire: "Bomaz Altacabot",
      dam: "840003141559101-ET",
    },
    keyHighlights: ["Calving Ease Specialist (SCE 0.9%)", "Profitable Through Multiple Lactations", "Hoof Health (105)"],
    indexes: {
      tpiOrJpi: 2782,
      indexType: "TPI",
      netMeritDollars: 325,
      cheeseMeritDollars: 365,
      fertilityIndex: 103,
      productiveLife: 2.6,
    },
    production: {
      milkLbs: -533,
      fatLbs: 24,
      fatPercent: 0.18,
      proteinLbs: 9,
      proteinPercent: 0.10,
    },
    conformation: {
      udderComposite: 0.66,
      feetAndLegs: 0.21,
      totalType: -0.07,
    },
    tags: ["High Fertility"],
  },
  {
    id: "brandybuck",
    name: "Ahlem Brandybuck",
    codeName: "BRANDYBUCK",
    breed: "Jersey US",
    naabCode: "097JE00226",
    sireId: "US 3213754260",
    born: "25/01/2022",
    casein: "A2A2 / Kappa BB",
    aAaCode: "342516",
    pedigree: {
      sire: "TOG Orbicularis",
      dam: "JX Ahlem Harris Baltazar",
    },
    keyHighlights: ["Elite Purebred Jersey US Lineage", "High Milk Component Gain (+31 lbs Protein)", "Manages Cow Height Without Losing Strength"],
    indexes: {
      tpiOrJpi: 114,
      indexType: "JPI",
      netMeritDollars: 241,
      cheeseMeritDollars: 267,
      fertilityIndex: 103,
      productiveLife: 1.8,
    },
    production: {
      milkLbs: 465,
      fatLbs: 14,
      fatPercent: -0.05,
      proteinLbs: 31,
      proteinPercent: 0.07,
    },
    conformation: {
      udderComposite: 13.11, // JUI for Jersey
      feetAndLegs: 0.00,
      totalType: 0.40,
    },
    tags: ["A2A2"],
  },
] as const;