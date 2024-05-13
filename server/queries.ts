import "server-only";
import prisma from "@/lib/prismadb";
import { TMatchQuery, TMatch } from "@/app/types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
  if (!matches) throw new Error("Image not found ");

  return matches;
}

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
}