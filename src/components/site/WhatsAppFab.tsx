import { pgContact } from "@/lib/pg-locations";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFab() {
  return (
    <a
      href={`${pgContact.whatsappHref}?text=Hi%20MyRoomiee%2C%20I%27m%20looking%20for%20a%20PG%20in%20Mumbai`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp MyRoomiee"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105 hover:shadow-lift"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
