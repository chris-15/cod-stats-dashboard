import "server-only";
import prisma from "@/lib/prismadb";
import { TMatchQuery, TMatch, TGameMode } from "@/app/types";
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
export async function getMatchById(id:string){
  const session = await getServerSession(authOptions);
  if(!session) throw new Error("Unauthorized");
  
  const match = await prisma.match.findUnique({
    where: {
      id: id,
    }
  })
  if(!match) throw new Error("No Match Found")
  if(session.user?.email !=  match.userEmail) throw new Error("Unuthorized")

return match
};

//for mw3 matches
export async function getMatchesByMode(gameMode:TGameMode) {
  const session = await getServerSession(authOptions);
  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  const userEmail = session?.user?.email as string;

  const matches = await prisma.match.findMany({
    where: {
      userEmail: userEmail,
      gameMode: gameMode
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

//for mw3 matches
// delete match by id
export async function deleteMatch(id:string) {
  //getting the authenticated user session
  const session = await getServerSession(authOptions);

  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  await prisma.match.delete({
    where: {id},
  })
  //console.log("match deleted!")

  redirect('/dashboard')
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

//get match by id for bosix matches
export async function getBoSixMatchById(id:string){
  const session = await getServerSession(authOptions);
  if(!session) throw new Error("Unauthorized");
  
  const match = await prisma.boSixMatch.findUnique({
    where: {
      id: id,
    }
  })
  if(!match) throw new Error("No Match Found")
  if(session.user?.email !=  match.userEmail) throw new Error("Unuthorized")

return match
};

//get matches by game mode for bosix matches
export async function getBoSixMatchesByMode(gameMode:TGameMode) {
  const session = await getServerSession(authOptions);
  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  const userEmail = session?.user?.email as string;

  const matches = await prisma.boSixMatch.findMany({
    where: {
      userEmail: userEmail,
      gameMode: gameMode
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

// delete match by id
export async function deleteBoSixMatch(id:string) {
  //getting the authenticated user session
  const session = await getServerSession(authOptions);

  //if no session return the next response error
  if (!session) throw new Error("Unauthorized");

  await prisma.boSixMatch.delete({
    where: {id},
  })
  //console.log("match deleted!")

  redirect('/dashboard')
}