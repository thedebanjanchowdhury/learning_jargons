import DotGrid from "@/components/DotGrid";
import FadeContent from "@/components/FadeContent";
import GlassSurface from "@/components/GlassSurface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type CreateRoomProps = {
  onJoin: () => void;
  onBack: () => void;
};

// const [messages, setMessages] = useState(["Hola"]);

const CreateRoom = ({ onBack }: CreateRoomProps) => {
  4;
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Server Connected");
      setWs(socket);
    };
    socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "roomCreated") {
        setRoomId(data.roomId);
      }
    };

    return () => socket.close();
  }, []);

  const handleCreateRoom = () => {
    ws?.send(JSON.stringify({ type: "createRoom" }));
  };

  const handleJoinRoom = () => {
    ws?.send(JSON.stringify({ type: "joinRoom", roomId }));
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <DotGrid
          dotSize={4}
          gap={60}
          baseColor="#808080"
          activeColor="#ffffff"
          proximity={150}
          shockRadius={10}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          className="opacity-50"
        />
      </div>

      <FadeContent
        blur={true}
        duration={200}
        easing="ease-out"
        initialOpacity={50}
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
          className=" mt-6 flex bg-red-600"
        >
          <div className="flex justify-center font-[Neue-Montreal-Bold] w-[85%]">
            <h1 className="text-white text-4xl cursor-pointer" onClick={onBack}>
              Chatify
            </h1>
          </div>
        </GlassSurface>
      </FadeContent>

      <GlassSurface width={900} height={500} className="mt-24 flex gap-8">
        <div className="w-full h-full flex items-center justify-around">
          <div className=" border-1 h-[80%] w-[45%] p-4 rounded-3xl flex flex-col items-center justify-center gap-4">
            <Button
              variant="outline"
              className="text-3xl p-8 cursor-pointer"
              onClick={handleCreateRoom}
            >
              Create Room
            </Button>

            {roomId && (
              <p className="text-white text-xl mt-4 flex flex-col items-center">
                Room Created: <br />
                <span
                  className="font-bold underline cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(roomId);
                    toast("Copied to Clipboard");
                  }}
                >
                  {roomId}
                </span>
              </p>
            )}
          </div>

          <div
            className="text-white border-1 w-[45%] h-[80%] 
          flex flex-col items-center 
          justify-center gap-4 rounded-2xl"
          >
            <h1 className="text-4xl font-[Neue-Montreal-Bold]">Join Room</h1>

            <Input
              type="text"
              placeholder="Enter Room Code"
              className="w-[70%] mt-10 scale-120"
            />
            <Button
              variant="outline"
              className="text-2xl bg-white text-black py-6 cursor-pointer 
              w-[85%] mt-4"
              onClick={handleJoinRoom}
            >
              Join
            </Button>
          </div>
        </div>
      </GlassSurface>
    </div>
  );
};

export default CreateRoom;
