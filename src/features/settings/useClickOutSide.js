import { useEffect } from "react";
import { useRef } from "react";

export function useClickOutSide(hander, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          hander();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },

    [hander, listenCapturing]
  );

  return ref;
}
