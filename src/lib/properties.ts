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
}

import single from "@/assets/room-single.jpg";
import twin from "@/assets/room-twin.jpg";
import lounge from "@/assets/room-lounge.jpg";
import kitchen from "@/assets/room-kitchen.jpg";
import bath from "@/assets/room-bath.jpg";
import hero from "@/assets/hero-room.jpg";

export const propertyImages = { single, twin, lounge, kitchen, bath, hero };

export const properties: Property[] = [
  {
    slug: "roomiee-andheri-west-residency",
    name: "MyRoomiee Andheri West Residency",
    location: "Andheri West",
    locationSlug: "andheri-west",
    gender: "boys",
    sharing: ["Single", "Double", "Triple"],
    priceFrom: 9999,
    image: single,
    station: "Andheri",
    stationKm: 0.8,
    amenities: ["AC", "WiFi", "Housekeeping", "Meals", "Laundry"],
    ac: true,
    verified: true,
  },
  {
    slug: "roomiee-powai-coliving",
    name: "MyRoomiee Powai Coliving",
    location: "Powai",
    locationSlug: "powai",
    gender: "any",
    sharing: ["Single", "Double"],
    priceFrom: 12999,
    image: lounge,
    station: "Kanjurmarg",
    stationKm: 2.1,
    amenities: ["AC", "WiFi", "Gym", "Meals", "Power Backup"],
    ac: true,
    verified: true,
  },
  {
    slug: "roomiee-bandra-girls",
    name: "MyRoomiee Bandra Girls PG",
    location: "Bandra West",
    locationSlug: "bandra-west",
    gender: "girls",
    sharing: ["Double", "Triple"],
    priceFrom: 10499,
    image: twin,
    station: "Bandra",
    stationKm: 1.2,
    amenities: ["AC", "WiFi", "CCTV", "Housekeeping", "Meals"],
    ac: true,
    verified: true,
  },
  {
    slug: "roomiee-malad-west",
    name: "MyRoomiee Malad West",
    location: "Malad West",
    locationSlug: "malad-west",
    gender: "boys",
    sharing: ["Double", "Triple"],
    priceFrom: 8499,
    image: kitchen,
    station: "Malad",
    stationKm: 1.0,
    amenities: ["WiFi", "Housekeeping", "Meals", "Laundry"],
    ac: false,
    verified: true,
  },
  {
    slug: "roomiee-thane-coliving",
    name: "MyRoomiee Thane Premium",
    location: "Thane",
    locationSlug: "thane",
    gender: "any",
    sharing: ["Single", "Double"],
    priceFrom: 11499,
    image: hero,
    station: "Thane",
    stationKm: 1.5,
    amenities: ["AC", "WiFi", "Gym", "Meals", "Power Backup", "RO Water"],
    ac: true,
    verified: true,
  },
  {
    slug: "roomiee-vile-parle-girls",
    name: "MyRoomiee Vile Parle Girls",
    location: "Vile Parle",
    locationSlug: "vile-parle",
    gender: "girls",
    sharing: ["Single", "Double"],
    priceFrom: 12999,
    image: bath,
    station: "Vile Parle",
    stationKm: 0.6,
    amenities: ["AC", "WiFi", "CCTV", "Meals", "Housekeeping"],
    ac: true,
    verified: true,
  },
];

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