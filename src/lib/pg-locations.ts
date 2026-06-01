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

export interface PgFaq { q: string; a: string }

export interface PgServiceArea {
  name: string;
  href: string;
  description: string;
  badge?: string;
}

export interface PgLocationData {
  slug: string;            // "pg-in-malad-east"
  area: string;            // "Malad East"
  city: string;            // "Mumbai"
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

const galleryShared = [
  { src: hero, alt: "Premium AC bedroom" },
  { src: single, alt: "Single sharing room" },
  { src: twin, alt: "Double sharing room" },
  { src: lounge, alt: "Community lounge" },
  { src: kitchen, alt: "Dining and kitchen area" },
  { src: bath, alt: "Modern washroom" },
];

const baseBoys = (priceFrom: number): PgRoomCard[] => [
  { type: "Single AC Room", sharing: "Single", priceFrom: priceFrom + 4500, gender: "boys", image: single, amenities: ["AC", "WiFi", "Study Table", "Cupboard"], available: 2 },
  { type: "Double Sharing", sharing: "Double", priceFrom: priceFrom + 1500, gender: "boys", image: twin, amenities: ["AC", "WiFi", "Housekeeping", "Meals"], available: 4 },
  { type: "Triple Sharing", sharing: "Triple", priceFrom: priceFrom, gender: "boys", image: kitchen, amenities: ["WiFi", "Housekeeping", "Meals", "Laundry"], available: 3 },
];

const baseGirls = (priceFrom: number): PgRoomCard[] => [
  { type: "Single AC Room", sharing: "Single", priceFrom: priceFrom + 5000, gender: "girls", image: bath, amenities: ["AC", "WiFi", "CCTV", "Study Table"], available: 1 },
  { type: "Double Sharing", sharing: "Double", priceFrom: priceFrom + 2000, gender: "girls", image: twin, amenities: ["AC", "WiFi", "CCTV", "Housekeeping", "Meals"], available: 3 },
  { type: "Triple Sharing", sharing: "Triple", priceFrom: priceFrom + 500, gender: "girls", image: lounge, amenities: ["WiFi", "CCTV", "Housekeeping", "Meals"], available: 5 },
];

const seoBlocksFor = (area: string): { title: string; body: string }[] => [
  { title: `Boys PG in ${area}`, body: `Premium Boys PGs in ${area} with fully furnished AC and non-AC rooms, high-speed WiFi, housekeeping, hot meals and 24x7 security. Ideal for working professionals and students looking for a hassle-free, brokerage-free stay.` },
  { title: `Girls PG in ${area}`, body: `Safe, verified Girls PGs in ${area} with CCTV surveillance, biometric entry, wardens on duty, daily housekeeping and nutritious meals. Designed to make working women and female students feel at home.` },
  { title: `AC PG in ${area}`, body: `Fully air-conditioned rooms in ${area} with quality mattresses, study desks, wardrobes and dedicated power backup. Each room is move-in ready — bring your bag and start living premium.` },
  { title: `Furnished PG in ${area}`, body: `Every MyRoomiee PG in ${area} comes pre-furnished with bed, mattress, wardrobe, chair, study table, fan and AC. Common areas include refrigerator, microwave, RO water and washing machine.` },
  { title: `PG near ${area} Station`, body: `Most of our ${area} properties are within walking distance of the railway station and metro, with quick access to corporate hubs, malls and colleges across western Mumbai.` },
  { title: `PG for Working Professionals`, body: `Quiet study/work zones, fast WiFi, flexible meal timings, weekly housekeeping and secure 24x7 entry — built for professionals who value time and comfort.` },
  { title: `PG for Students`, body: `Affordable triple and double sharing options near top colleges in ${area}, with meals, laundry, study tables and a community of like-minded residents.` },
];

const baseFaqs = (area: string, rent: number): PgFaq[] => [
  { q: `What is the rent of PG in ${area}?`, a: `Rent at MyRoomiee PGs in ${area} starts from ₹${rent.toLocaleString("en-IN")} per month for triple sharing and goes up to ₹${(rent + 5500).toLocaleString("en-IN")} for premium single AC rooms. All-inclusive — no brokerage.` },
  { q: "Is WiFi included in the rent?", a: "Yes. High-speed Wi-Fi is included in every MyRoomiee PG along with electricity (within fair-use limits), housekeeping and meals." },
  { q: "Is daily housekeeping available?", a: "Yes — bedrooms are cleaned on alternate days and common areas daily by professional housekeeping staff." },
  { q: "Do you provide AC rooms?", a: "Yes, we offer both AC and non-AC rooms. AC rooms are available in single, double and triple sharing formats." },
  { q: "Is there CCTV security?", a: "Every MyRoomiee property has 24x7 CCTV across entry, exits and common areas, plus biometric/keycard entry on most properties." },
  { q: `Do you have Girls PG in ${area}?`, a: `Yes, we have dedicated Girls PGs in ${area} with wardens, CCTV, biometric entry and verified female-only residents.` },
  { q: "Is there a brokerage or hidden charge?", a: "No. MyRoomiee is a zero-brokerage brand. You pay only the refundable security deposit and monthly rent." },
  { q: "Can I book a visit before paying?", a: "Yes — free property visits, no commitment. Book a slot via the Book Visit button, WhatsApp or call us directly." },
];

const maladEastServiceAreas: PgServiceArea[] = [
  { name: "Dindoshi", href: "/pg-in-dindoshi", description: "Premium PGs available nearby", badge: "Near Metro Access" },
  { name: "Pushpa Park", href: "/pg-in-pushpa-park", description: "Premium PGs available nearby", badge: "Near Malad Station" },
  { name: "Triveni Nagar", href: "/pg-in-triveni-nagar", description: "Premium PGs available nearby", badge: "Near Western Express Highway" },
  { name: "Bandongri", href: "/pg-in-bandongri", description: "Premium PGs available nearby", badge: "Near Film City" },
  { name: "Kurar Village", href: "/pg-in-kurar-village", description: "Premium PGs available nearby", badge: "Near Western Express Highway" },
  { name: "Pathanwadi", href: "/pg-in-pathanwadi", description: "Premium PGs available nearby", badge: "Near Metro Access" },
  { name: "Upper Govind Nagar", href: "/pg-in-upper-govind-nagar", description: "Premium PGs available nearby", badge: "Near Film City" },
  { name: "Lower Govind Nagar", href: "/pg-in-lower-govind-nagar", description: "Premium PGs available nearby", badge: "Near Malad Station" },
  { name: "Kokanipada", href: "/pg-in-kokanipada", description: "Premium PGs available nearby", badge: "Near Western Express Highway" },
  { name: "Appa Pada", href: "/pg-in-appa-pada", description: "Premium PGs available nearby", badge: "Near Metro Access" },
  { name: "Pimpripada", href: "/pg-in-pimpripada", description: "Premium PGs available nearby", badge: "Near Western Express Highway" },
  { name: "Shivaji Nagar", href: "/pg-in-shivaji-nagar-malad-east", description: "Premium PGs available nearby", badge: "Near Malad Station" },
  { name: "Daftary Road", href: "/pg-in-daftary-road", description: "Premium PGs available nearby", badge: "Near Malad Station" },
  { name: "Film City Road", href: "/pg-in-film-city-road", description: "Premium PGs available nearby", badge: "Near Film City" },
  { name: "Rani Sati Marg", href: "/pg-in-rani-sati-marg", description: "Premium PGs available nearby", badge: "Near Malad Station" },
  { name: "Khotwadi", href: "/pg-in-khotwadi-malad-east", description: "Premium PGs available nearby", badge: "Near Metro Access" },
  { name: "Raheja Township", href: "/pg-in-raheja-township", description: "Premium PGs available nearby", badge: "Near Infinity Mall" },
  { name: "Ashoka Nagar", href: "/pg-in-ashoka-nagar-malad-east", description: "Premium PGs available nearby", badge: "Near Western Express Highway" },
  { name: "Evershine Nagar", href: "/pg-in-evershine-nagar", description: "Premium PGs available nearby", badge: "Near Infinity Mall" },
  { name: "Keshav Nagar", href: "/pg-in-keshav-nagar-malad-east", description: "Premium PGs available nearby", badge: "Near Malad Station" },
  { name: "Malad Railway Station Area", href: "/pg-near-malad-railway-station", description: "Premium PGs available nearby", badge: "Near Malad Station" },
  { name: "Western Express Highway Area", href: "/pg-near-western-express-highway-malad-east", description: "Premium PGs available nearby", badge: "Near Western Express Highway" },
  { name: "Goregaon East Border", href: "/pg-near-goregaon-east-border", description: "Premium PGs available nearby", badge: "Near Film City" },
  { name: "Jogeshwari East Border", href: "/pg-near-jogeshwari-east-border", description: "Premium PGs available nearby", badge: "Near Metro Access" },
];

export const pgLocations: Record<string, PgLocationData> = {
  "pg-in-malad-east": {
    slug: "pg-in-malad-east",
    area: "Malad East",
    city: "Mumbai",
    headline: "Best PG & Coliving Spaces in Malad East",
    subheadline: "Fully furnished AC rooms with WiFi, housekeeping, CCTV security, RO water and zero brokerage near Malad East, Dindoshi, Kurar Village and Western Express Highway.",
    startingRent: 7999,
    propertyCount: 40,
    residentCount: 800,
    googleRating: 4.8,
    googleReviews: 412,
    station: "Malad",
    pincode: "400097",
    intro: "Looking for a premium PG in Malad East? MyRoomiee runs managed, fully furnished PG and coliving spaces across Dindoshi, Pushpa Park, Kurar Village, Pathanwadi, Daftary Road and key Malad East localities - ideal for professionals and students who want strong connectivity, safe housing and zero brokerage.",
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
      { name: "Karan Shah", role: "Software Engineer near Dindoshi", rating: 5, text: "Stayed at MyRoomiee Malad East for 14 months. Spotless rooms, fast WiFi and the warden is super helpful. The Western Express Highway access saves me time every day." },
      { name: "Pooja Nair", role: "UX Designer", rating: 5, text: "Best Girls PG in Malad East. CCTV everywhere, biometric entry and the food tastes like home. Felt safe from day one." },
      { name: "Aditya Rane", role: "Final-year B.Com Student", rating: 4, text: "Booked a triple sharing room over WhatsApp on Saturday, moved in by Monday. Zero brokerage and very transparent pricing." },
    ],
    serviceAreas: maladEastServiceAreas,
    seoBlocks: seoBlocksFor("Malad East"),
    faqs: baseFaqs("Malad East", 7999),
    mapQuery: "Malad East, Mumbai",
  },

  "pg-in-goregaon": {
    slug: "pg-in-goregaon",
    area: "Goregaon",
    city: "Mumbai",
    headline: "Best PG & Coliving Spaces in Goregaon",
    subheadline: "Premium furnished PGs in Goregaon East & West — minutes from Nesco, Oberoi Mall and the upcoming Metro. Zero brokerage, all amenities included.",
    startingRent: 8499,
    propertyCount: 31,
    residentCount: 2200,
    googleRating: 4.8,
    googleReviews: 528,
    station: "Goregaon",
    pincode: "400063",
    intro: "MyRoomiee operates premium PG and coliving spaces across Goregaon East and Goregaon West. Whether you work at Nesco IT Park, SEEPZ or Oberoi Garden City, our properties are minutes away — fully furnished, AC, with WiFi and housekeeping.",
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
      { name: "Kokilaben Dhirubhai Ambani Hospital", type: "Hospital", distanceKm: 4.1, minutes: 14 },
      { name: "Hub Mall Goregaon", type: "Mall", distanceKm: 1.0, minutes: 5 },
    ],
    boys: baseBoys(8499),
    girls: baseGirls(9499),
    gallery: galleryShared,
    testimonials: [
      { name: "Rohit Patil", role: "Analyst at Nesco IT Park", rating: 5, text: "Honestly the best decision I made after moving to Mumbai. AC room, daily housekeeping and food is genuinely good. The manager replies instantly on WhatsApp." },
      { name: "Sneha Kulkarni", role: "Content Strategist", rating: 5, text: "Girls PG in Goregaon West with proper security, clean washrooms and a lovely community. Felt at home in less than a week." },
      { name: "Manish Gupta", role: "Working Professional", rating: 5, text: "Zero brokerage, transparent agreement, AC room with proper power backup. Highly recommend MyRoomiee Goregaon." },
    ],
    seoBlocks: seoBlocksFor("Goregaon"),
    faqs: baseFaqs("Goregaon", 8499),
    mapQuery: "Goregaon East, Mumbai",
  },

  "pg-in-jogeshwari": {
    slug: "pg-in-jogeshwari",
    area: "Jogeshwari",
    city: "Mumbai",
    headline: "Best PG & Coliving Spaces in Jogeshwari",
    subheadline: "Affordable premium PGs in Jogeshwari East & West — close to SEEPZ, MIDC and the Western Express Highway. Fully furnished, zero brokerage.",
    startingRent: 7499,
    propertyCount: 18,
    residentCount: 1400,
    googleRating: 4.7,
    googleReviews: 306,
    station: "Jogeshwari",
    pincode: "400060",
    intro: "MyRoomiee Jogeshwari offers managed PG and coliving spaces for professionals and students working in SEEPZ, MIDC Andheri East and corporate offices along the Western Express Highway. Affordable, fully furnished and safe.",
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
      { name: "Vivek Iyer", role: "DevOps Engineer at SEEPZ", rating: 5, text: "Great value PG in Jogeshwari East. Clean rooms, AC works perfectly, and the food is way better than what I expected. WiFi is fast enough for video calls." },
      { name: "Aishwarya Singh", role: "Junior Architect", rating: 4, text: "Stayed for 8 months in a Girls PG near Jogeshwari station. Wardens are kind, CCTV is everywhere and the location is super convenient." },
      { name: "Faisal Khan", role: "Student", rating: 5, text: "Affordable triple sharing with all amenities included. Zero brokerage was the biggest relief. Booking happened in one day." },
    ],
    seoBlocks: seoBlocksFor("Jogeshwari"),
    faqs: baseFaqs("Jogeshwari", 7499),
    mapQuery: "Jogeshwari, Mumbai",
  },
};

export const pgLocationSlugs = Object.keys(pgLocations);

export const pgContact = {
  phone: "+91 8879779777",
  phoneHref: "tel:+918879779777",
  whatsappHref: "https://wa.me/918879779777",
  email: "contact@myroomiee.com",
  address: "Flat No. 1005, Keshav Shiv Heights, Pandit Solicitor Road, Opp. Blue Diamond, Malad East, Mumbai 400097",
};
