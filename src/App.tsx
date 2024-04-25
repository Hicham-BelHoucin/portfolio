import React from 'react';
import Navbar from './components/navbar';
import Home from './pages/home';
import { Route, Routes } from 'react-router-dom';
import Experience from './pages/experience';
import Education from './pages/education';
import Footer from './components/footer';
export default function App() {
  return (
    <div className='flex flex-col bg-[#0C0C0D] overflow-hidden'>
      <Navbar />
      <div className='w-screen h-screen overflow-auto scrollbar-hide flex flex-col '>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}
