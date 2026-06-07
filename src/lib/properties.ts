export type Gender = "boys" | "girls";

export interface NearbyPlace {
  label: string;
  type:
    | "Metro Station"
    | "Mall"
    | "Railway Station"
    | "Bus Stop"
    | "Hospital"
    | "College"
    | "IT Park";
  distance: string;
}

export interface PropertyRule {
  label: string;
  value: string;
}

export interface PropertyManager {
  name: string;
  role: string;
  phone: string;
  phoneHref: string;
  whatsappHref: string;
  photo: string;
}

export interface Property {
  slug: string;
  name: string;
  location: string;
  locationSlug: string;
  gender: Gender | "any";
  sharing: string[];
  priceFrom: number;
  image: string;
  gallery: string[];
  station: string;
  stationKm: number;
  amenities: string[];
  ac: boolean;
  availability: string;
  occupancyType: string;
  beds: number;
  bathrooms: number;
  floor: string;
  area: string;
  internet: string;
  meals: string;
  housekeeping: string;
  parking: string;
  water: string;
  powerBackup: string;
  description: string;
  nearby: NearbyPlace[];
  rules: PropertyRule[];
  manager: PropertyManager;
}

import single from "@/assets/room-single.jpg";
import twin from "@/assets/room-twin.jpg";
import lounge from "@/assets/room-lounge.jpg";
import kitchen from "@/assets/room-kitchen.jpg";
import bath from "@/assets/room-bath.jpg";
import hero from "@/assets/hero-room.jpg";

export const propertyImages = { single, twin, lounge, kitchen, bath, hero };

const amenities = {
  core: [
    "WiFi",
    "AC",
    "Laundry",
    "Meals",
    "Housekeeping",
    "Cupboard",
    "Security",
    "CCTV",
    "Water Purifier",
    "Power Backup",
    "24 Hour Water",
    "24 Hour Electricity",
  ],
  kitchen: [
    "WiFi",
    "Laundry",
    "Meals",
    "Housekeeping",
    "Microwave",
    "Refrigerator",
    "Cupboard",
    "Parking",
    "Lift",
    "Security",
    "CCTV",
    "Water Purifier",
    "Gas Connection",
    "Modular Kitchen",
    "Washing Machine",
    "24 Hour Water",
    "24 Hour Electricity",
  ],
  premium: [
    "WiFi",
    "AC",
    "Laundry",
    "Meals",
    "Housekeeping",
    "Microwave",
    "Refrigerator",
    "Cupboard",
    "Parking",
    "Lift",
    "Security",
    "CCTV",
    "Water Purifier",
    "Power Backup",
    "Gas Connection",
    "Modular Kitchen",
    "Washing Machine",
    "24 Hour Water",
    "24 Hour Electricity",
    "Garden",
    "Rainwater Harvesting",
  ],
};

const managerPhoto = lounge;

export const properties: Property[] = [
  {
    slug: "single-ac-room",
    name: "MyRoomiee Malad East Single AC Room",
    location: "Malad East",
    locationSlug: "malad-east",
    gender: "boys",
    sharing: ["Single", "Double", "Triple"],
    priceFrom: 12999,
    image: single,
    gallery: [single, lounge, kitchen, bath, hero],
    station: "Malad",
    stationKm: 0.8,
    amenities: amenities.premium,
    ac: true,
    availability: "2 beds available this week",
    occupancyType: "Single AC Room",
    beds: 12,
    bathrooms: 6,
    floor: "5th Floor",
    area: "3,200 sq ft",
    internet: "High-speed WiFi",
    meals: "Breakfast and dinner",
    housekeeping: "Daily common area cleaning",
    parking: "Two-wheeler parking",
    water: "Filtered drinking water",
    powerBackup: "Common-area backup",
    description:
      "A premium managed boys PG in Malad East built for students and working professionals who want a calm, clean and well-connected stay. Rooms are fully furnished, common areas are maintained by trained staff, and the property is close to station access, Metro Line 7, colleges and daily essentials.",
    nearby: [
      { type: "Railway Station", label: "Malad Railway Station", distance: "0.8 km" },
      { type: "Metro Station", label: "Malad East Metro Access", distance: "1.0 km" },
      { type: "Mall", label: "Oberoi Mall", distance: "3.4 km" },
      { type: "Bus Stop", label: "Western Express Highway Bus Stop", distance: "0.6 km" },
      { type: "Hospital", label: "Lifeline Multispeciality Hospital", distance: "1.3 km" },
      { type: "College", label: "Children's Academy", distance: "1.1 km" },
      { type: "IT Park", label: "Nesco IT Park", distance: "5.5 km" },
    ],
    rules: [
      { label: "No Smoking", value: "Allowed only outside the property" },
      { label: "No Alcohol", value: "Not permitted inside rooms" },
      { label: "Visitor Rules", value: "Lobby visits with manager approval" },
      { label: "Lock-In Period", value: "30 days" },
      { label: "Timings", value: "Quiet hours after 11 PM" },
    ],
    manager: {
      name: "Rohan Kulkarni",
      role: "Property Manager",
      phone: "+91 8879779777",
      phoneHref: "tel:+918879779777",
      whatsappHref: "https://wa.me/918879779777",
      photo: managerPhoto,
    },
  },
  {
    slug: "double-sharing-room",
    name: "MyRoomiee Malad West Double Sharing",
    location: "Malad West",
    locationSlug: "malad-west",
    gender: "girls",
    sharing: ["Double", "Triple"],
    priceFrom: 10499,
    image: twin,
    gallery: [twin, bath, lounge, kitchen, hero],
    station: "Malad",
    stationKm: 1.0,
    amenities: amenities.core,
    ac: true,
    availability: "4 beds available",
    occupancyType: "Double Sharing",
    beds: 18,
    bathrooms: 8,
    floor: "3rd Floor",
    area: "4,100 sq ft",
    internet: "High-speed WiFi",
    meals: "Fresh meals included",
    housekeeping: "Daily housekeeping",
    parking: "Bike parking",
    water: "24 hour water",
    powerBackup: "Essential backup",
    description:
      "A thoughtfully managed girls PG near Malad West markets, station connectivity and shopping areas. The property is designed for comfort and predictable service with clean rooms, CCTV in common areas, structured visitor rules and responsive on-site support.",
    nearby: [
      { type: "Railway Station", label: "Malad Railway Station", distance: "1.0 km" },
      { type: "Mall", label: "Inorbit Mall", distance: "2.6 km" },
      { type: "Bus Stop", label: "Link Road Bus Stop", distance: "0.4 km" },
      { type: "Hospital", label: "Zenith Hospital", distance: "1.1 km" },
      { type: "College", label: "Nagindas Khandwala College", distance: "1.7 km" },
      { type: "IT Park", label: "Mindspace Malad", distance: "2.2 km" },
    ],
    rules: [
      { label: "No Smoking", value: "Not permitted indoors" },
      { label: "No Alcohol", value: "Not permitted" },
      { label: "Visitor Rules", value: "Common-area visits only" },
      { label: "Lock-In Period", value: "45 days" },
      { label: "Timings", value: "Manager entry support till 11 PM" },
    ],
    manager: {
      name: "Neha Shah",
      role: "Resident Experience Lead",
      phone: "+91 8879779777",
      phoneHref: "tel:+918879779777",
      whatsappHref: "https://wa.me/918879779777",
      photo: bath,
    },
  },
  {
    slug: "triple-sharing-room",
    name: "MyRoomiee Goregaon East Triple Sharing",
    location: "Goregaon East",
    locationSlug: "goregaon-east",
    gender: "any",
    sharing: ["Triple", "Double"],
    priceFrom: 8499,
    image: kitchen,
    gallery: [kitchen, lounge, twin, bath, single],
    station: "Goregaon",
    stationKm: 0.9,
    amenities: amenities.kitchen,
    ac: false,
    availability: "6 beds available",
    occupancyType: "Triple Sharing",
    beds: 24,
    bathrooms: 10,
    floor: "2nd Floor",
    area: "4,800 sq ft",
    internet: "WiFi included",
    meals: "Breakfast and dinner",
    housekeeping: "Common areas cleaned daily",
    parking: "Limited parking",
    water: "24 hour water",
    powerBackup: "Common-area backup",
    description:
      "A value-focused premium PG room in Goregaon East with strong access to Nesco, Oberoi Mall, the railway station and Western Express Highway. Ideal for residents who want reliable services, approachable pricing and a fast move-in process.",
    nearby: [
      { type: "Railway Station", label: "Goregaon Railway Station", distance: "0.9 km" },
      { type: "Metro Station", label: "Goregaon Metro Station", distance: "1.1 km" },
      { type: "Mall", label: "Oberoi Mall", distance: "1.3 km" },
      { type: "Hospital", label: "SRV Hospital Goregaon", distance: "1.8 km" },
      { type: "College", label: "Patkar Varde College", distance: "2.0 km" },
      { type: "IT Park", label: "Nesco IT Park", distance: "1.6 km" },
    ],
    rules: [
      { label: "No Smoking", value: "Not permitted inside rooms" },
      { label: "No Alcohol", value: "Not permitted inside property" },
      { label: "Visitor Rules", value: "Prior approval required" },
      { label: "Lock-In Period", value: "30 days" },
      { label: "Timings", value: "Quiet hours after 10:30 PM" },
    ],
    manager: {
      name: "Amit Jadhav",
      role: "Property Manager",
      phone: "+91 8879779777",
      phoneHref: "tel:+918879779777",
      whatsappHref: "https://wa.me/918879779777",
      photo: hero,
    },
  },
  {
    slug: "goregaon-west-premium-pg",
    name: "MyRoomiee Goregaon West Premium PG",
    location: "Goregaon West",
    locationSlug: "goregaon-west",
    gender: "girls",
    sharing: ["Single", "Double"],
    priceFrom: 11999,
    image: lounge,
    gallery: [lounge, twin, bath, kitchen, single],
    station: "Goregaon",
    stationKm: 1.2,
    amenities: amenities.premium,
    ac: true,
    availability: "3 beds available",
    occupancyType: "Single and Double Sharing",
    beds: 16,
    bathrooms: 7,
    floor: "4th Floor",
    area: "3,900 sq ft",
    internet: "High-speed WiFi",
    meals: "Meals available",
    housekeeping: "Daily service",
    parking: "Two-wheeler parking",
    water: "Water purifier",
    powerBackup: "Essential backup",
    description:
      "A polished girls PG in Goregaon West with furnished rooms, calm common areas and easy access to station roads, colleges, malls and office corridors. The property is suited for residents who want a quieter premium setup with quick support.",
    nearby: [
      { type: "Railway Station", label: "Goregaon Railway Station", distance: "1.2 km" },
      { type: "Mall", label: "Inorbit Mall", distance: "3.2 km" },
      { type: "Bus Stop", label: "SV Road Bus Stop", distance: "0.5 km" },
      { type: "Hospital", label: "Kapadia Multispeciality Hospital", distance: "1.6 km" },
      { type: "College", label: "Patkar Varde College", distance: "1.3 km" },
      { type: "IT Park", label: "Nesco IT Park", distance: "2.7 km" },
    ],
    rules: [
      { label: "No Smoking", value: "Not permitted indoors" },
      { label: "No Alcohol", value: "Not permitted indoors" },
      { label: "Visitor Rules", value: "Visitor log mandatory" },
      { label: "Lock-In Period", value: "45 days" },
      { label: "Timings", value: "Late entry with manager intimation" },
    ],
    manager: {
      name: "Pooja Menon",
      role: "Resident Experience Lead",
      phone: "+91 8879779777",
      phoneHref: "tel:+918879779777",
      whatsappHref: "https://wa.me/918879779777",
      photo: lounge,
    },
  },
  {
    slug: "jogeshwari-east-premium-pg",
    name: "MyRoomiee Jogeshwari East Premium PG",
    location: "Jogeshwari East",
    locationSlug: "jogeshwari-east",
    gender: "boys",
    sharing: ["Single", "Double", "Triple"],
    priceFrom: 8999,
    image: hero,
    gallery: [hero, single, lounge, kitchen, bath],
    station: "Jogeshwari",
    stationKm: 1.4,
    amenities: amenities.kitchen,
    ac: true,
    availability: "5 beds available",
    occupancyType: "Boys PG and Premium PG Rooms",
    beds: 20,
    bathrooms: 8,
    floor: "6th Floor",
    area: "4,400 sq ft",
    internet: "WiFi included",
    meals: "Meals included",
    housekeeping: "Daily common-area cleaning",
    parking: "Limited parking",
    water: "24 hour water",
    powerBackup: "Common-area backup",
    description:
      "A clean and connected boys PG in Jogeshwari East with easy access to station routes, Western Express Highway and local colleges. The layout is practical, service-led and built for a smooth move-in.",
    nearby: [
      { type: "Railway Station", label: "Jogeshwari Railway Station", distance: "1.4 km" },
      { type: "Metro Station", label: "Akurli Metro Access", distance: "1.0 km" },
      { type: "Mall", label: "Growel's 101 Mall", distance: "2.1 km" },
      { type: "Hospital", label: "ESIC Hospital", distance: "1.9 km" },
      { type: "College", label: "Thakur College", distance: "1.4 km" },
      { type: "IT Park", label: "Nesco IT Park", distance: "6.2 km" },
    ],
    rules: [
      { label: "No Smoking", value: "Outdoor area only" },
      { label: "No Alcohol", value: "Not permitted" },
      { label: "Visitor Rules", value: "Entry with manager approval" },
      { label: "Lock-In Period", value: "30 days" },
      { label: "Timings", value: "Quiet hours after 11 PM" },
    ],
    manager: {
      name: "Sagar Pawar",
      role: "Property Manager",
      phone: "+91 8879779777",
      phoneHref: "tel:+918879779777",
      whatsappHref: "https://wa.me/918879779777",
      photo: single,
    },
  },
  {
    slug: "jogeshwari-west-girls-pg",
    name: "MyRoomiee Jogeshwari West Girls PG",
    location: "Jogeshwari West",
    locationSlug: "jogeshwari-west",
    gender: "girls",
    sharing: ["Double", "Triple"],
    priceFrom: 9499,
    image: bath,
    gallery: [bath, twin, lounge, kitchen, hero],
    station: "Jogeshwari",
    stationKm: 0.7,
    amenities: amenities.core,
    ac: true,
    availability: "4 beds available",
    occupancyType: "Girls PG",
    beds: 18,
    bathrooms: 8,
    floor: "5th Floor",
    area: "3,700 sq ft",
    internet: "High-speed WiFi",
    meals: "Meals included",
    housekeeping: "Daily housekeeping",
    parking: "Two-wheeler parking",
    water: "Filtered drinking water",
    powerBackup: "Essential backup",
    description:
      "A well-maintained girls PG in Jogeshwari West close to station roads, colleges, markets and daily commute routes. Rooms are furnished, services are predictable and inquiry-to-visit flow is quick.",
    nearby: [
      { type: "Railway Station", label: "Jogeshwari Railway Station", distance: "0.7 km" },
      { type: "Mall", label: "Raghuleela Mall", distance: "1.5 km" },
      { type: "Bus Stop", label: "SV Road Bus Stop", distance: "0.4 km" },
      { type: "Hospital", label: "Phoenix Hospital", distance: "1.1 km" },
      { type: "College", label: "KES Shroff College", distance: "1.0 km" },
      { type: "IT Park", label: "Mindspace Malad", distance: "4.5 km" },
    ],
    rules: [
      { label: "No Smoking", value: "Not permitted indoors" },
      { label: "No Alcohol", value: "Not permitted" },
      { label: "Visitor Rules", value: "Common-area visits only" },
      { label: "Lock-In Period", value: "30 days" },
      { label: "Timings", value: "Quiet hours after 10:30 PM" },
    ],
    manager: {
      name: "Mira Shetty",
      role: "Resident Experience Lead",
      phone: "+91 8879779777",
      phoneHref: "tel:+918879779777",
      whatsappHref: "https://wa.me/918879779777",
      photo: twin,
    },
  },
];

export const realisticAmenities = [
  "WiFi",
  "AC",
  "Laundry",
  "Meals",
  "Housekeeping",
  "Microwave",
  "Refrigerator",
  "Cupboard",
  "Parking",
  "Lift",
  "Security",
  "CCTV",
  "Water Purifier",
  "Power Backup",
  "Gas Connection",
  "Modular Kitchen",
  "Washing Machine",
  "24 Hour Water",
  "24 Hour Electricity",
  "Garden",
  "Rainwater Harvesting",
];

export const mumbaiLocations: { slug: string; name: string; region: string }[] = [
  ["Malad East", "Western"],
  ["Malad West", "Western"],
  ["Goregaon East", "Western"],
  ["Goregaon West", "Western"],
  ["Jogeshwari East", "Western"],
  ["Jogeshwari West", "Western"],
  ["Andheri West", "Western"],
  ["Andheri East", "Western"],
  ["Bandra West", "Western"],
  ["Bandra East", "Western"],
  ["Borivali", "Western"],
  ["Dahisar", "Western"],
  ["Goregaon", "Western"],
  ["Jogeshwari", "Western"],
  ["Jogeshwari", "Western"],
  ["Vile Parle", "Western"],
  ["Santacruz", "Western"],
  ["Khar", "Western"],
  ["Juhu", "Western"],
  ["Powai", "Central"],
  ["Kanjurmarg", "Central"],
  ["Vikhroli", "Central"],
  ["Ghatkopar", "Central"],
  ["Mulund", "Central"],
  ["Bhandup", "Central"],
  ["Chembur", "Central"],
  ["Kurla", "Central"],
  ["Sion", "Central"],
  ["Dadar", "Central"],
  ["Matunga", "Central"],
  ["Wadala", "Central"],
  ["Thane", "Central"],
  ["Mira Road", "Central"],
  ["Bhayander", "Central"],
  ["Lower Parel", "South"],
  ["Worli", "South"],
  ["Prabhadevi", "South"],
  ["Mahalaxmi", "South"],
  ["Byculla", "South"],
  ["Fort", "South"],
  ["Colaba", "South"],
  ["Marine Lines", "South"],
  ["Churchgate", "South"],
  ["Navi Mumbai", "Navi Mumbai"],
  ["Vashi", "Navi Mumbai"],
  ["Nerul", "Navi Mumbai"],
].map(([name, region]) => ({
  slug: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  region,
}));
