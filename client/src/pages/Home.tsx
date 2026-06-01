import CodePreview from "../components/home/CodePreview";
export default function Room()
{
return (
  <div className="min-h-screen bg-[#050816] text-white">

    <nav className="h-16 border-b border-zinc-900 flex items-center px-8">

      <h1 className="text-2xl font-bold">
        <span>Ky</span>
        <span className="text-emerald-400">
          Zen
        </span>
      </h1>

    </nav>

    <section className="max-w-350 mx-auto px-8 h-[calc(100vh-4rem)] flex items-center">

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
    {" "}Together.
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
    max-w-[460px]
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

    
   <div className="w-[55%] flex justify-center items-center">

  <div
    className="
      w-[850px]
      h-[520px]
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