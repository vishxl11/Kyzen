function Navbar() {
  return (
    <nav className="h-10 px-6 flex items-center  border-b border-zinc-900 bg-green-300">

      <h1
        className="
          text-zinc-100
          text-[1.05rem]
          font-semibold
          tracking-wide
          select-none
        "
      >
        <span className="text-emerald-500 mr-1"></span>
        Kyzen
      </h1>

    </nav>
  );
}

export default Navbar;