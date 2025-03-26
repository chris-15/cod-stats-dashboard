import { TGameMode } from "@/types";

export const mw3MapSets: Record<TGameMode, string[]> = {
  Hardpoint: [
    "Invasion",
    "Karachi",
    "Rio",
    "Skidrow",
    "SixStar",
    "SubBase",
    "Terminal",
    "Vista",
  ],
  Control: ["Highrise", "Invasion", "Karachi"],
  SearchAndDestroy: [
    "Highrise",
    "Invasion",
    "Karachi",
    "Rio",
    "SixStar",
    "Skidrow",
    "Terminal",
  ],
};

export const bo6MapSets: Record<TGameMode, string[]> = {
  Hardpoint: ["Hacienda", "Protocol", "RedCard", "Rewind", "Skyline", "Vault"],
  Control: ["Hacienda", "Protocol", "Rewind", "Vault"],
  SearchAndDestroy: [
    "Dealership",
    "Hacienda",
    "Protocol",
    "RedCard",
    "Rewind",
    "Skyline",
    "Vault",
  ],
};
