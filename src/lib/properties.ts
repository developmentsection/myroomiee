export type Gender = "boys" | "girls";

export interface Property {
  slug: string;
  name: string;
  location: string;
  locationSlug: string;
  gender: Gender | "any";
  sharing: string[];
  priceFrom: number;
  image: string;
  station: string;
  stationKm: number;
  amenities: string[];
  ac: boolean;
  verified: boolean;
  availability?: string;
  occupancyType?: string;
  gallery?: string[];
}

const roomImage = (folder: string, number: number) => `/room-images/${folder}/image-${String(number).padStart(2, "0")}.jpeg`;

export const propertyImages = {
  single: roomImage("shivdham-building-1-boys", 9),
  twin: roomImage("shivdham-building-1-girls", 1),
  lounge: roomImage("vaibhav-kutir-heights", 14),
  premium: roomImage("om-gautam-boys", 1),
  girls: roomImage("ashok-samrath-building-girls", 9),
  hero: roomImage("shivdham-building-boys", 1),
};

export const properties: Property[] = [
  {
    slug: "malad-ajanta-ac-rooms",
    name: "MyRoomiee Malad Ajanta AC Rooms",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "boys",
    sharing: ["Single", "Double", "Triple"],
    priceFrom: 13000,
    image: propertyImages.single,
    station: "Malad",
    stationKm: 0.8,
    amenities: ["AC", "WiFi", "Housekeeping", "Laundry"],
    ac: true,
    verified: true,
    availability: "Single, double and triple available",
    occupancyType: "Air Conditioned Rooms",
    gallery: [
      roomImage("shivdham-building-1-boys", 10),
      roomImage("shivdham-building-1-boys", 11),
      roomImage("shivdham-building-1-boys", 7),
    ],
  },
  {
    slug: "malad-ajanta-elite-ac-rooms",
    name: "MyRoomiee Malad Ajanta Elite AC Rooms",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "any",
    sharing: ["Single", "Double", "Triple"],
    priceFrom: 12500,
    image: propertyImages.lounge,
    station: "Malad",
    stationKm: 0.9,
    amenities: ["AC", "WiFi", "Housekeeping", "RO Water"],
    ac: true,
    verified: true,
    availability: "Single, double and triple available",
    occupancyType: "Air Conditioned Rooms",
    gallery: [
      roomImage("vaibhav-kutir-heights", 18),
      roomImage("vaibhav-kutir-heights", 19),
      roomImage("vaibhav-kutir-heights", 22),
    ],
  },
  {
    slug: "rajasthan-ac-rooms",
    name: "MyRoomiee Rajasthan AC Rooms",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "girls",
    sharing: ["Single", "Double", "Triple"],
    priceFrom: 11000,
    image: propertyImages.twin,
    station: "Malad",
    stationKm: 1.1,
    amenities: ["AC", "WiFi", "CCTV", "Housekeeping"],
    ac: true,
    verified: true,
    availability: "Single, double and triple available",
    occupancyType: "Air Conditioned Rooms",
    gallery: [
      roomImage("shivdham-building-1-girls", 2),
      roomImage("shivdham-building-1-girls", 3),
      roomImage("shivdham-building-1-girls", 6),
    ],
  },
  {
    slug: "om-gautam-ac-rooms",
    name: "MyRoomiee Om Gautam AC Rooms",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "boys",
    sharing: ["Single", "Double", "Triple"],
    priceFrom: 12500,
    image: propertyImages.premium,
    station: "Malad",
    stationKm: 1.0,
    amenities: ["AC", "WiFi", "Housekeeping", "Laundry"],
    ac: true,
    verified: true,
    availability: "Single, double and triple available",
    occupancyType: "Air Conditioned Rooms",
    gallery: [
      roomImage("om-gautam-boys", 2),
      roomImage("om-gautam-boys", 5),
      roomImage("om-gautam-boys", 8),
    ],
  },
  {
    slug: "shivdham-complex-ac-rooms",
    name: "MyRoomiee Shivdham Complex AC Rooms",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "any",
    sharing: ["Single", "Double", "Triple"],
    priceFrom: 12000,
    image: propertyImages.hero,
    station: "Malad",
    stationKm: 1.3,
    amenities: ["AC", "WiFi", "Housekeeping", "RO Water"],
    ac: true,
    verified: true,
    availability: "Single, double and triple available",
    occupancyType: "Air Conditioned Rooms",
    gallery: [
      roomImage("shivdham-building-boys", 2),
      roomImage("shivdham-building-boys", 5),
      roomImage("shivdham-building-boys", 16),
    ],
  },
  {
    slug: "shah-arcade-ac-rooms",
    name: "MyRoomiee Shah Arcade AC Rooms",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "girls",
    sharing: ["Single", "Double", "Triple"],
    priceFrom: 12000,
    image: propertyImages.girls,
    station: "Malad",
    stationKm: 0.7,
    amenities: ["AC", "WiFi", "CCTV", "Housekeeping"],
    ac: true,
    verified: true,
    availability: "Single, double and triple available",
    occupancyType: "Air Conditioned Rooms",
    gallery: [
      roomImage("ashok-samrath-building-girls", 2),
      roomImage("ashok-samrath-building-girls", 3),
      roomImage("ashok-samrath-building-girls", 10),
    ],
  },
];

const legacyPropertySlugs: Record<string, string> = {
  "single-ac-room": "malad-ajanta-ac-rooms",
  "double-sharing-room": "malad-ajanta-ac-rooms",
  "triple-sharing": "malad-ajanta-elite-ac-rooms",
  "triple-sharing-room": "malad-ajanta-elite-ac-rooms",
  "premium-pg-rooms": "rajasthan-ac-rooms",
};

export function resolvePropertyBySlug(slug: string) {
  const currentSlug = legacyPropertySlugs[slug] ?? slug;
  return properties.find((property) => property.slug === currentSlug);
}

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
