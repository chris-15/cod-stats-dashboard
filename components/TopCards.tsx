function TopCards() {
  return (
    <div className="grid lg:grid-cols-6 gap-4 p-4 text-black">
        {/* TODO: refactor this so you dont repeat yourself- just for basic view for right now */}
        {/* hardpoint */}
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col">
          <p className=" font-bold text-2xl">Hardpoint</p>
          <p>k/d</p>
        </div>
        <div className="flex flex-col text-center">
        <p className="text-2xl font-bold">W/L</p>
        <p> 55%</p>
        </div>
      </div>
      {/* control */}
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col">
          <p className=" font-bold text-2xl">Control</p>
          <p>k/d</p>
        </div>
        <div className="flex flex-col text-center">
        <p className="text-2xl font-bold">W/L</p>
        <p> 55%</p>
        </div>
      </div>
      {/* search */}
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col">
          <p className=" font-bold text-2xl">Search And Destroy</p>
          <p>k/d</p>
        </div>
        <div className="flex flex-col text-center">
        <p className="text-2xl font-bold">W/L</p>
        <p> 55%</p>
        </div>
      </div>

    </div>
  );
}
export default TopCards;
