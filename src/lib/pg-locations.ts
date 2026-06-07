import single from "@/assets/room-single.jpg";
import twin from "@/assets/room-twin.jpg";
import lounge from "@/assets/room-lounge.jpg";
import kitchen from "@/assets/room-kitchen.jpg";
import bath from "@/assets/room-bath.jpg";
import hero from "@/assets/hero-room.jpg";

export interface PgLandmark {
  name: string;
  type: "Station" | "Metro" | "Mall" | "Office" | "College" | "Hospital";
  distanceKm: number;
  minutes: number;
}

export interface PgRoomCard {
  type: string;
  sharing: string;
  priceFrom: number;
  gender: "boys" | "girls" | "any";
  image: string;
  amenities: string[];
  available: number;
}

export interface PgFaq {
  q: string;
  a: string;
}

export interface PgServiceArea {
  name: string;
  href: string;
  description: string;
  badge?: string;
}

export interface PgServiceAreaGroup {
  title: string;
  slug: string;
  href: string;
  areas: string[];
}

export interface PgLocationData {
  slug: string; // "pg-in-malad-east"
  area: string; // "Malad East"
  city: string; // "Mumbai"
  headline: string;
  subheadline: string;
  startingRent: number;
  propertyCount: number;
  residentCount: number;
  googleRating: number;
  googleReviews: number;
  station: string;
  pincode: string;
  intro: string;
  whyStay: string[];
  landmarks: PgLandmark[];
  boys: PgRoomCard[];
  girls: PgRoomCard[];
  gallery: { src: string; alt: string }[];
  testimonials: { name: string; role: string; rating: number; text: string }[];
  serviceAreas?: PgServiceArea[];
  seoBlocks: { title: string; body: string }[];
  faqs: PgFaq[];
  mapQuery: string;
}

export type LocationPageType = "main-area" | "sub-area";

export interface LocationPageInheritance {
  parentSlug: string;
  inheritedFields: Array<keyof PgLocationData>;
  overriddenFields: Array<keyof PgLocationData>;
}

export interface LocationPageData extends PgLocationData {
  pageType: LocationPageType;
  mainAreaSlug: string;
  mainArea: string;
  parentSlug?: string;
  parentArea?: string;
  childSlugs: string[];
  inheritance?: LocationPageInheritance;
}

const galleryShared = [
  { src: hero, alt: "Premium AC bedroom" },
  { src: single, alt: "Single sharing room" },
  { src: twin, alt: "Double sharing room" },
  { src: lounge, alt: "Community lounge" },
  { src: kitchen, alt: "Dining and kitchen area" },
  { src: bath, alt: "Modern washroom" },
];

const baseBoys = (priceFrom: number): PgRoomCard[] => [
  {
    type: "Single AC Room",
    sharing: "Single",
    priceFrom: priceFrom + 4500,
    gender: "boys",
    image: single,
    amenities: ["AC", "WiFi", "Cupboard"],
    available: 2,
  },
  {
    type: "Double Sharing",
    sharing: "Double",
    priceFrom: priceFrom + 1500,
    gender: "boys",
    image: twin,
    amenities: ["AC", "WiFi", "Housekeeping", "Meals"],
    available: 4,
  },
  {
    type: "Triple Sharing",
    sharing: "Triple",
    priceFrom: priceFrom,
    gender: "boys",
    image: kitchen,
    amenities: ["WiFi", "Housekeeping", "Meals", "Laundry"],
    available: 3,
  },
];

const baseGirls = (priceFrom: number): PgRoomCard[] => [
  {
    type: "Single AC Room",
    sharing: "Single",
    priceFrom: priceFrom + 5000,
    gender: "girls",
    image: bath,
    amenities: ["AC", "WiFi", "CCTV", "Cupboard"],
    available: 1,
  },
  {
    type: "Double Sharing",
    sharing: "Double",
    priceFrom: priceFrom + 2000,
    gender: "girls",
    image: twin,
    amenities: ["AC", "WiFi", "CCTV", "Housekeeping", "Meals"],
    available: 3,
  },
  {
    type: "Triple Sharing",
    sharing: "Triple",
    priceFrom: priceFrom + 500,
    gender: "girls",
    image: lounge,
    amenities: ["WiFi", "CCTV", "Housekeeping", "Meals"],
    available: 5,
  },
];

const seoBlocksFor = (area: string): { title: string; body: string }[] => [
  {
    title: `Boys PG in ${area}`,
    body: `Premium Boys PGs in ${area} with fully furnished AC and non-AC rooms, high-speed WiFi, housekeeping, hot meals and 24x7 security. Ideal for working professionals and students looking for a hassle-free, brokerage-free stay.`,
  },
  {
    title: `Girls PG in ${area}`,
    body: `Comfort-focused Girls PGs in ${area} with CCTV surveillance, biometric entry, wardens on duty, daily housekeeping and nutritious meals. Designed to make working women and female students feel at home.`,
  },
  {
    title: `AC PG in ${area}`,
    body: `Fully air-conditioned rooms in ${area} with quality mattresses, wardrobes and dedicated power backup. Each room is move-in ready — bring your bag and start living premium.`,
  },
  {
    title: `Furnished PG in ${area}`,
    body: `Every MyRoomiee PG in ${area} comes pre-furnished with bed, mattress, wardrobe, fan and AC. Common areas include refrigerator, microwave, water purifier and washing machine.`,
  },
  {
    title: `PG near ${area} Station`,
    body: `Most of our ${area} properties are within walking distance of the railway station and metro, with quick access to corporate hubs, malls and colleges across western Mumbai.`,
  },
  {
    title: `PG for Working Professionals`,
    body: `Quiet study/work zones, fast WiFi, flexible meal timings, weekly housekeeping and secure 24x7 entry — built for professionals who value time and comfort.`,
  },
  {
    title: `PG for Students`,
    body: `Affordable triple and double sharing options near top colleges in ${area}, with meals, laundry, a community of like-minded residents.`,
  },
];

const baseFaqs = (area: string, rent: number): PgFaq[] => [
  {
    q: `What is the rent of PG in ${area}?`,
    a: `Rent at MyRoomiee PGs in ${area} starts from ₹${rent.toLocaleString("en-IN")} per month for triple sharing and goes up to ₹${(rent + 5500).toLocaleString("en-IN")} for premium single AC rooms. All-inclusive — no brokerage.`,
  },
  {
    q: "Is WiFi included in the rent?",
    a: "Yes. High-speed Wi-Fi is included in every MyRoomiee PG along with electricity (within fair-use limits), housekeeping and meals.",
  },
  {
    q: "Is daily housekeeping available?",
    a: "Yes — bedrooms are cleaned on alternate days and common areas daily by professional housekeeping staff.",
  },
  {
    q: "Do you provide AC rooms?",
    a: "Yes, we offer both AC and non-AC rooms. AC rooms are available in single, double and triple sharing formats.",
  },
  {
    q: "Is there CCTV security?",
    a: "Every MyRoomiee property has 24x7 CCTV across entry, exits and common areas, plus biometric/keycard entry on most properties.",
  },
  {
    q: `Do you have Girls PG in ${area}?`,
    a: `Yes, we have dedicated Girls PGs in ${area} with wardens, CCTV, biometric entry and resident-focused access rules.`,
  },
  {
    q: "Is there a brokerage or hidden charge?",
    a: "No. MyRoomiee is a zero-brokerage brand. You pay only the refundable security deposit and monthly rent.",
  },
  {
    q: "Can I book a visit before paying?",
    a: "Yes — free property visits, no commitment. Book a slot via the Book Visit button, WhatsApp or call us directly.",
  },
];

export const locationSlugFromArea = (area: string) =>
  `pg-in-${area
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;

const normalizeAreaKey = (area: string) => area.toLowerCase().replace(/[^a-z0-9]+/g, "");

const validateServiceAreaGroups = (groups: PgServiceAreaGroup[]) => {
  const seen = new Map<string, string>();

  groups.forEach((group) => {
    group.areas.forEach((area) => {
      const key = normalizeAreaKey(area);
      const previousParent = seen.get(key);
      if (previousParent) {
        throw new Error(
          `Duplicate service sub-area "${area}" in ${previousParent} and ${group.title}`,
        );
      }
      seen.set(key, group.title);
    });
  });

  return groups;
};

export const pgServiceAreaGroups = validateServiceAreaGroups([
  {
    title: "Malad East",
    slug: "pg-in-malad-east",
    href: "/pg-in-malad-east",
    areas: [
      "Triveni Nagar",
      "Pushpa Park",
      "Dindoshi",
      "Bandongri",
      "Kurar Village",
      "Pathanwadi",
      "Pimpripada",
      "Kokanipada",
      "Suchidham",
      "Mahindra Nagar",
      "Mira Nagar",
      "Shivaji Nagar",
      "Sanjay Nagar",
      "Hanuman Nagar",
      "Upper Govind Nagar",
      "Lower Govind Nagar",
      "Rani Sati Nagar",
      "Appa Pada",
      "Gokuldham Colony",
      "Film City Road Area",
      "Gen AK Vaidya Marg Area",
      "Santosh Nagar",
      "Tanaji Nagar",
      "Raheja Township",
      "Ashoka Nagar",
    ],
  },
  {
    title: "Malad West",
    slug: "pg-in-malad-west",
    href: "/pg-in-malad-west",
    areas: [
      "Orlem",
      "Evershine Nagar",
      "Liberty Garden",
      "Chincholi Bunder",
      "Malvani",
      "Kanchpada",
      "Mith Chowki",
      "Jankalyan Nagar",
      "Marve Road",
      "Sunder Nagar",
      "Adarsh Nagar",
      "Ambujwadi",
      "Sai Nagar",
      "Somwari Bazaar",
      "Mamledarwadi",
      "Mindspace",
      "Dahanukar Wadi",
      "Ram Nagar",
      "Azad Nagar",
      "MHB Colony",
    ],
  },
  {
    title: "Goregaon East",
    slug: "pg-in-goregaon-east",
    href: "/pg-in-goregaon-east",
    areas: [
      "Yashodham",
      "Film City",
      "Aarey Colony",
      "Nagari Nivara",
      "Jay Prakash Nagar",
      "Vanrai Colony",
      "Royal Palms",
      "IT Park Area",
      "Oberoi Garden City Area",
    ],
  },
  {
    title: "Goregaon West",
    slug: "pg-in-goregaon-west",
    href: "/pg-in-goregaon-west",
    areas: [
      "Bangur Nagar",
      "Motilal Nagar",
      "Unnat Nagar",
      "Jawahar Nagar",
      "Best Nagar",
      "Piramal Nagar",
      "Roshan Nagar",
      "Filmistan Area",
      "Ram Mandir Area",
    ],
  },
  {
    title: "Jogeshwari East",
    slug: "pg-in-jogeshwari-east",
    href: "/pg-in-jogeshwari-east",
    areas: [
      "Meghwadi",
      "Natwar Nagar",
      "Poonam Nagar",
      "Sher-e-Punjab Colony",
      "Mahakali Caves Road",
      "Chakala",
      "Pump House",
      "Tolani Naka",
      "Gundavali",
      "Kondivita",
      "Majas Wadi",
      "SEEPZ Area",
      "MIDC Area",
      "Marol",
      "JB Nagar",
    ],
  },
  {
    title: "Jogeshwari West",
    slug: "pg-in-jogeshwari-west",
    href: "/pg-in-jogeshwari-west",
    areas: [
      "Behram Baug",
      "Oshiwara",
      "Amboli",
      "Millat Nagar",
      "Patel Estate",
      "Lokhandwala Complex",
      "Seven Bungalows",
      "DN Nagar",
      "Gilbert Hill Area",
    ],
  },
]);

export const mainAreaSlugs = pgServiceAreaGroups.map((group) => group.slug);

export const serviceAreasForMainSlug = (slug: string): PgServiceArea[] => {
  const group = pgServiceAreaGroups.find((item) => item.slug === slug);
  if (!group) return [];

  return group.areas.map((area) => ({
    name: area,
    href: `/${locationSlugFromArea(area)}`,
    description: `Premium PG rooms in ${area}`,
    badge: `${group.title} sub-area`,
  }));
};

export const pgLocations: Record<string, PgLocationData> = {
  "pg-in-malad-east": {
    slug: "pg-in-malad-east",
    area: "Malad East",
    city: "Mumbai",
    headline: "Best Premium PG Accommodation in Malad East",
    subheadline:
      "Fully furnished AC rooms with WiFi, housekeeping, CCTV security, water purifier and zero brokerage near Malad East, Dindoshi, Kurar Village and Western Express Highway.",
    startingRent: 7999,
    propertyCount: 40,
    residentCount: 800,
    googleRating: 4.8,
    googleReviews: 412,
    station: "Malad",
    pincode: "400097",
    intro:
      "Looking for a premium PG in Malad East? MyRoomiee runs managed, fully furnished PG rooms across Dindoshi, Pushpa Park, Kurar Village, Pathanwadi and key Malad East localities - ideal for professionals and students who want strong connectivity, safe housing and zero brokerage.",
    whyStay: [
      "Quick access to Malad Railway Station, Metro Line 7 and Western Express Highway",
      "Close to Dindoshi, Pushpa Park, Kurar Village, Pathanwadi and Daftary Road",
      "Convenient reach to Film City, Oberoi Mall, Mindspace and major office hubs",
      "Surrounded by daily essentials, eateries, gyms, clinics and local markets",
      "Fully furnished, managed PG living in one of Mumbai's most connected eastern suburbs",
    ],
    landmarks: [
      { name: "Malad Railway Station", type: "Station", distanceKm: 0.8, minutes: 4 },
      { name: "Dindoshi", type: "Office", distanceKm: 1.2, minutes: 6 },
      { name: "Pushpa Park", type: "Mall", distanceKm: 1.0, minutes: 5 },
      { name: "Western Express Highway", type: "Office", distanceKm: 1.5, minutes: 7 },
      { name: "Film City Road", type: "Office", distanceKm: 2.4, minutes: 10 },
      { name: "Metro Line 7 (Malad East)", type: "Metro", distanceKm: 1.0, minutes: 5 },
      { name: "Lifeline Multispeciality Hospital", type: "Hospital", distanceKm: 1.3, minutes: 6 },
      { name: "Children's Academy Malad East", type: "College", distanceKm: 1.1, minutes: 5 },
    ],
    boys: baseBoys(7999),
    girls: baseGirls(8999),
    gallery: galleryShared,
    testimonials: [
      {
        name: "Karan Shah",
        role: "Software Engineer near Dindoshi",
        rating: 5,
        text: "Stayed at MyRoomiee Malad East for 14 months. Spotless rooms, fast WiFi and the warden is super helpful. The Western Express Highway access saves me time every day.",
      },
      {
        name: "Pooja Nair",
        role: "UX Designer",
        rating: 5,
        text: "Best Girls PG in Malad East. CCTV everywhere, biometric entry and the food tastes like home. Felt safe from day one.",
      },
      {
        name: "Aditya Rane",
        role: "Final-year B.Com Student",
        rating: 4,
        text: "Booked a triple sharing room over WhatsApp on Saturday, moved in by Monday. Zero brokerage and very transparent pricing.",
      },
    ],
    serviceAreas: serviceAreasForMainSlug("pg-in-malad-east"),
    seoBlocks: seoBlocksFor("Malad East"),
    faqs: baseFaqs("Malad East", 7999),
    mapQuery: "Malad East, Mumbai",
  },

  "pg-in-goregaon": {
    slug: "pg-in-goregaon",
    area: "Goregaon",
    city: "Mumbai",
    headline: "Best Premium PG Accommodation in Goregaon",
    subheadline:
      "Premium furnished PGs in Goregaon East & West — minutes from Nesco, Oberoi Mall and the upcoming Metro. Zero brokerage, all amenities included.",
    startingRent: 8499,
    propertyCount: 31,
    residentCount: 2200,
    googleRating: 4.8,
    googleReviews: 528,
    station: "Goregaon",
    pincode: "400063",
    intro:
      "MyRoomiee operates premium PG rooms across Goregaon East and Goregaon West. Whether you work at Nesco IT Park, SEEPZ or Oberoi Garden City, our properties are minutes away — fully furnished, AC, with WiFi and housekeeping.",
    whyStay: [
      "Walking distance from Goregaon Station and Metro Line 7",
      "Close to Nesco IT Park, SEEPZ and Oberoi Commerz",
      "Surrounded by Oberoi Mall, Hub Mall and City Mall",
      "Easy access to Western Express Highway and Aarey Colony",
      "Top colleges and hospitals within a 3 km radius",
    ],
    landmarks: [
      { name: "Goregaon Railway Station", type: "Station", distanceKm: 0.9, minutes: 5 },
      { name: "Nesco IT Park", type: "Office", distanceKm: 1.6, minutes: 7 },
      { name: "Oberoi Mall", type: "Mall", distanceKm: 1.3, minutes: 6 },
      { name: "SEEPZ SEZ", type: "Office", distanceKm: 3.4, minutes: 12 },
      { name: "Goregaon Metro Station", type: "Metro", distanceKm: 1.1, minutes: 5 },
      { name: "Oberoi International School", type: "College", distanceKm: 1.5, minutes: 7 },
      {
        name: "Kokilaben Dhirubhai Ambani Hospital",
        type: "Hospital",
        distanceKm: 4.1,
        minutes: 14,
      },
      { name: "Hub Mall Goregaon", type: "Mall", distanceKm: 1.0, minutes: 5 },
    ],
    boys: baseBoys(8499),
    girls: baseGirls(9499),
    gallery: galleryShared,
    testimonials: [
      {
        name: "Rohit Patil",
        role: "Analyst at Nesco IT Park",
        rating: 5,
        text: "Honestly the best decision I made after moving to Mumbai. AC room, daily housekeeping and food is genuinely good. The manager replies instantly on WhatsApp.",
      },
      {
        name: "Sneha Kulkarni",
        role: "Content Strategist",
        rating: 5,
        text: "Girls PG in Goregaon West with proper security, clean washrooms and a lovely community. Felt at home in less than a week.",
      },
      {
        name: "Manish Gupta",
        role: "Working Professional",
        rating: 5,
        text: "Zero brokerage, transparent agreement, AC room with proper power backup. Highly recommend MyRoomiee Goregaon.",
      },
    ],
    seoBlocks: seoBlocksFor("Goregaon"),
    faqs: baseFaqs("Goregaon", 8499),
    mapQuery: "Goregaon East, Mumbai",
  },

  "pg-in-jogeshwari": {
    slug: "pg-in-jogeshwari",
    area: "Jogeshwari",
    city: "Mumbai",
    headline: "Best Premium PG Accommodation in Jogeshwari",
    subheadline:
      "Affordable premium PGs in Jogeshwari East & West — close to SEEPZ, MIDC and the Western Express Highway. Fully furnished, zero brokerage.",
    startingRent: 7499,
    propertyCount: 18,
    residentCount: 1400,
    googleRating: 4.7,
    googleReviews: 306,
    station: "Jogeshwari",
    pincode: "400060",
    intro:
      "MyRoomiee Jogeshwari offers managed PG accommodation for professionals and students working in SEEPZ, MIDC Andheri East and corporate offices along the Western Express Highway. Affordable, fully furnished and safe.",
    whyStay: [
      "Walking distance from Jogeshwari Station and JVLR connectivity",
      "Close to SEEPZ, MIDC Andheri East and corporate parks",
      "Direct access to Western Express Highway and Eastern access",
      "Quick reach to Inorbit Malad, Infiniti Andheri and Oberoi Mall",
      "Affordable food joints, gyms and clinics within walking distance",
    ],
    landmarks: [
      { name: "Jogeshwari Railway Station", type: "Station", distanceKm: 0.7, minutes: 4 },
      { name: "SEEPZ SEZ", type: "Office", distanceKm: 2.8, minutes: 10 },
      { name: "MIDC Andheri East", type: "Office", distanceKm: 3.1, minutes: 11 },
      { name: "Western Express Highway", type: "Office", distanceKm: 0.8, minutes: 3 },
      { name: "Infiniti Mall Andheri", type: "Mall", distanceKm: 3.0, minutes: 12 },
      { name: "Mogra Metro Station", type: "Metro", distanceKm: 1.2, minutes: 5 },
      { name: "Cooper Hospital", type: "Hospital", distanceKm: 4.0, minutes: 14 },
      { name: "Ismail Yusuf College", type: "College", distanceKm: 1.5, minutes: 7 },
    ],
    boys: baseBoys(7499),
    girls: baseGirls(8499),
    gallery: galleryShared,
    testimonials: [
      {
        name: "Vivek Iyer",
        role: "DevOps Engineer at SEEPZ",
        rating: 5,
        text: "Great value PG in Jogeshwari East. Clean rooms, AC works perfectly, and the food is way better than what I expected. WiFi is fast enough for video calls.",
      },
      {
        name: "Aishwarya Singh",
        role: "Junior Architect",
        rating: 4,
        text: "Stayed for 8 months in a Girls PG near Jogeshwari station. Wardens are kind, CCTV is everywhere and the location is super convenient.",
      },
      {
        name: "Faisal Khan",
        role: "Student",
        rating: 5,
        text: "Affordable triple sharing with all amenities included. Zero brokerage was the biggest relief. Booking happened in one day.",
      },
    ],
    seoBlocks: seoBlocksFor("Jogeshwari"),
    faqs: baseFaqs("Jogeshwari", 7499),
    mapQuery: "Jogeshwari, Mumbai",
  },
};

const createLocationVariant = (
  base: PgLocationData,
  overrides: Pick<
    PgLocationData,
    | "slug"
    | "area"
    | "headline"
    | "subheadline"
    | "startingRent"
    | "propertyCount"
    | "residentCount"
    | "googleReviews"
    | "station"
    | "pincode"
    | "intro"
    | "mapQuery"
  >,
): PgLocationData => ({
  ...base,
  ...overrides,
  boys: baseBoys(overrides.startingRent),
  girls: baseGirls(overrides.startingRent + 1000),
  seoBlocks: seoBlocksFor(overrides.area),
  faqs: baseFaqs(overrides.area, overrides.startingRent),
  landmarks: base.landmarks.map((landmark) =>
    landmark.type === "Station"
      ? { ...landmark, name: `${overrides.station} Railway Station` }
      : landmark,
  ),
});

pgLocations["pg-in-malad-west"] = createLocationVariant(pgLocations["pg-in-malad-east"], {
  slug: "pg-in-malad-west",
  area: "Malad West",
  headline: "Best Premium PG Accommodation in Malad West",
  subheadline:
    "Fully furnished PG rooms in Malad West near Orlem, Liberty Garden, Mindspace, Link Road and Malad Station with WiFi, meals, housekeeping and zero brokerage.",
  startingRent: 8499,
  propertyCount: 26,
  residentCount: 620,
  googleReviews: 338,
  station: "Malad",
  pincode: "400064",
  intro:
    "Looking for a premium PG in Malad West? MyRoomiee offers managed boys and girls PG rooms around Orlem, Evershine Nagar, Liberty Garden, Mindspace and Link Road with clean rooms, dependable service and easy commute access.",
  mapQuery: "Malad West, Mumbai",
});

pgLocations["pg-in-goregaon-east"] = createLocationVariant(pgLocations["pg-in-goregaon"], {
  slug: "pg-in-goregaon-east",
  area: "Goregaon East",
  headline: "Best Premium PG Accommodation in Goregaon East",
  subheadline:
    "Premium furnished PGs in Goregaon East near Dindoshi, Yashodham, Film City, Oberoi Garden City, Royal Palms and Nesco with zero brokerage.",
  startingRent: 8499,
  propertyCount: 24,
  residentCount: 1400,
  googleReviews: 402,
  station: "Goregaon",
  pincode: "400063",
  intro:
    "MyRoomiee Goregaon East serves residents around Dindoshi, Yashodham, Film City, Aarey Colony, Oberoi Garden City and Royal Palms with managed PG rooms designed for students and working professionals.",
  mapQuery: "Goregaon East, Mumbai",
});

pgLocations["pg-in-goregaon-west"] = createLocationVariant(pgLocations["pg-in-goregaon"], {
  slug: "pg-in-goregaon-west",
  area: "Goregaon West",
  headline: "Best Premium PG Accommodation in Goregaon West",
  subheadline:
    "Premium boys and girls PG rooms in Goregaon West near Bangur Nagar, Motilal Nagar, Oshiwara, SV Road and Link Road with WiFi, meals and housekeeping.",
  startingRent: 8999,
  propertyCount: 22,
  residentCount: 1180,
  googleReviews: 376,
  station: "Goregaon",
  pincode: "400104",
  intro:
    "MyRoomiee Goregaon West provides managed PG options around Bangur Nagar, Motilal Nagar, Jawahar Nagar, Oshiwara, SV Road and Link Road for residents who want quick access to work, college and daily essentials.",
  mapQuery: "Goregaon West, Mumbai",
});

pgLocations["pg-in-jogeshwari-east"] = createLocationVariant(pgLocations["pg-in-jogeshwari"], {
  slug: "pg-in-jogeshwari-east",
  area: "Jogeshwari East",
  headline: "Best Premium PG Accommodation in Jogeshwari East",
  subheadline:
    "Affordable premium PGs in Jogeshwari East near Meghwadi, Poonam Nagar, Chakala, SEEPZ, MIDC, Marol and JB Nagar with zero brokerage.",
  startingRent: 7499,
  propertyCount: 18,
  residentCount: 980,
  googleReviews: 276,
  station: "Jogeshwari",
  pincode: "400060",
  intro:
    "MyRoomiee Jogeshwari East is ideal for residents working around SEEPZ, MIDC, Chakala, Marol and JB Nagar who want managed PG rooms with transparent pricing and fast move-in support.",
  mapQuery: "Jogeshwari East, Mumbai",
});

pgLocations["pg-in-jogeshwari-west"] = createLocationVariant(pgLocations["pg-in-jogeshwari"], {
  slug: "pg-in-jogeshwari-west",
  area: "Jogeshwari West",
  headline: "Best Premium PG Accommodation in Jogeshwari West",
  subheadline:
    "Managed PG rooms in Jogeshwari West near Behram Baug, Oshiwara, Amboli, Millat Nagar, Lokhandwala Complex, SV Road and Link Road.",
  startingRent: 7999,
  propertyCount: 16,
  residentCount: 860,
  googleReviews: 244,
  station: "Jogeshwari",
  pincode: "400102",
  intro:
    "MyRoomiee Jogeshwari West serves Behram Baug, Oshiwara, Amboli, Millat Nagar, Lokhandwala Complex and nearby areas with clean, managed PG accommodation for students and professionals.",
  mapQuery: "Jogeshwari West, Mumbai",
});

interface SubAreaLocationConfig {
  slug: string;
  area: string;
  parentSlug: string;
  badge: string;
  startingRent?: number;
  propertyCount: number;
  residentCount: number;
  googleReviews: number;
  distanceKm: number;
  minutes: number;
  mapQuery?: string;
}

mainAreaSlugs.forEach((slug) => {
  const location = pgLocations[slug];
  if (location) location.serviceAreas = serviceAreasForMainSlug(slug);
});

const subAreaLocationConfigs: SubAreaLocationConfig[] = pgServiceAreaGroups.flatMap(
  (group, groupIndex) =>
    group.areas.map((area, areaIndex) => {
      const parent = pgLocations[group.slug];
      const baseRent = parent?.startingRent ?? 7999;
      const sequence = groupIndex * 25 + areaIndex;

      return {
        slug: locationSlugFromArea(area),
        area,
        parentSlug: group.slug,
        badge: `Part of the ${group.title} service area`,
        startingRent: Math.max(6999, baseRent + (areaIndex % 3) * 500),
        propertyCount: Math.max(4, 12 - Math.floor(areaIndex / 3)),
        residentCount: 120 + sequence * 8,
        googleReviews: 72 + sequence * 3,
        distanceKm: Number((0.8 + (areaIndex % 9) * 0.3).toFixed(1)),
        minutes: 4 + (areaIndex % 9),
        mapQuery: `${area}, Mumbai`,
      };
    }),
);

const inheritedSubAreaFields: Array<keyof PgLocationData> = [
  "city",
  "googleRating",
  "gallery",
  "testimonials",
  "boys",
  "girls",
  "serviceAreas",
];

const overriddenSubAreaFields: Array<keyof PgLocationData> = [
  "slug",
  "area",
  "headline",
  "subheadline",
  "startingRent",
  "propertyCount",
  "residentCount",
  "googleReviews",
  "intro",
  "whyStay",
  "landmarks",
  "seoBlocks",
  "faqs",
  "mapQuery",
];

const createSubAreaLocation = (
  parent: PgLocationData,
  config: SubAreaLocationConfig,
): PgLocationData => {
  const startingRent = config.startingRent ?? parent.startingRent;
  const siblings =
    parent.serviceAreas?.filter((item) => item.href !== `/${config.slug}`).slice(0, 12) ?? [];

  return {
    ...parent,
    slug: config.slug,
    area: config.area,
    headline: `Best Premium PG Accommodation in ${config.area}`,
    subheadline: `Fully furnished boys and girls PG in ${config.area}, ${parent.area}, with WiFi, meals, housekeeping, CCTV security and zero brokerage.`,
    startingRent,
    propertyCount: config.propertyCount,
    residentCount: config.residentCount,
    googleReviews: config.googleReviews,
    intro: `Looking for a premium PG in ${config.area}? MyRoomiee serves this ${parent.area} sub-area with managed, fully furnished PG rooms for working professionals and students who want dependable service, quick move-in support and strong Mumbai connectivity.`,
    whyStay: [
      `${config.area} is part of the wider ${parent.area} MyRoomiee service cluster.`,
      config.badge,
      `Quick access to ${parent.station} Railway Station, Metro Line 7 and Western Express Highway.`,
      "Managed rooms with WiFi, meals, housekeeping, CCTV and zero brokerage.",
      "Ideal for students and working professionals who want a quieter local base near daily essentials.",
    ],
    landmarks: [
      {
        name: config.area,
        type: "Office",
        distanceKm: 0.2,
        minutes: 2,
      },
      {
        name: parent.area,
        type: "Office",
        distanceKm: config.distanceKm,
        minutes: config.minutes,
      },
      ...parent.landmarks.slice(0, 6),
    ],
    boys: baseBoys(startingRent),
    girls: baseGirls(startingRent + 1000),
    serviceAreas: siblings,
    seoBlocks: seoBlocksFor(config.area),
    faqs: baseFaqs(config.area, startingRent),
    mapQuery: config.mapQuery ?? `${config.area}, Mumbai`,
  };
};

subAreaLocationConfigs.forEach((config) => {
  const parent = pgLocations[config.parentSlug];
  if (parent) pgLocations[config.slug] = createSubAreaLocation(parent, config);
});

const childSlugsByParent = subAreaLocationConfigs.reduce<Record<string, string[]>>(
  (acc, config) => {
    acc[config.parentSlug] = [...(acc[config.parentSlug] ?? []), config.slug];
    return acc;
  },
  {},
);

const subAreaBySlug = new Map(subAreaLocationConfigs.map((config) => [config.slug, config]));

const toLocationPageData = (data: PgLocationData): LocationPageData => {
  const subArea = subAreaBySlug.get(data.slug);
  if (subArea) {
    const parent = pgLocations[subArea.parentSlug];
    return {
      ...data,
      pageType: "sub-area",
      mainAreaSlug: subArea.parentSlug,
      mainArea: parent?.area ?? data.area,
      parentSlug: subArea.parentSlug,
      parentArea: parent?.area,
      childSlugs: [],
      inheritance: {
        parentSlug: subArea.parentSlug,
        inheritedFields: inheritedSubAreaFields,
        overriddenFields: overriddenSubAreaFields,
      },
    };
  }

  return {
    ...data,
    pageType: "main-area",
    mainAreaSlug: data.slug,
    mainArea: data.area,
    childSlugs: childSlugsByParent[data.slug] ?? [],
  };
};

export const locationPages: Record<string, LocationPageData> = Object.fromEntries(
  Object.values(pgLocations)
    .filter((data) => mainAreaSlugs.includes(data.slug) || subAreaBySlug.has(data.slug))
    .map((data) => [data.slug, toLocationPageData(data)]),
);

export function resolveLocationPage(slug: string): LocationPageData | undefined {
  const normalizedSlug = slug.replace(/^\/+/, "").replace(/\/+$/, "");
  return locationPages[normalizedSlug];
}

export const locationPageSlugs = Object.keys(locationPages);
export const pgLocationSlugs = locationPageSlugs;

export const pgContact = {
  phone: "+91 8879779777",
  phoneHref: "tel:+918879779777",
  whatsappHref: "https://wa.me/918879779777",
  email: "contact@myroomiee.com",
  address:
    "Flat No. 1005, Keshav Shiv Heights, Pandit Solicitor Road, Opp. Blue Diamond, Malad East, Mumbai 400097",
};
