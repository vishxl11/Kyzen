function Input() {
  return (
    <div className="w-[22vw] min-w-62.5 h-full bg-[#111111] rounded-lg p-4 flex flex-col">
      
      <h2 className="text-white text-lg font-semibold mb-3">
        Input
      </h2>

      <textarea
        placeholder="Enter input here..."
        className="
          flex-1
          w-full
          resize-none
          rounded-md
          bg-[#1a1a1a]
          text-white
          p-3
          outline-none
          border
          border-zinc-700
          focus:border-blue-500
        "
      />
      
    </div>
  );
}

export default Input;