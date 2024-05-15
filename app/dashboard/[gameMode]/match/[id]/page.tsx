import { authOptions } from "@/lib/auth";
import { getMatchById } from "@/server/queries";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { redirect } from "next/navigation";


export default async function GameModeMatchId({
  params: { id: id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  const matchId = id;

  const match = await getMatchById(matchId);
  const mapImages = {
    Highrise:
      "https://utfs.io/f/211e55aa-e30d-4a7c-b3c6-bb292f21eb2e-ewvcet.jpeg",
    Invasion:
      "https://utfs.io/f/edae0bda-acc7-4e7a-8316-f7b43ba3cb3b-n9gwg5.jpeg",
    Karachi:
      "https://utfs.io/f/5f72c810-7f18-4811-ad2b-5077bd0078e8-3lu2zl.jpeg",
    Rio: "https://utfs.io/f/64f2610a-2466-4b6f-ac0f-eb38cb89022f-1qm0.webp",
    Skidrow:
      "https://utfs.io/f/db0224e4-893a-4974-b6ce-19466cf8a297-nnbmah.jpeg",
    Terminal:
      "https://utfs.io/f/5394efdc-5ff5-4eb4-b11d-bf9a7f3fb4d1-6lburo.jpeg",
    SixStar:
      "https://utfs.io/f/44e16bbf-b506-4247-991e-cf710c3c5730-qap3t5.jpeg",
    SubBase:
      "https://utfs.io/f/96dd17f4-faf5-4ff0-ba5c-bd049a14c89a-j0rkzz.jpeg",
    Vista: "https://utfs.io/f/65c7db3a-ffec-4b5f-8ab2-17bc037cbb0d-1cmood.jpeg",
  };

  return (
      <div className=" flex w-full h-full">
        <h1>
          {match.createdAt.toLocaleDateString()}{" "}
          {match.createdAt.toLocaleTimeString()}
        </h1>
        <h2>{match.matchMap}</h2>
        <h2>{match.kills}</h2>
        <h2>{match.deaths}</h2>
        <Image
          src={mapImages[match.matchMap]}
          alt="Picture of in game map loading screen"
          style={{ objectFit: "contain" }}
          width={480}
          height={480}
        />
      </div>
  );
}
