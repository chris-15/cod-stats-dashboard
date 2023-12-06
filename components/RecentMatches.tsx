import { Match } from "@/app/types";

const getMatches = async (): Promise<Match[] | null > => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/matches`);

    if (res.ok) {
      const matches = await res.json();
      return matches;
    }
  } catch (error) {
    console.log(error);
    
  }
  return null;
};

async function RecentMatches() {
  const recentMatches = await getMatches();
  return (
    <h1>
      Recent Matches
      <div>
        {recentMatches &&
          recentMatches.map((match) => (
            <div className="flex gap-2" key={match.id}>
              <p>{match.gameMode}</p>
              <p>{match.kills}</p>
              <p>{match.deaths}</p>
              <p>{match.time}</p>
            </div>
          ))}
      </div>
    </h1>
  );
}
export default RecentMatches;
