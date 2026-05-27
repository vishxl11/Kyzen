function UserList() {
  return (
    <div className="flex-1 w-full bg-[#111111] rounded-xl p-4 flex gap-4">

      {/* LEFT SIDE */}
      <div className="w-[55%] flex flex-col">

        <div className="text-sm text-zinc-400 mb-3">
          Connected
        </div>

        <div className="flex flex-col gap-3 overflow-auto">

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-white">
              Vishal
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-white">
              Aryan
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-white">
              Akash
            </span>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[45%] flex flex-col justify-between">

        <div>

          <div className="text-xs text-zinc-500 mb-1">
            Room Code
          </div>

          <div className="text-white font-medium mb-4">
            X7A92K
          </div>

          <button
            className="
              text-sm
              px-3
              py-2
              rounded-lg
              bg-zinc-800
              hover:bg-zinc-700
              transition-colors
              text-white
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
            12m 41s
          </div>

        </div>

      </div>

    </div>
  );
}

export default UserList;