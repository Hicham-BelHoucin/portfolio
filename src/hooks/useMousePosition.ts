import { useEffect, useRef, useState } from "react";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef(true);

  useEffect(() => {
    const mouseMoveHandler = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Check if the mouse is out of the viewport
      if (
        clientX - 25 < 0 ||
        clientY - 25 < 0 ||
        clientX + 10 >= innerWidth ||
        clientY + 10 >= innerHeight
      ) {
        // set display to none
        document.querySelector(".dot")?.setAttribute("style", "display: none");
        document.querySelector(".ring")?.setAttribute("style", "display: none");
        ref.current = false;
        // setMousePosition({ x: innerWidth / 2, y: innerHeight / 2 });
      } else {
        if (!ref.current) {
          const dot = document.querySelector(".dot");

          if (dot) {
            console.log(dot.getAttribute("class"));
            dot.getAttribute("class")?.includes("hovered")
              ? dot.setAttribute("style", "display: none")
              : dot.setAttribute("style", "display: grid");
          }

          document
            .querySelector(".ring")
            ?.setAttribute("style", "display: grid");
          ref.current = true;
        }
        setMousePosition({ x: clientX, y: clientY });
      }
    };

    document.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return mousePosition;
}
