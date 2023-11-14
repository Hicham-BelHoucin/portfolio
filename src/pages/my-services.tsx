import Heading from "../components/heading";

const services = [
    {
        icon: "icon.png",
        title: "Mobile Development",
        description: `Unlocking the potential of mobile platforms is my expertise. With proficiency in React Native, I craft seamless and intuitive mobile applications for both iOS and Android, ensuring a rich user experience. From concept to deployment, I've got your mobile development needs covered.`,
    },
    {
        icon: "web icon.png",
        title: "Web Development",
        description: `Elevate your online presence with my web development prowess. Using cutting-edge technologies such as React, Node.js, and more, I create responsive and dynamic web applications. My focus is on delivering scalable solutions that align with your business objectives.`,
    },
    {
        icon: "web-scraping.png",
        title: "Web Scraping",
        description: `Harnessing the power of data is my specialty with expert web scraping services. I specialize in extracting valuable insights from the vast expanse of the web, providing you with the information you need to make informed decisions. Whether you're looking to gather market intelligence, monitor competitors, or aggregate content, my web scraping solutions are tailored to meet your specific requirements. I navigate through the complexities of web data, delivering structured and usable information for your business. My ethical and efficient approach ensures compliance with all legal and ethical standards. From custom scrapers to scheduled data updates, I offer a seamless and reliable web scraping experience, empowering you with the data you need to stay ahead in the digital landscape.`,
    },
]

const Service = ({ icon, title, description }: {
    icon: string;
    title: string;
    description: string;
}) => {
    return (
        <div className="max-w-md max-h-[500px] h-full flex flex-col justify-center items-center p-4 gap-4 bg-white border border-gray-200 rounded-lg shadow text-black">
            <img src={icon} alt="" className=" w-16 object-cover" />
            <div className="text-xl font-bold text-[#170550]">{title}</div>
            <div className=" text-[#170550] text-center max-h-40 md:max-h-60 overflow-y-auto">
                {description}
            </div>
        </div>
    )
}


export default function MyServices() {
    return (
        <div className="flex flex-col container items-center gap-8 justify-center text-white p-8 m-auto">
            <Heading title="My Services" />
            <div className="grid place-items-center justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
                {
                    services.map((service) => (
                        <Service
                            key={service.title}
                            {...service}
                        />
                    ))
                }
            </div>
        </div>
    );
}
