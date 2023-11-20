import RoomProvider from "@/context/RoomProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <RoomProvider>
      <Component {...pageProps} />
    </RoomProvider>
  );
}
