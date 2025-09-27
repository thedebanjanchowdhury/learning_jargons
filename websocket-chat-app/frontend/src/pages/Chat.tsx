import FadeContent from "@/components/FadeContent";
import GlassSurface from "@/components/GlassSurface";
import { useEffect, useState } from "react";

type chatProps = {
  onBack: () => void;
};

const Chat = ({ onBack }: chatProps) => {
  const [message, setMessage] = useState([""]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (msg) => {
      setMessage(m => [...m, msg.data])
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <FadeContent
        blur={true}
        duration={200}
        easing="ease-out"
        initialOpacity={50}
        className="mt-6"
      >
        <GlassSurface
          width={900}
          displace={15}
          distortionScale={-150}
          redOffset={5}
          greenOffset={15}
          blueOffset={25}
          brightness={60}
          opacity={0.8}
          mixBlendMode="screen"
          className=" flex bg-red-600"
        >
          <div className="flex justify-center font-[Neue-Montreal-Bold] w-[85%]">
            <h1 className="text-black text-4xl cursor-pointer" onClick={onBack}>
              Chatify
            </h1>
          </div>
        </GlassSurface>
      </FadeContent>
    </div>
  );
};

export default Chat;
