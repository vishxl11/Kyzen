import CodePreview from "../components/home/CodePreview";
import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function Room()
{   const [userName, setUserName] = useState("");
    const [roomId, setRoomId] = useState("");
     const navigate = useNavigate();

    function handleJoinRoom() {
      if (!userName.trim()) return;

          localStorage.setItem(
            "userName",
            userName.trim()
          );

          navigate(`/room/${roomId}`);
        }


      function handleCreateRoom() {

      if (!userName.trim()) return;

      const roomId = uuidv4();

      localStorage.setItem(
        "userName",
        userName.trim()
      );

      navigate(`/room/${roomId}`);
    }



return (
  <div className="min-h-screen bg-[#050816] text-white">

    <Navbar/>
    <section className="max-w-350 mx-auto px-8 h-[calc(100vh-4rem)] flex items-center">

     <Hero
      userName={userName}
      setUserName={setUserName}
      roomId={roomId}
      setRoomId={setRoomId}
     handleJoinRoom={handleJoinRoom}
     handleCreateRoom={handleCreateRoom}/>

   <div className="w-[55%] flex justify-center items-center">

  <div
    className="
      w-212.5
      h-130
      rounded-3xl
      bg-[#0B1220]
      border border-zinc-800/60
      overflow-hidden
      shadow-[0_20px_60px_rgba(0,0,0,0.35)]
    "
  >

      {/* Top Bar */}

      <div className="h-12 border-b border-zinc-800 flex items-center px-5 gap-2">

        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-emerald-500" />

        <div
          className="
            ml-4
            px-3
            py-1
            rounded-lg
            bg-[#111827]
            text-xs
            text-zinc-400
          "
        >
          main.cpp
        </div>

      </div>

      {/* Preview */}

      <div className="p-8">

        <CodePreview />

      </div>

  </div>

</div>
    

    </section>

  </div>
);
}