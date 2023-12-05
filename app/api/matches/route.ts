import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


//creating/adding match statistics
export async function POST(req: Request) {
  const { gameMode, kills, deaths, win, time } = await req.json();

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
        kills,
        deaths,
        win,
        time,
        userEmail,
      },
    });
    console.log("Match Stats added");
    return NextResponse.json(newMatch);
  } catch (error) {
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
