import { useEffect, useState } from "react";

const username = `"vishxl_11";`;

export default function CodePreview() {

  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {

    let timeout: number;

    if (!deleting) {

      if (text.length < username.length) {

        timeout = window.setTimeout(() => {

          setText(
            username.slice(0, text.length + 1)
          );

        }, 100);

      } else {

        timeout = window.setTimeout(() => {

          setDeleting(true);

        }, 1200);

      }

    } else {

      if (text.length > 0) {

        timeout = window.setTimeout(() => {

          setText(
            text.slice(0, -1)
          );

        }, 60);

      } else {

        timeout = window.setTimeout(() => {

          setDeleting(false);

        }, 500);

      }

    }

    return () => clearTimeout(timeout);

  }, [text, deleting]);

  return (
    <div
      className="
        relative
        p-8
        font-mono
        text-[18px]
        leading-8
        text-zinc-300
      "
    >

      <div>
        <span className="text-pink-400">
          #include
        </span>

        {" <bits/stdc++.h>"}
      </div>

      <div>
        <span className="text-cyan-300">
          using
        </span>

        {" namespace std;"}
      </div>

      <div>&nbsp;</div>

      <div>
        <span className="text-emerald-300">
          int
        </span>

        {" main() {"}
      </div>

     <div>
  {"    string user = "}

  <span className="text-amber-300">
    {text}
  </span>
</div>

      <div>&nbsp;</div>

      <div>
        {'    cout << "Welcome to KyZen";'}
      </div>

      <div>&nbsp;</div>

      <div>
        {"    return 0;"}
      </div>

      <div>{"}"}</div>

      {/* Collaborator */}

      <div
        className="
          absolute
          transition-all
          duration-100
        "
        style={{
          top: "130px",
          left: `${180 + text.length * 8.6}px`,
        }}
      >

        <div
          className="
            bg-pink-500
            text-white
            text-[10px]
            px-2
            py-1
            rounded-md
            font-semibold
          "
        >
          vishxl_11
        </div>

        <div
          className="
            ml-2
            w-0.5
            h-5
            bg-pink-500
          "
        />

      </div>

    </div>
  );
}