import Navbar from "./components/navbar";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import Experience from "./pages/career";
import Education from "./pages/about";
import Footer from "./components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Contact from "./pages/contact";

// const Contact = () => {
//   return (
//     <div className="flex gap-[20px] mx-[20px] flex-col">
//       <div className=" w-full mmd:w-[662px] h:w-[436px] h-[620px] rounded-[40px] bg-background-900 p-4">
//         <div className=" ">
//           <p className="text-text-100 text-[18px] xsm:text-[24px] sm:text-[30px]  font-['Montserrat'] font-extrabold flex gap-4">
//             <svg
//               width="40"
//               height="40"
//               viewBox="0 0 19 18"
//               fill="currentColor"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M12.541 0.584765C12.6867 0.678582 12.8055 0.808649 12.8858 0.962217C12.9661 1.11579 13.0051 1.28758 12.999 1.46077L12.986 1.59277L12.268 5.81777C12.2222 6.08796 12.2324 6.36468 12.298 6.63077L12.357 6.82777L14.167 11.8778C15.047 12.0518 15.827 12.2778 16.434 12.5548C16.8 12.7218 17.158 12.9308 17.438 13.2008C17.719 13.4718 18 13.8838 18 14.4248C18 15.2728 17.337 15.7948 16.88 16.0648C16.357 16.3738 15.666 16.6178 14.9 16.8088C13.352 17.1958 11.266 17.4248 9 17.4248C6.734 17.4248 4.648 17.1958 3.1 16.8088C2.334 16.6178 1.643 16.3738 1.12 16.0648C0.663 15.7948 0 15.2728 0 14.4248C0 13.8848 0.28 13.4718 0.562 13.2008C0.842 12.9308 1.2 12.7208 1.566 12.5548C2.098 12.3118 2.761 12.1088 3.508 11.9448L3.834 11.8768L6.294 5.01077C6.55124 4.29245 7.00855 3.66268 7.612 3.19577L7.818 3.04677L11.44 0.596766C11.6021 0.48709 11.7928 0.427398 11.9885 0.425087C12.1843 0.422776 12.3763 0.478948 12.541 0.584765ZM12.423 12.9408C11.44 13.2548 10.247 13.4248 9 13.4248C7.753 13.4248 6.56 13.2548 5.577 12.9408L5.522 13.0948C5.46202 13.2626 5.35826 13.4114 5.22148 13.5257C5.08469 13.6399 4.91984 13.7156 4.744 13.7448C3.707 13.9158 2.908 14.1408 2.396 14.3748C2.296 14.4198 2.45 14.5038 2.678 14.5908L2.888 14.6638L3.214 14.7658L3.586 14.8688C4.933 15.2058 6.848 15.4248 9 15.4248C11.009 15.4248 12.81 15.2348 14.137 14.9348L14.457 14.8578L14.786 14.7658L15.002 14.6998L15.22 14.6278C15.5 14.5278 15.717 14.4258 15.604 14.3748C15.092 14.1408 14.294 13.9158 13.256 13.7448C13.0802 13.7156 12.9153 13.6399 12.7785 13.5257C12.6417 13.4114 12.538 13.2626 12.478 13.0948L12.423 12.9408ZM10.622 3.56477L8.939 4.70477C8.63842 4.90819 8.39886 5.18958 8.246 5.51877L8.177 5.68677L6.252 11.0568C6.972 11.2778 7.922 11.4268 9 11.4268C9.959 11.4268 10.816 11.3088 11.5 11.1288L11.748 11.0578L10.474 7.50277C10.2715 6.93786 10.1987 6.33463 10.261 5.73777L10.296 5.48377L10.622 3.56477ZM16.222 2.85577C16.6515 3.75025 17.3093 4.51566 18.129 5.07477L18.355 5.22177C18.618 5.38177 18.663 5.42777 18.433 5.57977L18.355 5.62877C17.5099 6.14766 16.8165 6.88031 16.345 7.75277L16.116 8.20177C16.006 8.39277 15.948 8.34677 15.778 7.99377C15.3485 7.09928 14.6907 6.33387 13.871 5.77477L13.645 5.62877C13.359 5.45277 13.355 5.40677 13.573 5.26677L13.645 5.22177C14.5686 4.65445 15.3091 3.83301 15.778 2.85577C15.948 2.50277 16.005 2.45677 16.116 2.64777L16.183 2.77577L16.222 2.85577ZM4.597 0.0897656L4.667 0.212766C4.981 0.792766 5.455 1.28877 6.043 1.65777L6.269 1.78877C6.461 1.89377 6.5 1.92477 6.339 2.02077L6.269 2.06077C5.66877 2.3821 5.16041 2.85122 4.792 3.42377L4.591 3.76777C4.514 3.88377 4.473 3.87377 4.403 3.75977L4.333 3.63777C4.00669 3.04545 3.53266 2.54764 2.957 2.19277L2.617 1.99377C2.546 1.94577 2.54 1.91377 2.61 1.86177L2.73 1.78877C3.3306 1.46757 3.83931 0.998438 4.208 0.425766L4.333 0.212766C4.465 -0.0302342 4.507 -0.0562344 4.597 0.0897656Z"
//                 fill="currentColor"
//               ></path>
//             </svg>
//             Let's Collaborate and Create Magic!
//           </p>
//         </div>
//         <div className="pt-[120px]">
//           <p className="text-text-300 text-[14px] xsm:text-[16px]  font-['Montserrat'] font-medium ">
//             I'm passionate about collaborating on exciting projects and
//             exploring new opportunities. Whether it's a creative venture, a
//             business initiative, or an innovative idea, I'm ready to bring my
//             skills and enthusiasm to the table.
//           </p>
//         </div>
//         <div className="pt-[60px] flex flex-col gap-[10px]">
//           <p className='text-text-300 text-[14px] xsm:text-[16px]  font-["Montserrat"] font-light'>
//             WANT TO CALL ME?
//           </p>
//           <p className='text-text-300 text-[14px] xsm:text-[16px]  font-["Montserrat"] font-medium'>
//             +212 6 76793918
//           </p>
//         </div>
//         <div className="pt-[60px] flex flex-col gap-[10px]">
//           <p className='text-text-300 text-[14px] xsm:text-[16px]  font-["Montserrat"] font-light'>
//             JUST WANT TO EMAIL ME?
//           </p>
//           <a
//             href="mailto:imabid1337@gmail.com"
//             className='text-text-300 text-[14px] xsm:text-[16px]  font-["Montserrat"] font-medium'
//           >
//             belhoucin.hicham@gmail.com
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

export default function App() {
  // const ref = React.useRef(false);

  // const notify = () =>
  //   toast.info(
  //     `
  //     🛠️ Work in Progress! 🚧
  //     I'm still polishing things up, so stay tuned for more updates! ✨
  //   `,
  //     {
  //       position: "top-center",
  //       autoClose: 10000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     }
  //   );

  // React.useEffect(() => {
  //   if (!ref.current) {
  //     ref.current = true;
  //     notify();
  //   }
  // }, []);

  return (
    <div className="w-screen h-screen max-w-7xl m-auto flex gap-2 md:gap-8 flex-col bg-background-950 overflow-auto scrollbar-hide text-text-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Education />} />
        <Route path="/career" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}
