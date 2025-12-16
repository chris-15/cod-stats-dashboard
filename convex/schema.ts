import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  matches: defineTable({
    tokenIdentifier: v.string(),
    gamemode: v.union(
      v.literal("hardpoint"),
      v.literal("search_and_destroy"),
      v.literal("overload")
    ),
    map: v.union(
      v.literal("colossus"),
      v.literal("den"),
      v.literal("exposure"),
      v.literal("raid"),
      v.literal("scar"),
      v.literal("blackheart")
    ),
    isWin: v.boolean(),
    teamScore: v.number(),
    enemyScore: v.number(),
    kills: v.number(),
    deaths: v.number(),
    damage: v.number(),
    timeObj: v.optional(v.number()), // in seconds- only for hardpoint
    plants: v.optional(v.number()), // number of plants only for search
    defuses: v.optional(v.number()), // number of defuses only for search
    notes: v.optional(v.string()),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_gamemode", ["gamemode"])
    .index("by_map", ["map"])
    .index("by_gamemode_map", ["gamemode", "map"]),
});
