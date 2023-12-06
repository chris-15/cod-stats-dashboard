import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// get match by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    //console.log("id: ", id)
    const match = await prisma.match.findUnique({ where: { id } });
    return NextResponse.json(match);
  } catch (error) {
    console.log(error);
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

  const { gameMode, kills, deaths, win, time } = await req.json();
  const id = params.id;
  try {
    const match = await prisma.match.update({
      where: { id },
      data: { gameMode, kills, deaths, win, time },
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
