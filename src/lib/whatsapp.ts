type WhatsAppField = {
  label: string;
  value?: string | null;
};

export function buildWhatsAppMessage(title: string, fields: WhatsAppField[]) {
  return [
    title,
    "",
    ...fields
      .map(({ label, value }) => {
        const trimmed = value?.trim();
        return trimmed ? `${label}: ${trimmed}` : "";
      })
      .filter(Boolean),
  ].join("\n");
}

export function buildWhatsAppHref(target: string, message: string) {
  const base = target.split("?")[0];
  const href = /^https?:\/\//i.test(base) ? base : `https://wa.me/${base.replace(/\D/g, "")}`;

  return `${href}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(target: string, message: string) {
  window.open(buildWhatsAppHref(target, message), "_blank", "noopener,noreferrer");
}
