"use client"

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Match } from "@/app/types";

type MatchesContextType = {
  matches: Match[];
  fetchMatches: () => Promise<void>;
};
//create context for matches
const MatchesContext = createContext<MatchesContextType | null>(null);

//custom hook that uses matches context
export const useMatches = () => {
  const context = useContext(MatchesContext);
  if (context === null) {
    throw new Error("useMatches must be used within a MatchesProvider");
  }
  return context;
};

type MatchesProviderProps = {
  children: ReactNode;
};

// matches provider that manages the state for matches whichh can be used globallly within the app
export const MatchesProvider: React.FC<MatchesProviderProps> = ({
  children,
}) => {
  const [matches, setMatches] = useState<Match[]>([]);

  // fetching match data from api and setting matches state
  const fetchMatches = async () => {
    try {
      const res = await fetch(`/api/matches`);

      if (res.ok) {
        const fetchedMatches: Match[] = await res.json();
        setMatches(fetchedMatches);
        //console.log(fetchedMatches)
      }
    } catch (error) {
      console.log(error);
    }
  };

  //hook to fetch matches- only runs once 
  useEffect(() => {
    fetchMatches();
  }, []);

  const contextValue: MatchesContextType = {
    matches,
    fetchMatches,
  };

  // returning context provider to wrap dashboard in so it can access the matches state
  return (
    <MatchesContext.Provider value={contextValue}>
      {children}
    </MatchesContext.Provider>
  );
};
