"use client";

import { TMatch, TMatchQuery } from "@/app/types";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type KDBarChartProps = {
  matches: TMatchQuery[];
};

type TData = {
  name: string;
  kd: number;
  kdW: number;
  kdL: number;
};

function KdBarChart({ matches }: KDBarChartProps) {
  function getKdData(matches: TMatchQuery[]) {
    let mapKills: {
      [map: string]: {
        killsW: number;
        killsL: number;
        deathsW: number;
        deathsL: number;
      };
    } = {};

    let mapKds: { [map: string]: { kd: number; kdW: number; kdL: number } } =
      {};

    matches.forEach((obj) => {
      if (mapKills[obj.matchMap]) {
        if (obj.win === true) {
          mapKills[obj.matchMap].killsW += obj.kills;
          mapKills[obj.matchMap].deathsW += obj.deaths;
        } else {
          mapKills[obj.matchMap].killsL += obj.kills;
          mapKills[obj.matchMap].deathsL += obj.deaths;
        }
      } else {
        mapKills[obj.matchMap] = {
          killsW: 0,
          killsL: 0,
          deathsW: 0,
          deathsL: 0,
        };
        if (obj.win === true) {
          mapKills[obj.matchMap].killsW += obj.kills;
          mapKills[obj.matchMap].deathsW += obj.deaths;
        } else {
          mapKills[obj.matchMap].killsL += obj.kills;
          mapKills[obj.matchMap].deathsL += obj.deaths;
        }
      }
    });

    for (let map in mapKills) {
      let killsW = mapKills[map].killsW;
      let killsL = mapKills[map].killsL;
      let deathsW = mapKills[map].deathsW;
      let deathsL = mapKills[map].deathsL;

      let kd = +((killsW + killsL) / (deathsW + deathsL)).toFixed(2);
      let kdW = +(killsW / deathsW).toFixed(2);
      let kdL = +(killsL / deathsL).toFixed(2);

      mapKds[map] = { kd, kdW, kdL };
    }

    let sortedMapKds = Object.keys(mapKds)
      .sort()
      .map((key) => ({ name: key, ...mapKds[key] }));

    return sortedMapKds;
  }

  const data = (getKdData(matches));

  const CustomTooltip = ({ active, payload, label }:any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#16181c] p-4 rounded-lg border">
         <p>{`${label}`}</p>
          <p className="text-[#b0ff34]">{`K/D: ${payload[0].value}`}</p>
          <p className="text-[#AC4FC6]">{`K/D in W: ${payload[1].value}`}</p>
          <p className="text-[#FFA400]">{`K/D in L: ${payload[2].value}`}</p>
         
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className="bg-secondary-bg border border-[#444444] rounded-lg">
      <h2 className="text-center pt-4">KD by Result by Map</h2>
      <ResponsiveContainer minHeight={300} maxHeight={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 50}}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" angle={-55} textAnchor="end" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="kd" fill="#b0ff34" activeBar={<Rectangle fill="pink" stroke="blue" />}/>
          <Bar dataKey="kdW" fill="#AC4FC6" activeBar={<Rectangle fill="pink" stroke="blue" />}/>
          <Bar dataKey="kdL" fill="#FFA400" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default KdBarChart;
