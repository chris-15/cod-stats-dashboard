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
  userEmail: string;
  user: {
    name: string;
  };
};

export type TGameMode = "Hardpoint" | "Control" | "SearchAndDestroy";
