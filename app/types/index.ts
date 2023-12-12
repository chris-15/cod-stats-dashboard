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
  userEmail: string;
  user: {
    name: string;
  };
};
