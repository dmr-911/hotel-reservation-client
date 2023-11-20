const { useState } = require("react");

const useRoomService = () => {
  const [rType, setRType] = useState("");

  return { rType, setRType };
};

export default useRoomService;
