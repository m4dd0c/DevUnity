// sidebar.tsx
interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}
// animated-modal.tsx
interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}
