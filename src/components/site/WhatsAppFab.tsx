import { useRouterState } from "@tanstack/react-router";
import { pgContact } from "@/lib/pg-locations";
import { twinHref, twinValue } from "@/lib/cms/digital-twin";
import { useCmsTwinPage } from "@/lib/cms/store";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFab() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const twin = useCmsTwinPage("floating");
  const href = twinHref(twin, "whatsapp", "fab", "button", pgContact.whatsappHref);
  const label = twinValue(twin, "whatsapp", "fab", "button", "WhatsApp MyRoomiee");
  const message = encodeURIComponent(
    twinValue(twin, "whatsapp", "fab", "message", "Hi MyRoomiee, I'm looking for a PG in Mumbai"),
  );

  if (pathname.startsWith("/properties/")) return null;

  return (
    <a
      href={`${href}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105 hover:shadow-lift"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
