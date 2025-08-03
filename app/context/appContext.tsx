import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppContextType {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  credits: number;
  setCredits: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [credits, setCredits] = useState(20); // <- ESTO FALTABA

  useEffect(() => {
    AsyncStorage.getItem("selectedDate").then((value) => {
      if (value) setSelectedDate(new Date(value));
    });
    AsyncStorage.getItem("credits").then((value) => {
      if (value) setCredits(Number(value));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("selectedDate", selectedDate.toISOString());
  }, [selectedDate]);

  useEffect(() => {
    AsyncStorage.setItem("credits", credits.toString());
  }, [credits]);

  return (
    <AppContext.Provider
      value={{ selectedDate, setSelectedDate, credits, setCredits }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
