import { Match } from "@/app/types";

const getMatches = async (): Promise<Match[] | null> => {
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
  //console.log(recentMatches)

  return (
    <div>
      <h1>Recent Matches</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Game Mode</th>
              <th>W/L Result</th>
              <th>Kills</th>
              <th>Deaths</th>
              <th>Time</th>
              <th>K/D Ratio</th>
            </tr>
          </thead>
          <tbody>
            {recentMatches &&
              recentMatches.map((match) => (
                <tr className="" key={match.id}>
                  <td>{match.gameMode}</td>
                  {match.win === true ? <td>Win</td> : <td>Loss</td>}
                  <td>{match.kills}</td>
                  <td>{match.deaths}</td>
                  <td>{match.gameMode === "Hardpoint" ? match.time : "N/A"}</td>
                  <td>{(match.kills/match.deaths).toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default RecentMatches;
