import React, { useContext } from "react";
import useMousePosition from "../../hooks/useMousePosition";
import { MouseContext } from "../../context/mouse-context";
import { IoMdArrowBack } from "react-icons/io";

const DotRing = () => {
    // 1.
    const { cursorType, cursorChangeHandler } = useContext(MouseContext);
    // const cursorType = "hovered";

    const { x, y } = useMousePosition();

    console.log("dot" + cursorType);

    return (
        <>
            {/* 2. */}
            <div
                style={{ left: `${x}px`, top: `${y}px` }}
                className={"ring " + cursorType + " !shadow-none ring-0"}
            >
                {cursorType === "hovered" && (
                    <div className="transform rotate-[145deg] bg-background-400 flex items-center justify-center rounded-full transition-all">
                        <IoMdArrowBack size={20} />
                    </div>
                )}
            </div>
            <div
                className={"dot " + cursorType + `${cursorType === "hovered" ? " !hidden" : ""}`}
                style={{ left: `${x}px`, top: `${y}px` }}
            ></div>
        </>
    );
};

export default DotRing;