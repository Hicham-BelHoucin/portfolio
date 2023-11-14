import Heading from "../components/heading";
import { Phone, Mail, MapPin } from "lucide-react";
import Input from "../components/input";
import Button from "../components/button";
import axios from "axios";
import { useState } from "react";

export default function Contact() {
    const [sent, setSent] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        Phone: "",
        subject: "",
        message: "",
    });

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const sendEmail = () => {
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert("Please fill in all the fields !!!");
            // You can add further code here to handle the case when any field is empty
        } else if (!validateEmail(data.email)) {
            alert("Please enter a valid email !!!!");
        } else {
            const apiKey = process.env.REACT_APP_API_KEY;
            const domain = process.env.REACT_APP_DOMAIN;

            const formData = new FormData();
            // formData.append("from", "Hicham belhoucin <belhoucin.hicham@gmail.com>");
            formData.append("from", `${data.name} <${data.email}>`);
            formData.append("to", "belhoucin.hicham@gmail.com");
            formData.append("subject", data.subject);
            formData.append("text", data.message);

            axios
                .post(`https://api.mailgun.net/v3/${domain}/messages`, formData, {
                    auth: {
                        username: "Hicham Bel Houcin",
                        password: apiKey || "",
                    },
                })
                .then((response) => {
                    setSent(true);
                    console.log("Email sent successfully!");
                })
                .catch((error) => {
                    console.error("Error sending email:", error);
                });
        }
    };
    return (
        <div className="flex flex-col container items-center gap-8 justify-center text-white p-8 m-auto    ">
            <Heading title="Contact" />
            <div className="flex gap-6 items-center justify-center w-full max-w-6xl flex-col-reverse md:flex-row">
                <div className="flex flex-col gap-4 w-full text-xs md:text-base">
                    <div className="flex items-center gap-4">
                        <Phone size={24} />
                        <div>Phone : +212 676793918</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail size={24} />
                        <div>
                            Email :
                            <a
                                href="mailto:belhoucin.hicham@gmail.com"
                                className="text-primary-500"
                            >
                                {" "}
                                belhoucin.hicham@gmail.com
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <MapPin size={24} />
                        <div>Address : El Kasba Street, Imintanout City, Morocco</div>
                    </div>
                </div>
                <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                    {!sent ? (
                        <>
                            <Input placeholder="Full Name"
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                value={data.name}
                            />
                            <Input placeholder="Email Address"
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                value={data.email}
                            />
                            <div className="flex w-full gap-4">
                                <Input className="w-full" placeholder="Phone Number"
                                    onChange={(e) => setData({ ...data, Phone: e.target.value })}
                                    value={data.Phone}
                                />
                                <Input className="w-full" placeholder="Subject"
                                    onChange={(e) => setData({ ...data, subject: e.target.value })}
                                    value={data.subject}
                                />
                            </div>
                            <Input placeholder="Your Message" className=" h-24"
                                onChange={(e) => setData({ ...data, message: e.target.value })}
                                value={data.message}
                            />
                            <Button className="!px-16" onClick={sendEmail}>
                                Send
                            </Button>

                        </>
                    ) : (

                        <div>
                            <div className="text-green-500">Your message has been sent successfully</div>
                            <Button className="!px-16" onClick={() => setSent(false)}>
                                Send another message
                            </Button>
                        </div>
                    )

                    }
                </div>
            </div>
        </div>
    );
}
