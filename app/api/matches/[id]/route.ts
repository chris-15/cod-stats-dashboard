import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

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
  const { gameMode, kills, deaths, win, time } = await req.json();
  const id = params.id;
  try {
    const match = await prisma.match.update({
      where: { id },
      data: { gameMode, kills, deaths, win, time },
    });

    return NextResponse.json(match);
  } catch (error) {
    return NextResponse.json({message: "Error updating"})
  }
}

// delete match by id
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const id = params.id;
    try {
      const match = await prisma.match.delete({
        where: { id },
      });
  
      return NextResponse.json(match);
    } catch (error) {
      return NextResponse.json({message: "Error deleting"})
    }
  }

