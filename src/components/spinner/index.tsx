import "./spinner.css";

const Spinner = ({
    className
}: {
    className?: string;
}) => {
    return (
        <div className={`lds-ring ${className}`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Spinner;