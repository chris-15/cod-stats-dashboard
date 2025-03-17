export type TMatch = {
  id: string;
  createdAt: string;
  updatedAt: string;
  gameMode: string;
  matchMap: string;
  kills: number;
  deaths: number;
  damage: number;
  win: boolean;
  time: number;
  plants: number;
  defuses: number;
  teamScore: number;
  enemyScore: number;
  userEmail: string;
  user: {
    name: string;
  };
};

export type TMatchQuery = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  gameMode: string;
  matchMap: string;
  kills: number;
  deaths: number;
  damage: number | null;
  win: boolean;
  time: number | null;
  plants: number | null;
  defuses: number | null;
  teamScore: number | null;
  enemyScore: number | null;
  userEmail: string;
  user: {
    name: string | null;
  };
};

export type TGameMode = "Hardpoint" | "Control" | "SearchAndDestroy";

export type BarChartProps = {
  matches: TMatchQuery[];
};