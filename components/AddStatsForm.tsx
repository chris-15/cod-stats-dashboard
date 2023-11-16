function AddStatsForm() {

  
  return (
    <div>
      <h2>Add Stats</h2>
      <form className="max-w-md mx-auto p-8 rounded shadow-md bg-slate-800">
        <label htmlFor="gameMode" className="block mt-4 text-sm font-medium">
          GameMode:
        </label>
        <select
          id="gameMode"
          name="gameMode"
          required
          className="mt-1 p-2 w-full border rounded-md text-center"
        >
          <option value="hardpoint">Hardpoint</option>
          <option value="control">Control</option>
          <option value="searchAndDestroy">Search and Destroy</option>
        </select>

        <label htmlFor="kills" className="block mt-4 text-sm font-medium">
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

        <label htmlFor="kills" className="block mt-4 text-sm font-medium">
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
        <label htmlFor="outcome" className="block mt-4 text-sm font-medium">
          Outcome:
        </label>
        <select
          id="outcome"
          name="outcome"
          required
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="win">Win</option>
          <option value="loss">Loss</option>
        </select>
        <button type="submit" className="mt-6 btn">
          Submit
        </button>

        <div className="p-2 text-red-500 font-bold">Error Message</div>
      </form>
    </div>
  );
}
export default AddStatsForm;
