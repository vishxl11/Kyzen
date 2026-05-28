type RunButtonProps = {
   onClick: () => void;
   isRunning: boolean;
};

function RunButton({
   onClick,
   isRunning
}: RunButtonProps) {
  return (
    <button
      className="
  h-10
  px-3
  rounded-lg
  bg-emerald-500
  hover:bg-emerald-400
  transition-colors
  text-black
  font-medium
  flex
  items-center
  justify-center
  gap-1
  select-none
  self-start
"
   onClick={onClick} >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M4.5 3.75a.75.75 0 011.14-.64l13.5 8.25a.75.75 0 010 1.28l-13.5 8.25A.75.75 0 014.5 20.25V3.75z"
          clipRule="evenodd"
        />
      </svg>

          {
            isRunning
            ? "Running..."
            : "Run"
         }
    </button>
  );
}

export default RunButton;