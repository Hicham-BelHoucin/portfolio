import React from 'react';
import Navbar from './components/navbar';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import TechStack from './pages/tech-stack';
import About from './pages/about';
import Contact from './pages/contact';
import Projects from './pages/projects';
import MyServices from './pages/my-services';

export default function App() {
  return (
    <div className='bg-[#31065A] h-screen w-screen overflow-auto scrollbar-hide flex flex-col'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tech-stack" element={<TechStack />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/my-services" element={<MyServices />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}
