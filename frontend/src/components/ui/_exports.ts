import { useContext, createContext } from "react";

// sidebar.tsx context
export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);
// sidebar.tsx context hook
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// animated-modal.tsx context
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);
// animated-modal.tsx context hook
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
