function InputBox() {
  return (
   <div className="h-[24%] w-full bg-[#111111] rounded-xl p-4 flex flex-col">
      
      <h2 className="text-white text-sm font-medium mb-3">
        Input
      </h2>

      <textarea
  className="
    flex-1
    w-full
    resize-none
    rounded-lg
    bg-[#1a1a1a]
    text-white
    p-3
    outline-none
    border
    border-zinc-800
    focus:border-zinc-600
    scrollbar
    scrollbar-thumb-zinc-700
    scrollbar-track-transparent
  "
/>

    </div>
  );
}

export default InputBox;