"use client"
import { useState, useEffect, useRef } from 'react';
import Image from "next/image"
import logo from "../images/logo.svg"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

export default function NavBar() {
  const [activeLink, setActiveLink] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const closeMenubar = () => setMenuOpen(false);

  const openMenubar = () => {
    if (window.innerWidth <= 1024) {
      setMenuOpen(!menuOpen);
    }
  };

  const handleSetActive = (link) => {
    setActiveLink(link);
  };

  const handleClickOutside = (event) => {
    if (navRef?.current && !navRef.current.contains(event.target)) {
      closeMenubar();
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="sticky top-0 w-full bg-white z-90">
      <div className="container w-full md:w-10/12 mx-auto flex gap-6 p-6 items-center">
        <div>
          <Image src={logo} alt="logo-icon"/>
        </div>

        <button className="absolute right-6 top-6 md:hidden cursor-pointer" onClick={openMenubar}>
            {menuOpen ? ( <IoMdClose className="w-[32px] h-[32px]" /> ) : ( <GiHamburgerMenu className="w-[32px] h-[32px]" /> )}
        </button>

        {/* mobile-nav */}
        <div ref={navRef} className={`absolute top-full right-5 w-[90%] mx-auto bg-[#3b3054] rounded-lg shadow-lg md:hidden flex flex-col gap-4 z-50 transition-all ${menuOpen ? 'block' : 'hidden'}`}>
          <nav className="flex flex-col gap-8 text-[18px] p-8">
            <ul className="space-y-4 text-center text-white font-bold">
              <li>Features</li>
              <li>Pricing</li>
              <li>Resources</li>
            </ul>
            <div className="border-b-1 border-gray-600 "></div>

            <div className="space-y-4 text-center text-white font-bold">
              <div>Login</div>
              <button className="w-full text-white font-bold rounded-3xl hover:opacity-50 bg-[#2acfcf] px-6 py-2 ">Sign Up</button>
            </div>
          </nav>
        </div>

        {/* desktop-nav */}
        <div className="w-full justify-between items-center hidden md:flex">
          <div className="text-[#9e9aa7]  text-sm font-bold">
            <ul className="flex gap-4 cursor-pointer">
              <li className="hover:text-[#35323e]">Features</li>
              <li className="hover:text-[#35323e]">Pricing</li>
              <li className="hover:text-[#35323e]">Resources</li>
            </ul>
          </div>

          <div className="hidden md:flex gap-4 items-center cursor-pointer">
            <div className="text-[#9e9aa7] text-sm font-bold hover:text-[#35323e]">Login</div>
            <button className="rounded-3xl bg-[#2acfcf] hover:opacity-50 text-white font-bold  px-6 py-2 text-sm cursor-pointer">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  )
}