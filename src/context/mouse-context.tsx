import React, { createContext, useState } from "react";

export const MouseContext = createContext({
    cursorType: "",
    cursorChangeHandler: (v: string) => { },
});

const MouseContextProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [cursorType, setCursorType] = useState("");

    const cursorChangeHandler = (cursorType: string) => {
        setCursorType(cursorType);
    };

    return (
        <MouseContext.Provider
            value={{
                cursorType: cursorType,
                cursorChangeHandler: cursorChangeHandler,
            }}
        >
            {children}
        </MouseContext.Provider>
    );
};

export default MouseContextProvider;