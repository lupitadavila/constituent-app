import * as React from "react";
import { ConstituentProps } from "../types/index.types";


export type ConstituentContextType = {
  constituents: ConstituentProps[];
  selectedConstituentIds: string[];
  setConstituents: React.Dispatch<React.SetStateAction<ConstituentProps[]>>;
  setSelectedConstituentIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export const ConstituentContext = React.createContext<ConstituentContextType | null>(null);

const ConstituentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [constituents, setConstituents] = React.useState<ConstituentProps[]>([]);
  const [selectedConstituentIds, setSelectedConstituentIds] = React.useState<string[]>([])

  return (
    <ConstituentContext.Provider value={{
      constituents,
      setConstituents,
      selectedConstituentIds,
      setSelectedConstituentIds
      }}>
        {children}
    </ConstituentContext.Provider>
  );
};

export default ConstituentProvider;