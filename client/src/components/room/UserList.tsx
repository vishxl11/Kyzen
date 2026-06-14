type UserListProps = {
  connectedUsers: string[];
  roomId?: string;
  roomActiveTime : number ;
};

function UserList({
  connectedUsers,
  roomId,
  roomActiveTime,
}: UserListProps)
{
  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}m ${s}s`
}
  
  return (
    <div className="flex-1 w-full bg-[#111111] rounded-xl p-4 flex gap-4">

      {/* LEFT SIDE */}
      <div className="w-[55%] flex flex-col">

        <div className="text-sm text-zinc-400 mb-3">
          Connected
        </div>

 <div className="flex flex-col gap-2 overflow-auto">

  {connectedUsers.length === 0 ? (
    <span className="text-zinc-500 text-sm">
      No users connected
    </span>
  ) : (
    connectedUsers.map((user) => (
      
      <div
        key={user}
        className="
          flex
          items-center
          gap-2
          px-2
          py-1
          rounded-md
          hover:bg-zinc-900
          transition-colors
        "
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>

        <span className="text-sm text-white">
          {user}
        </span>
      </div>
    ))
  )}

</div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[45%] flex flex-col justify-between">

        <div>

          <div className="text-xs text-zinc-500 mb-1">
            Room Code
          </div>

          <div className="text-white font-medium mb-4">
           {roomId ?? "Unknown"}
          </div>

          <button
             onClick={() => navigator.clipboard.writeText(roomId ?? "")}
             
            className="
              text-sm
              px-3
              py-2
              rounded-lg
              bg-zinc-800
              hover:bg-zinc-700
              transition-colors
              text-white
              cursor-pointer
            "
          >
            Invite
          </button>

        </div>

        <div>

          <div className="text-xs text-zinc-500 mb-1">
            Room Active
          </div>

          <div className="text-sm text-zinc-300">
            {formatTime(roomActiveTime)};
          </div>

        </div>

      </div>

    </div>
  );
}

export default UserList;