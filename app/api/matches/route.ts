import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";



//creating/adding match statistics
export async function POST(req: Request) {

  //getting the authenticated user session
  const session = await getServerSession(authOptions);

  //if no session return the next response error  
  if(!session) {
    return NextResponse.json({error: "Not Authenticated"}, {status:401})
  }

  const { gameMode, matchMap, kills, deaths, damage, win, time } = await req.json();

  // hardcoded useremail for now for testing purposes
  const userEmail = "chris.sarm15@gmail.com";
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
        userEmail,
      },
    });
    console.log("Match Stats added");
    return NextResponse.json(newMatch);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error adding stats" });
  }
}

// gets all matches in db
export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      include: {
        user: { select: { name: true } },
      },
      orderBy: {
        createdAt: "desc",
      }
    });
    return NextResponse.json(matches)
  } catch (error) {
    console.log(error)
    return  NextResponse.json({ message: error}, {status: 500 });
  }
}
