export type Gender = "boys" | "girls";
export type SharingType = "Single" | "Double" | "Triple";
export type RoomOption = {
  code: string;
  label: string;
  slug: string;
  price: number;
  deposit?: number;
};

export interface Property {
  slug: string;
  name: string;
  location: string;
  locationSlug: string;
  gender: Gender | "any";
  sharing: SharingType[];
  prices: Partial<Record<SharingType, number>>;
  depositFrom?: number;
  priceFrom: number;
  roomOptions?: RoomOption[];
  image: string;
  station: string;
  stationKm: number;
  amenities: string[];
  ac: boolean;
  verified: boolean;
  availability?: string;
  occupancyType?: string;
  gallery?: string[];
  sourceNote?: string;
}

const roomImage = (folder: string, number: number) => `/room-images/${folder}/image-${String(number).padStart(2, "0")}.jpeg`;
const roomImages = (folder: string, numbers: number[]) => numbers.map((number) => roomImage(folder, number));

const roomSlug = (label: string) => label.toLowerCase().replace(/\s+/g, "-");
const roomOption = (code: string, label: string, price: number, deposit?: number): RoomOption => ({
  code,
  label,
  slug: roomSlug(label),
  price,
  deposit,
});

export const propertyImages = {
  maladAjanta: roomImage("shivdham-building-1-boys", 2),
  omGautam: roomImage("om-gautam-boys", 1),
  shivdhamBoys: roomImage("shivdham-building-boys", 5),
  shivdhamGirls: roomImage("shivdham-building-1-girls", 1),
  ashokSamrat: roomImage("ashok-samrath-building-girls", 9),
  vaibhavKutir: roomImage("vaibhav-kutir-heights", 4),
};

export const properties: Property[] = [
  {
    slug: "malad-ajanta-ac-rooms",
    name: "Malad Ajanta AC Rooms",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "boys",
    sharing: ["Single", "Double", "Triple"],
    prices: { Single: 17000, Double: 16000, Triple: 13000 },
    depositFrom: 13000,
    priceFrom: 13000,
    roomOptions: [
      roomOption("MB", "Master Bedroom", 17000, 17000),
      roomOption("CB", "Common Bedroom", 16000, 16000),
      roomOption("HALL", "Hall", 13000, 13000),
    ],
    image: propertyImages.maladAjanta,
    station: "Malad",
    stationKm: 0.8,
    amenities: ["AC", "WiFi", "Housekeeping", "RO Water"],
    ac: true,
    verified: true,
    availability: "Master Bedroom, Common Bedroom and Hall available",
    occupancyType: "Master Bedroom, Common Bedroom and Hall",
    gallery: roomImages("shivdham-building-1-boys", [2, 3, 7, 9, 10, 11, 1, 4, 5, 6, 8, 12]),
    sourceNote: "Excel rows 2-7: MB Rs. 17,000, CB Rs. 16,000, Hall Rs. 13,000.",
  },
  {
    slug: "om-gautam-ac-rooms",
    name: "Om Gautam AC Rooms",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "boys",
    sharing: ["Single", "Double", "Triple"],
    prices: { Single: 15000, Double: 13500, Triple: 12500 },
    depositFrom: 5000,
    priceFrom: 12500,
    roomOptions: [
      roomOption("MB", "Master Bedroom", 15000, 20000),
      roomOption("CB", "Common Bedroom", 13500, 15000),
      roomOption("HALL", "Hall", 12500, 12500),
    ],
    image: propertyImages.omGautam,
    station: "Malad",
    stationKm: 1.0,
    amenities: ["AC", "WiFi", "Housekeeping", "Laundry"],
    ac: true,
    verified: true,
    availability: "Master Bedroom, Common Bedroom and Hall available",
    occupancyType: "Master Bedroom, Common Bedroom and Hall",
    gallery: roomImages("om-gautam-boys", [1, 2, 5, 6, 8, 10, 11, 12, 14, 15, 16, 3, 4, 7, 9, 13]),
    sourceNote: "Excel rows 24-29: MB Rs. 15,000, CB from Rs. 13,500, Hall from Rs. 12,500.",
  },
  {
    slug: "shivdham-complex-ac-rooms",
    name: "Shivdham Complex AC Rooms",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "boys",
    sharing: ["Single", "Double", "Triple"],
    prices: { Single: 16500, Double: 13000, Triple: 13000 },
    depositFrom: 15000,
    priceFrom: 13000,
    roomOptions: [
      roomOption("MB", "Master Bedroom", 16500, 20000),
      roomOption("CB", "Common Bedroom", 13000, 15000),
      roomOption("HALL", "Hall", 13000, 15000),
    ],
    image: propertyImages.shivdhamBoys,
    station: "Malad",
    stationKm: 1.3,
    amenities: ["AC", "WiFi", "Housekeeping", "RO Water"],
    ac: true,
    verified: true,
    availability: "Master Bedroom, Common Bedroom and Hall available",
    occupancyType: "Master Bedroom, Common Bedroom and Hall",
    gallery: roomImages("shivdham-building-boys", [5, 1, 2, 16, 18, 25, 3, 4, 6, 7, 8, 9, 11, 19, 27, 28, 10, 12, 13, 14, 15, 17, 21, 22, 23, 24, 26]),
    sourceNote: "Excel rows 69-74: MB from Rs. 16,500, CB from Rs. 13,000, Hall Rs. 13,000.",
  },
  {
    slug: "shivdham-building-1-girls",
    name: "Shivdham Building 1 Girls AC Rooms",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "girls",
    sharing: ["Single", "Double", "Triple"],
    prices: { Single: 17000, Double: 13000, Triple: 12000 },
    depositFrom: 15000,
    priceFrom: 12000,
    roomOptions: [
      roomOption("MB", "Master Bedroom", 17000, 20000),
      roomOption("CB", "Common Bedroom", 13000, 15000),
      roomOption("HALL", "Hall", 12000, 15000),
    ],
    image: propertyImages.shivdhamGirls,
    station: "Malad",
    stationKm: 1.2,
    amenities: ["AC", "WiFi", "CCTV", "Housekeeping"],
    ac: true,
    verified: true,
    availability: "Master Bedroom, Common Bedroom and Hall available",
    occupancyType: "Girls Master Bedroom, Common Bedroom and Hall",
    gallery: roomImages("shivdham-building-1-girls", [1, 2, 3, 5, 6, 10, 11, 4, 9, 13, 7, 8, 12]),
    sourceNote: "Excel rows 75-80: Shivdham block with MB Rs. 17,000, CB from Rs. 13,000, Hall Rs. 12,000.",
  },
  {
    slug: "ashok-samrat-premium-girls",
    name: "Ashok Samrat Premium Girls AC Rooms",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "girls",
    sharing: ["Single", "Double"],
    prices: { Single: 15000, Double: 13000 },
    depositFrom: 13000,
    priceFrom: 13000,
    roomOptions: [
      roomOption("MB1", "Master Bedroom 1", 15000, 15000),
      roomOption("MB2", "Master Bedroom 2", 17000, 17000),
      roomOption("CB", "Common Bedroom", 13000, 13000),
    ],
    image: propertyImages.ashokSamrat,
    station: "Malad",
    stationKm: 0.9,
    amenities: ["AC", "WiFi", "CCTV", "Housekeeping"],
    ac: true,
    verified: true,
    availability: "Master Bedroom 1, Master Bedroom 2 and Common Bedroom available",
    occupancyType: "Premium Girls Bedroom Options",
    gallery: roomImages("ashok-samrath-building-girls", [9, 10, 2, 3, 5, 6, 11, 13, 4, 12, 14, 1, 7, 8]),
    sourceNote: "Excel rows 100-107: MB from Rs. 15,000, CB from Rs. 13,000. No Hall/Triple row listed.",
  },
  {
    slug: "vaibhav-kutir-heights",
    name: "Vaibhav Kutir Heights",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "any",
    sharing: ["Single", "Triple"],
    prices: { Single: 17000, Triple: 12500 },
    depositFrom: 12500,
    priceFrom: 12500,
    roomOptions: [
      roomOption("MB", "Master Bedroom", 17000, 17000),
      roomOption("HALL", "Hall", 12500, 12500),
    ],
    image: propertyImages.vaibhavKutir,
    station: "Malad",
    stationKm: 1.1,
    amenities: ["AC", "WiFi", "Housekeeping", "RO Water"],
    ac: true,
    verified: true,
    availability: "Master Bedroom and Hall available",
    occupancyType: "Master Bedroom and Hall",
    gallery: roomImages("vaibhav-kutir-heights", [4, 9, 11, 14, 18, 19, 22, 3, 5, 6, 7, 15, 16, 20, 1, 2, 8, 10, 12, 13, 17, 21]),
    sourceNote: "Excel rows 108-114: MB Rs. 17,000, Hall Rs. 12,500. No CB/Double row listed.",
  },
];

const legacyPropertySlugs: Record<string, string> = {
  "single-ac-room": "malad-ajanta-ac-rooms",
  "double-sharing-room": "malad-ajanta-ac-rooms",
  "triple-sharing": "malad-ajanta-ac-rooms",
  "triple-sharing-room": "malad-ajanta-ac-rooms",
  "master-bedroom": "malad-ajanta-ac-rooms",
  "master-bedroom-1": "ashok-samrat-premium-girls",
  "master-bedroom-2": "ashok-samrat-premium-girls",
  "common-bedroom": "malad-ajanta-ac-rooms",
  "hall": "malad-ajanta-ac-rooms",
  "premium-pg-rooms": "ashok-samrat-premium-girls",
};

export function resolvePropertyBySlug(slug: string) {
  const currentSlug = legacyPropertySlugs[slug] ?? slug;
  return properties.find((property) => property.slug === currentSlug);
}

export const fallbackRoomOptions = (property: Property): RoomOption[] =>
  property.sharing
    .filter((sharing) => typeof property.prices[sharing] === "number")
    .map((sharing) => {
      const label = sharing === "Single" ? "Master Bedroom" : sharing === "Double" ? "Common Bedroom" : "Hall";
      return roomOption(sharing, label, property.prices[sharing]!);
    });

export const propertyRoomOptions = (property: Property) =>
  property.roomOptions?.length ? property.roomOptions : fallbackRoomOptions(property);

export const roomOptionBySlug = (property: Property, slug?: string) => {
  const options = propertyRoomOptions(property);
  return options.find((option) => option.slug === slug) ?? options[0];
};

export const roomOptionForLegacySharing = (property: Property, sharing?: string) => {
  const options = propertyRoomOptions(property);
  const normalized = sharing?.toLowerCase() ?? "";
  if (normalized.includes("single")) return options.find((option) => option.label.startsWith("Master Bedroom")) ?? options[0];
  if (normalized.includes("double")) return options.find((option) => option.label === "Common Bedroom") ?? options[0];
  if (normalized.includes("triple")) return options.find((option) => option.label === "Hall") ?? options[options.length - 1] ?? options[0];
  return options[0];
};

export const mumbaiLocations: { slug: string; name: string; region: string }[] = [
  ["Andheri West", "Western"], ["Andheri East", "Western"], ["Bandra West", "Western"],
  ["Bandra East", "Western"], ["Borivali", "Western"], ["Dahisar", "Western"],
  ["Goregaon", "Western"], ["Jogeshwari", "Western"], ["Kandivali", "Western"],
  ["Malad West", "Western"], ["Malad East", "Western"], ["Vile Parle", "Western"],
  ["Santacruz", "Western"], ["Khar", "Western"], ["Juhu", "Western"],
  ["Powai", "Central"], ["Kanjurmarg", "Central"], ["Vikhroli", "Central"],
  ["Ghatkopar", "Central"], ["Mulund", "Central"], ["Bhandup", "Central"],
  ["Chembur", "Central"], ["Kurla", "Central"], ["Sion", "Central"],
  ["Dadar", "Central"], ["Matunga", "Central"], ["Wadala", "Central"],
  ["Thane", "Central"], ["Mira Road", "Central"], ["Bhayander", "Central"],
  ["Lower Parel", "South"], ["Worli", "South"], ["Prabhadevi", "South"],
  ["Mahalaxmi", "South"], ["Byculla", "South"], ["Fort", "South"],
  ["Colaba", "South"], ["Marine Lines", "South"], ["Churchgate", "South"],
  ["Navi Mumbai", "Navi Mumbai"], ["Vashi", "Navi Mumbai"], ["Nerul", "Navi Mumbai"],
].map(([name, region]) => ({
  slug: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  region,
}));
