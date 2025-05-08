"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type sidebarContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SideBarContext = createContext<sidebarContextType | null>(null);
export default function SideBarContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <SideBarContext.Provider value={{ open, setOpen }}>
      {children}
    </SideBarContext.Provider>
  );
}

export const useSideBarContextHook = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("no sidebar context");
  }
  return context;
};
