type HeroProps = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  handleJoinRoom :()=>void
  handleCreateRoom :()=>void 
};


export default function Hero({
  userName,
  setUserName,
  roomId,
  setRoomId,
  handleJoinRoom,
  handleCreateRoom,
}: HeroProps)
{
     return (
         <div className="w-[45%]">

   <h1 className="text-6xl font-bold leading-tight">

  <span className="text-white">
    Code
  </span>

  <span
    className="
      bg-gradient-to-r
      from-emerald-400
      to-teal-300
      bg-clip-text
      text-transparent
    "
  >
    {" "}Together,
  </span>

  <br />

  <span className="text-white">
    Execute
  </span>

  <span
    className="
      bg-gradient-to-r
      from-emerald-400
      to-teal-300
      bg-clip-text
      text-transparent
    "
  >
    {" "}Instantly.
  </span>

</h1>

        <p className="mt-6 text-zinc-400 text-lg max-w-130">
          Real-time collaborative coding with shared execution,
          synchronized collaboration and room-based sessions.
        </p>


        <div
  className="
    mt-10
    w-full
    max-w-115
    rounded-3xl
    p-0
  "
>

  <div>
    <label className="text-sm text-zinc-400">
      Display Name
    </label>

    <input
        type="text"
        value={userName}
        onChange={(e) => {
            setUserName(e.target.value);
        }}
        placeholder="vishxl_11"
      className="
        mt-2
        w-full
        h-12
        px-4
        rounded-xl
        bg-[#111827]
        border
        border-zinc-700
        outline-none
        focus:border-emerald-400
      "
    />
  </div>

  <div className="my-6 h-px bg-zinc-800" />

  <div>
    <label className="text-sm text-zinc-400">
      Join Existing Room
    </label>

    <div className="flex gap-3 mt-2">

      <input
        type="text"
        value={roomId}
        onChange={(e) => {
            setRoomId(e.target.value);
        }}
        placeholder="Room Code"
        className="
          flex-1
          h-12
          px-4
          rounded-xl
          bg-[#111827]
          border
          border-zinc-700
          outline-none
          focus:border-emerald-400
        "
      />

      <button
        onClick={handleJoinRoom}
        className="
          px-6
          rounded-xl
          bg-zinc-800
          hover:bg-zinc-700
          transition-colors
        "
      >
        Join
      </button>

    </div>
  </div>

  <div className="my-6 flex items-center">

    <div className="flex-1 h-px bg-zinc-800" />

    <span className="px-3 text-xs text-zinc-500">
      OR
    </span>

    <div className="flex-1 h-px bg-zinc-800" />

  </div>

  <button
     onClick={handleCreateRoom}
    className="
      w-full
      h-12
      rounded-xl
      bg-gradient-to-r
      from-emerald-500
      to-teal-400
      text-white
      font-semibold
      hover:opacity-90
      transition-all
    "
  >
    Create New Room
  </button>

</div>

      </div>
     )
}