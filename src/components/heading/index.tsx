export default function Heading({ title }: {
    title: string
}) {
    return (
        <h1
            className="relative text-white text-xl md:text-4xl font-semibold w-full text-center p-4
                before:absolute before:w-[25%] before:max-w-[250px] before:min-w-[120px] before:h-1 before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2  before:rounded-full before:bg-white before:content-['']
            "
        >
            {title.split(' ')[0]} <span className=" text-primary-500">{title.split(' ')[1]}</span>
        </h1>
    );
}
