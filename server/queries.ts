import "server-only";
import prisma from "@/lib/prismadb";
import { TMatchQuery, TMatch, TGameMode } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

//for mw3 matches
export async function getMatches(): Promise<TMatchQuery[]> {
  const session = await getServerSession(authOptions);
  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  const userEmail = session?.user?.email as string;

  const matches = await prisma.match.findMany({
    where: {
      userEmail: userEmail,
    },
    include: {
      user: { select: { name: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!matches) throw new Error("Matches not found ");

  return matches;
}
// for mw3 matches
export async function getMatchById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const match = await prisma.match.findUnique({
    where: {
      id: id,
    },
  });
  if (!match) throw new Error("No Match Found");
  if (session.user?.email != match.userEmail) throw new Error("Unuthorized");

  return match;
}

//for mw3 matches
export async function getMatchesByMode(gameMode: TGameMode) {
  const session = await getServerSession(authOptions);
  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  const userEmail = session?.user?.email as string;

  const matches = await prisma.match.findMany({
    where: {
      userEmail: userEmail,
      gameMode: gameMode,
    },
    include: {
      user: { select: { name: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!matches) throw new Error("Matches not found ");

  return matches;
}

//get last 15 matches for all modes mw3 matches
export async function getFifteenMw3Matches(): Promise<TMatchQuery[]> {
  const session = await getServerSession(authOptions);
  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  const userEmail = session?.user?.email as string;

  const matches = await prisma.match.findMany({
    where: {
      userEmail: userEmail,
    },
    include: {
      user: { select: { name: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 15,
  });
  if (!matches) throw new Error("Matches not found ");

  return matches;
}

//get last 15 matches by game mode for mw3 matches
export async function getLastFifteenMw3MatchesByMode() {
  const session = await getServerSession(authOptions);
  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  const userEmail = session?.user?.email as string;

  const [hpMatches, controlMatches, searchMatches] = await Promise.all([
    //last 15 hp matches
    prisma.match.findMany({
      where: {
        userEmail: userEmail,
        gameMode: "Hardpoint",
      },
      include: {
        user: { select: { name: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 15,
    }),
    //last 15 control matches
    prisma.match.findMany({
      where: {
        userEmail: userEmail,
        gameMode: "Control",
      },
      include: {
        user: { select: { name: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 15,
    }),
    //last 15 search matches
    prisma.match.findMany({
      where: {
        userEmail: userEmail,
        gameMode: "SearchAndDestroy",
      },
      include: {
        user: { select: { name: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 15,
    }),
  ]);

  if (!hpMatches || !controlMatches || !searchMatches)
    throw new Error("Matches not found ");

  return { hpMatches, controlMatches, searchMatches };
}

//for mw3 matches
// delete match by id
export async function deleteMatch(id: string) {
  //getting the authenticated user session
  const session = await getServerSession(authOptions);

  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  await prisma.match.delete({
    where: { id },
  });
  //console.log("match deleted!")

  redirect("/dashboard");
}

/* 
---------------------------
Below are for BoSix matches
---------------------------
*/

export async function getBoSixMatches(): Promise<TMatchQuery[]> {
  const session = await getServerSession(authOptions);
  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  const userEmail = session?.user?.email as string;

  const matches = await prisma.boSixMatch.findMany({
    where: {
      userEmail: userEmail,
    },
    include: {
      user: { select: { name: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!matches) throw new Error("Matches not found ");

  return matches;
}

//get last 15 matches for all modes bosix matches
export async function getFifteenBoSixMatches(): Promise<TMatchQuery[]> {
  const session = await getServerSession(authOptions);
  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  const userEmail = session?.user?.email as string;

  const matches = await prisma.boSixMatch.findMany({
    where: {
      userEmail: userEmail,
    },
    include: {
      user: { select: { name: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 15,
  });
  if (!matches) throw new Error("Matches not found ");

  return matches;
}

//get match by id for bosix matches
export async function getBoSixMatchById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const match = await prisma.boSixMatch.findUnique({
    where: {
      id: id,
    },
  });
  if (!match) throw new Error("No Match Found");
  if (session.user?.email != match.userEmail) throw new Error("Unuthorized");

  return match as TMatchQuery;
}

//get matches by game mode for bosix matches
export async function getBoSixMatchesByMode(gameMode: TGameMode) {
  const session = await getServerSession(authOptions);
  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  const userEmail = session?.user?.email as string;

  const matches = await prisma.boSixMatch.findMany({
    where: {
      userEmail: userEmail,
      gameMode: gameMode,
    },
    include: {
      user: { select: { name: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!matches) throw new Error("Matches not found ");

  return matches;
}

//get last 15 matches by game mode for bosix matches
export async function getLastFifteenBoSixMatchesByMode() {
  const session = await getServerSession(authOptions);
  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  const userEmail = session?.user?.email as string;

  const [hpMatches, controlMatches, searchMatches] = await Promise.all([
    //last 15 hp matches
    prisma.boSixMatch.findMany({
      where: {
        userEmail: userEmail,
        gameMode: "Hardpoint",
      },
      include: {
        user: { select: { name: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 15,
    }),
    //last 15 control matches
    prisma.boSixMatch.findMany({
      where: {
        userEmail: userEmail,
        gameMode: "Control",
      },
      include: {
        user: { select: { name: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 15,
    }),
    //last 15 search matches
    prisma.boSixMatch.findMany({
      where: {
        userEmail: userEmail,
        gameMode: "SearchAndDestroy",
      },
      include: {
        user: { select: { name: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 15,
    }),
  ]);

  if (!hpMatches || !controlMatches || !searchMatches)
    throw new Error("Matches not found ");

  return { hpMatches, controlMatches, searchMatches };
}

// delete match by id
export async function deleteBoSixMatch(id: string) {
  //getting the authenticated user session
  const session = await getServerSession(authOptions);

  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  await prisma.boSixMatch.delete({
    where: { id },
  });
  //console.log("match deleted!")

  redirect("/dashboard/bo6");
}
