type OutputBoxProps = {
  output: string;
};

function OutputBox({
  output,
}: OutputBoxProps) {
  return (
    <div className="h-[30%] w-full bg-[#111111] rounded-xl p-4 flex flex-col">

      <div className="text-sm text-zinc-400 mb-3">
        Console
      </div>

      <div
        className="
          flex-1
          overflow-auto
          rounded-lg
          bg-[#1a1a1a]
          border
          border-zinc-800
          p-3
          text-sm
          text-zinc-300
          font-mono
        "
      >
        {output || (
          <span className="text-zinc-500">
            Run your code to see output...
          </span>
        )}
      </div>

    </div>
  );
}

export default OutputBox;