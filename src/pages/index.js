import Home from "@/components/Home";
import useRoom from "@/hooks/useRoom";

export default function App() {
  const { room } = useRoom();
  // console.log(room);
  return (
    <div>
      <Home />
    </div>
  );
}
