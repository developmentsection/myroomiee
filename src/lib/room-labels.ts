export const roomOptionNames = "Master Bedroom, Common Bedroom and Hall";

const roomCopyReplacements: Array<[RegExp, string]> = [
  [/single, double and triple sharing AC rooms/gi, `${roomOptionNames} AC room options`],
  [/single, double and triple sharing room options/gi, `${roomOptionNames} room options`],
  [/single, double and triple sharing rooms/gi, `${roomOptionNames} rooms`],
  [/single, double and triple sharing options/gi, `${roomOptionNames} options`],
  [/single, double and triple sharing/gi, `${roomOptionNames} options`],
  [/single, double or triple sharing options/gi, `${roomOptionNames} options`],
  [/single, double or triple sharing formats/gi, `${roomOptionNames} options`],
  [/single, double or triple sharing/gi, `${roomOptionNames} options`],
  [/single, double and triple options/gi, `${roomOptionNames} options`],
  [/single, double and triple rooms/gi, `${roomOptionNames} rooms`],
  [/Single rooms cost more/gi, "Master Bedrooms may cost more"],
  [/sharing rooms/gi, "room options"],
  [/sharing type/gi, "room option"],
  [/sharing preference/gi, "room preference"],
  [/sharing options/gi, "room options"],
  [/Boys Single Air Conditioned Room/gi, "Boys Master Bedroom"],
  [/Boys Double Sharing Room/gi, "Boys Common Bedroom"],
  [/Boys Triple Sharing Room/gi, "Boys Hall"],
  [/Girls Single Air Conditioned Room/gi, "Girls Master Bedroom"],
  [/Girls Double Sharing Room/gi, "Girls Common Bedroom"],
  [/Girls Triple Sharing Room/gi, "Girls Hall"],
];

export const normalizeRoomCopy = (value: string) =>
  roomCopyReplacements.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);

export const roomLabelFromCode = (code: string) => {
  const normalized = code.trim().toLowerCase().replace(/[\s_-]+/g, "");
  if (normalized === "mb1") return "Master Bedroom 1";
  if (normalized === "mb2") return "Master Bedroom 2";
  if (normalized === "mb" || normalized === "masterbedroom") return "Master Bedroom";
  if (normalized.startsWith("cb") || normalized.startsWith("commonbedroom")) return "Common Bedroom";
  if (normalized.startsWith("hall")) return "Hall";
  return normalizeRoomCopy(code);
};
