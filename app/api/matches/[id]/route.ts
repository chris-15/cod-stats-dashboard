import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth"

// get match by ID 
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  //console.log('Match ID:', params.id);

  try {
    const id = params.id;
    //console.log("id: ", id)
    const match = await prisma.match.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(match);
  } catch (error) {
    console.log(error);
    console.log('Error fetching match:', error);
    return NextResponse.json({ message: "Couldnt fetch" });
  }
}

//update/PUT match by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  //getting the authenticated user session
  const session = await getServerSession(authOptions);

  //if no session return the next response error
  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }

  const { gameMode, matchMap, kills, deaths, damage, win, time, plants, defuses } =
    await req.json();
  const id = params.id;
  try {
    const match = await prisma.match.update({
      where: { id },
      data: { gameMode, matchMap, kills, deaths, damage, win, time, plants, defuses },
    });

    return NextResponse.json(match);
  } catch (error) {
    return NextResponse.json({ message: "Error updating" });
  }
}

// delete match by id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  //getting the authenticated user session
  const session = await getServerSession(authOptions);

  //if no session return the next response error
  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }

  const id = params.id;
  try {
    const match = await prisma.match.delete({
      where: { id },
    });

    return NextResponse.json(match);
  } catch (error) {
    return NextResponse.json({ message: "Error deleting" });
  }
}
