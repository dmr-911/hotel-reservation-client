import useRoomService from "@/hooks/useRoomService";
import React from "react";

export const RoomContext = React.createContext();
const RoomProvider = ({ children }) => {
  const allData = useRoomService();
  return (
    <RoomContext.Provider value={allData}>{children}</RoomContext.Provider>
  );
};

export default RoomProvider;
