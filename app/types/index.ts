export type Match = {
  id: string;
  createdAt: string;
  updatedAt: string;
  gameMode: string;
  kills: number;
  deaths: number;
  win: boolean;
  time: number;
  userEmail: string;
  user: {
    name: string;
  };
};