"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function AddStatsForm() {
  const [gameMode, setGameMode] = useState<string>("");
  const [win, setWin] = useState<boolean>(false);
  const [kills, setKills] = useState<number>(0);
  const [deaths, setDeaths] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gameMode) {
      setError("Game Mode is required");
      return;
    }

    try {
      const res = await fetch("api/matches/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameMode, win, kills, deaths, time }),
      });
      if(res.ok) {
        console.log(res.json())
        router.push('/dashboard')
      }
    } catch (error) {console.log(error)}
  };

  return (
    <div>
      <h2>Add Stats</h2>
      <form
        className="max-w-md mx-auto p-8 rounded shadow-md bg-slate-800"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="gameMode" className="">
          GameMode:
        </label>
        <select
          id="gameMode"
          name="gameMode"
          required
          className="mt-1 p-2 w-full border rounded-md text-center"
          onChange={(e) => setGameMode(e.target.value)}
        >
          <option value="">Select a Game Mode</option>
          <option value="Hardpoint">Hardpoint</option>
          <option value="Control">Control</option>
          <option value="SearchAndDestroy">Search and Destroy</option>
        </select>

        <label htmlFor="outcome" className="">
          Outcome:
        </label>
        <select
          id="outcome"
          name="outcome"
          required
          className="mt-1 p-2 w-full border rounded-md text-center"
          onChange={(e) => setWin(e.target.value === "Win")}
        >
          <option value="">Did you Win or Lose?</option>
          <option value="Win">Win</option>
          <option value="Loss">Loss</option>
        </select>

        <label htmlFor="kills" className="">
          Kills:
        </label>
        <input
          type="number"
          id="kills"
          name="kills"
          required
          placeholder="0"
          min="0"
          className="mt-1 p-2 w-full border rounded-md"
          onChange={(e) => setKills(Number(e.target.value))}
        ></input>

        <label htmlFor="deaths" className="">
          Deaths:
        </label>
        <input
          type="number"
          id="deaths"
          name="deaths"
          required
          placeholder="0"
          min="0"
          className="mt-1 p-2 w-full border rounded-md"
          onChange={(e) => setDeaths(Number(e.target.value))}
        ></input>

        <label htmlFor="time" className="">
          Time:
        </label>
        <input
          type="number"
          id="time"
          name="time"
          placeholder="Use only for Hardpoint"
          min="0"
          className="mt-1 p-2 w-full border rounded-md"
          onChange={(e) => setTime(Number(e.target.value))}
        ></input>

        <button type="submit" className="mt-6 btn">
          Submit
        </button>

        {error && <div className="p-2 text-red-500 font-bold">{error}</div>}
      </form>
    </div>
  );
}
export default AddStatsForm;
