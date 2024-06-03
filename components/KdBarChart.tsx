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

  return (
    <div className="border">
      <h2>KD by Result by Map</h2>
      <ResponsiveContainer minHeight={300} maxHeight={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 50}}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" angle={-55} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="kd" fill="#82ca9d" activeBar={<Rectangle fill="pink" stroke="blue" />}/>
          <Bar dataKey="kdW" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />}/>
          <Bar dataKey="kdL" fill="#ffc658" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default KdBarChart;
