function LanguageSelector()
{
     return(
        <div className="text-blue-500 mt-2 mb-1.5 ml-4">
             <select
        defaultValue="cpp"
        className="
          bg-[#111111]
          text-white
          px-4
          h-full
          rounded-lg
          outline-none
          border
          border-zinc-700
          hover:border-zinc-500
          focus:border-blue-500
          transition-all
          cursor-pointer
        "
      >
        <option value="cpp">C++</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
        </div>
     )
}

export default LanguageSelector ;