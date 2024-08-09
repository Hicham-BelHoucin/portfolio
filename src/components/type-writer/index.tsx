import React from "react";

const Typewriter = ({
    text,
    delay = 100,
}: {
    text: string;
    delay?: number;
}) => {
    const [currentText, setCurrentText] = React.useState("");
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prevText) => prevText + text[currentIndex]);
                setCurrentIndex((prevIndex) => prevIndex + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, delay, text]);

    return <span>{currentText}</span>;
}

export default Typewriter;