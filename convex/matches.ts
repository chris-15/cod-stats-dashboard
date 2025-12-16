import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMatches = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("matches")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const createMatch = mutation({
  args: {
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
    timeObj: v.optional(v.number()),
    plants: v.optional(v.number()),
    defuses: v.optional(v.number()),
    notes: v.optional(v.string()),
  },

  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    // console.log(userId);

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    await ctx.db.insert("matches", {
      tokenIdentifier: userId,
      gamemode: args.gamemode,
      map: args.map,
      isWin: args.isWin,
      teamScore: args.teamScore,
      enemyScore: args.enemyScore,
      kills: args.kills,
      deaths: args.deaths,
      damage: args.damage,
      timeObj: args.timeObj,
      plants: args.plants,
      defuses: args.defuses,
      notes: args.notes,
    });
  },
});
