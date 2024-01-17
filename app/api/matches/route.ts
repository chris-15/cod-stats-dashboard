import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

//creating/adding match statistics
export async function POST(req: Request) {
  //getting the authenticated user session
  const session = await getServerSession(authOptions);

  //if no session return the next response error
  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }

  const { gameMode, matchMap, kills, deaths, damage, win, time, plants, defuses } =
    await req.json();

  
  const userEmail = session?.user?.email as string;

  //if game mode not specified, dont create
  if (!gameMode) {
    return NextResponse.json({ error: "Game mode required" }, { status: 500 });
  }

  try {
    const newMatch = await prisma.match.create({
      data: {
        gameMode,
        matchMap,
        kills,
        deaths,
        damage,
        win,
        time,
        plants,
        defuses,
        userEmail,
      },
    });
    console.log("Match Stats added");
    return NextResponse.json(newMatch);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error adding stats" });
  }
}

// gets all matches in db for signed in user
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  //if no session return the next response error
  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }

  const userEmail = session?.user?.email as string;

  try {
    const matches = await prisma.match.findMany({
      where: {
        userEmail: userEmail
      },
      include: {
        user: { select: { name: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(matches);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
