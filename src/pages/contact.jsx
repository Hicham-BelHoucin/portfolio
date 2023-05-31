import Layout from "./layout";
import "./../styles/contact.css";
import axios from "axios";
import Input from "../components/input";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validateEmail = (email) => {
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
            password: apiKey,
          },
        })
        .then((response) => {
          setSent(true);
          console.log("Email sent successfully!", response);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    }
  };

  return (
    <Layout className="about">
      <div className="contact">
        {!sent ? (
          <>
            <div className="email-name slide-in-bck-right">
              <Input
                label="Name"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
              />
              <Input
                label="Email"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
            </div>
            <div className="slide-in-bck-left">
              <Input
                label="Subject"
                value={data.subject}
                onChange={(e) => {
                  setData({ ...data, subject: e.target.value });
                }}
              />
            </div>
            <div className="input-container">
              <label htmlFor="input" className="label slide-in-bck-left">
                Message
              </label>
              <textarea
                className="slide-in-bck-right"
                id="message"
                rows="6"
                placeholder="Write your thoughts here..."
                value={data.message}
                onChange={(e) => {
                  setData({ ...data, message: e.target.value });
                }}
              ></textarea>
            </div>
            <div className="slide-in-bck-right">
              <button className="primary" onClick={sendEmail}>
                Submit Now
              </button>
            </div>
          </>
        ) : (
          <>
            <div
              className="name bounce-in-top"
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              Eamil Sent Successfully
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="bounce-in-right"
            >
              <Link to="/">
                <button className="primary">Go Back</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
