"use client"

function AddStatsForm() {
  return (
    <div>
      <h2>Add Stats</h2>
      <form className="max-w-md mx-auto p-8 rounded shadow-md bg-slate-800">
        <label htmlFor="gameMode" className="">
          GameMode:
        </label>
        <select
          id="gameMode"
          name="gameMode"
          required
          className="mt-1 p-2 w-full border rounded-md text-center"
        >
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
        >
          <option value="win">Win</option>
          <option value="loss">Loss</option>
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
        ></input>

        <button type="submit" className="mt-6 btn">
          Submit
        </button>

        <div className="p-2 text-red-500 font-bold">Error Message</div>
      </form>
    </div>
  );
}
export default AddStatsForm;
