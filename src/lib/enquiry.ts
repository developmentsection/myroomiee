const enquiryPhone = "918879779777";

export type EnquiryFields = Record<string, string | undefined>;

export const buildWhatsAppEnquiryUrl = (fields: EnquiryFields) => {
  const lines = Object.entries(fields)
    .map(([label, value]) => [label, value?.trim()] as const)
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => `${label}: ${value}`);

  const message = ["New MyRoomiee enquiry", ...lines].join("\n");
  return `https://wa.me/${enquiryPhone}?text=${encodeURIComponent(message)}`;
};

export const openWhatsAppEnquiry = (fields: EnquiryFields) => {
  window.open(buildWhatsAppEnquiryUrl(fields), "_blank", "noopener,noreferrer");
};
