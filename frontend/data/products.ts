export interface Product {
  id: string;
  name: string;
  brand: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  pdfUrl: string;
  pdfFileName: string;
  packaging: string[];
  advantages: string[];
  applicationSteps: string[];
  activeIngredients: string;
  dosage: string;
}

export const PRODUCTS: readonly Product[] = [
  {
    id: "maxistart",
    name: "Denkamilk Maxistart",
    brand: "Denkavit",
    badge: "Calf Nutrition",
    shortDesc:
      "Dairy nutrition supplement that supports early rumen development, feed intake, digestion, and steady calf growth.",
    fullDesc:
      "Denkamilk Maxistart supports young calves during early rumen development with balanced nutrition designed to improve feed intake, digestion, and consistent growth.",
    image: "/products/Bag-Denkamilk-Maxistart.webp",
    pdfUrl: "",
    pdfFileName: "",
    packaging: ["Denkamilk Maxistart Feed"],
    advantages: [
      "Supports early rumen development",
      "Helps improve feed intake and digestion",
      "Promotes steady calf growth",
    ],
    applicationSteps: [],
    activeIngredients: "Dairy nutrition blend",
    dosage: "Use according to veterinary or nutritionist guidance",
  },
  {
    id: "exolium-skin-spray",
    name: "Exolium® Skin Protection Spray",
    brand: "Kanters Animal Health (The Netherlands)",
    badge: "Air Pressure 360°",
    shortDesc:
      "Nourishing chelated copper and zinc spray for claws and skin with unique cooling oils. Antibiotic and propellant-free.",
    fullDesc:
      "Exolium Skin protection spray is an innovative care spray based on copper and zinc chelates and natural oils. Delivered in an air-pressure can that sprays in all positions (even upside down), it penetrates deeply into the skin, keeping it soft, supple, and cool with zero risk of antibiotic resistance.",
    image: "/products/Packshot-Exolium-Skin-protection-spray.png",
    pdfUrl: "/docs/Kanters_Exolium-Skin-Protection-Spray-GB-HQ.pdf",
    pdfFileName: "Kanters_Exolium-Skin-Protection-Spray.pdf",
    packaging: ["250 ml Air-Pressure Spray Can"],
    advantages: [
      "Sprays in all 360° positions, even upside down",
      "Contains almost 5x more active product than propellant aerosols",
      "100% free of antibiotics, formalin, and copper sulphate",
      "Deep skin penetration; keeps skin cool and elastic",
      "Safe for animals, users, and the farm environment",
    ],
    applicationSteps: [
      "Shake the spray can thoroughly before use.",
      "Clean loose dirt from the claw or affected skin area.",
      "Spray directly onto the claw or skin for 1–2 seconds from a distance of 15–20 cm.",
      "Use during general herd skin care and immediately after routine hoof trimming.",
    ],
    activeIngredients: "Copper chelates, Zinc chelates, specialized cooling plant oils",
    dosage: "1–2 second targeted spray application per claw/wound",
  },
  {
    id: "exolium-hoofclear",
    name: "Exolium® Hoofclear",
    brand: "Kanters Animal Health (The Netherlands)",
    badge: "Adheres to Wet Claws",
    shortDesc:
      "Concentrated liquid with special adhesive binder for wet claws. Ideal for group treatment in feeding fences and milking parlors.",
    fullDesc:
      "Exolium Hoofclear is an antibiotic-free claw care solution formulated with copper and zinc chelates. It features a unique binder allowing it to stick securely to wet claws even after contact with manure, delivering visible recovery within 5 days.",
    image: "/products/hoofclear.png",
    pdfUrl: "/docs/Brochure-Exolium-Hoofclear-Ruminants-GB-HQ.pdf",
    pdfFileName: "Exolium-Hoofclear-Brochure.pdf",
    packaging: ["1 Litre Bottle", "10 Litres Can", "200 Litres Drum"],
    advantages: [
      "Specially formulated binder adheres strongly to wet claws",
      "Lasting antibacterial protection even after contact with manure",
      "1 Litre concentrates enough solution to treat 80 to 200 claws",
      "Visible recovery results within 5 days",
      "Effective at all temperatures; zero resistance build-up",
    ],
    applicationSteps: [
      "Secure animals in the feeding fence or treat directly in the milking shed.",
      "Spray-clean claws and the slatted floor with clean water.",
      "Prepare solution: 50% Hoofclear + 50% water for intensive care; 20% Hoofclear + 80% water for preventive use.",
      "Pressurize sprayer with a strong, bundled jet (do not atomize/nebulize).",
      "Spray front and back of the claw. Allow animals to stand dry for several minutes.",
      "Treat for 2 consecutive days; repeat every 7 to 14 days based on farm infection pressure.",
    ],
    activeIngredients: "Copper chelates, Zinc chelates, organic acids, claw-adhesion binder",
    dosage: "20% preventive dilution or 50% intensive dilution",
  },
  {
    id: "exolium-hoofgel",
    name: "Exolium® Hoofgel",
    brand: "Kanters Animal Health (The Netherlands)",
    badge: "Results in 5 Days",
    shortDesc:
      "Targeted intensive gel combining copper/zinc chelates and tea tree oil for individual claw trimming and Mortellaro lesions.",
    fullDesc:
      "With over 20 years of clinical farm use in Europe, Exolium Hoofgel is the benchmark individual claw treatment. Designed for targeted application after claw trimming, its potent blend of chelated minerals and tea tree oil provides deep penetration, exceptional adhesion, and rapid 5-day tissue recovery without antibiotics.",
    image: "/products/hoofgel.png",
    pdfUrl: "/docs/Brochure-Exolium-Hoofgel-Ruminants-GB-HQ.pdf",
    pdfFileName: "Exolium-Hoofgel-Brochure.pdf",
    packaging: [
      "100 ml Jar (±15 claws, brush included)",
      "300 ml Jar (±37 claws, brush included)",
      "300 ml Tube (±37 claws)",
      "1000 ml Jar (±125 claws, brush included)",
    ],
    advantages: [
      "Exceptional adhesion to horn, skin, and interdigital space",
      "Tea tree oil provides natural antibacterial and antifungal power",
      "Free of antibiotics and formalin; no milk withholding required",
      "Visible healing of Mortellaro lesions within 5 days",
      "Dirt-resistant formulation works consistently across all temperatures",
    ],
    applicationSteps: [
      "Secure cow safely in the hoof trimming crush/box.",
      "Trim the claw thoroughly and pare away all loose and diseased horn.",
      "Thoroughly clean and dry the claw and the interdigital space.",
      "Apply a generous, well-covering layer of Exolium Hoofgel with the application brush.",
      "For severe M2 ulcers or wound infections, tape the claw with Hooftape for 2 to 5 days, remove, and reapply.",
    ],
    activeIngredients: "Copper chelates, Zinc chelates, pure Tea Tree Oil",
    dosage: "Generous topical layer applied directly via brush",
  },
  {
    id: "exolium-hoofmix",
    name: "Exolium® Hoofmix",
    brand: "Kanters Animal Health (The Netherlands)",
    badge: "Formalin Alternative",
    shortDesc:
      "Highly concentrated footbath solution of copper chelates and cleaning detergents for whole-herd claw infection prevention.",
    fullDesc:
      "Exolium Hoofmix is the modern, safe alternative to toxic formalin and copper sulphate footbaths. Combining dirt-penetrating detergents with chelated copper and organic acids, it rapidly drops bath pH and ensures strong adhesion so more cows can be safely treated with a low chemical concentration.",
    image: "/products/hoofmix.png",
    pdfUrl: "/docs/Leaflet-Exolium-Hoofmix-Ruminants-GB-HQ.pdf",
    pdfFileName: "Exolium-Hoofmix-Leaflet.pdf",
    packaging: ["20 Litres Can", "230 Litres Drum", "1000 Litres IBC"],
    advantages: [
      "Completely replaces carcinogenic formalin and harsh copper sulphate",
      "Concentrated formula rapidly achieves necessary pH drop in footbaths",
      "Integrated detergents clean the claw so chelates penetrate deeply",
      "Effective even in cold winter water temperatures",
      "Zero harmful inhalation hazard; dust-free and safe for farm staff",
    ],
    applicationSteps: [
      "Ensure the footbath has a minimum volume of 150 liters (1 liter per cow).",
      "Pre-wash claws with water if possible to maximize solution longevity.",
      "Dose Hoofmix at 3% (ranging from 2% for maintenance up to 5% under high infection pressure).",
      "Walk the herd through the footbath on 2 consecutive days.",
      "Repeat every 1 to 2 weeks as part of the Exolium herd prevention protocol.",
    ],
    activeIngredients: "Copper chelates, organic acids, cleaning detergents",
    dosage: "3% footbath solution (range: 2% to 5%)",
  },
] as const;