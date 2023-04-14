import * as React from "react";
import { ConstituentProps } from "../types/index.types";

export type ConstituentContextType = {
  constituents: ConstituentProps[] | null;
  selectedConstituentIds: string[] | null;
  setConstituents: React.Dispatch<React.SetStateAction<ConstituentProps[] | null >>;
  setSelectedConstituentIds: React.Dispatch<React.SetStateAction<string[] | null >>;
};

export const ConstituentContext = React.createContext<ConstituentContextType | null>(null);

const ConstituentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [constituents, setConstituents] = React.useState<ConstituentProps[] | null>(null);
  const [selectedConstituentIds, setSelectedConstituentIds] = React.useState<string[] | null >(null)

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