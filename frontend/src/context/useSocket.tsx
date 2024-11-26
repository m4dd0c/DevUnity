import { useContext } from "react";
import { SocketContext } from "./context";

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
};
