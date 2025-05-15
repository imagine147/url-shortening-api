import Image from "next/image"
import Logo from "../images/logo.svg"
import Facebook from "../images/icon-facebook.svg"
import Twitter from "../images/icon-twitter.svg"
import Pinterest from "../images/icon-pinterest.svg"
import Instagram from "../images/icon-instagram.svg"

export default function Footer() {
  return (
    <footer className="w-full bg-[#232127]">
      <div className="container py-10 w-full md:w-10/12 mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-start gap-6 text-white">
        <div><Image className="filter invert" src={Logo} alt="logo-icon"/></div>
        <div className="flex flex-col md:flex-row text-[#9e9aa7] gap-6 lg:gap-16">
          <div className="flex flex-col gap-2 list-none text-sm cursor-pointer">
            <h3 className="text-base font-bold text-white">Features</h3>
            <li className="hover:text-[#2acfcf]">Link Shortening</li>
            <li className="hover:text-[#2acfcf]"> Branded Links</li>
            <li className="hover:text-[#2acfcf]">Analytics</li>
          </div>

          <div className="flex flex-col gap-2 list-none text-sm cursor-pointer">
            <h3 className="text-base font-bold text-white">Resources</h3>
            <li className="hover:text-[#2acfcf]">Blog</li>
            <li className="hover:text-[#2acfcf]">Developers</li>
            <li className="hover:text-[#2acfcf]">Support</li>
          </div>

          <div className="flex flex-col gap-2 list-none text-sm cursor-pointer">
            <h3 className="text-base font-bold text-white">Company</h3>
            <li className="hover:text-[#2acfcf]">About</li>
            <li className="hover:text-[#2acfcf]">Our Team</li>
            <li className="hover:text-[#2acfcf]">Careers</li>
            <li className="hover:text-[#2acfcf]">Contact</li>
          </div>
        </div>
        
        <div className="flex gap-4 cursor-pointer">
          <div className="p-2 rounded-full hover:bg-[#2acfcf]">
            <Image src={Facebook} alt="facebook-icon"/>
          </div>
          <div className="p-2 rounded-full hover:bg-[#2acfcf]">
            <Image src={Twitter} alt="twitter-icon"/>
          </div>
          <div className="p-2 rounded-full hover:bg-[#2acfcf]">
            <Image src={Pinterest} alt="pinterest-icon"/>
          </div>
          <div className="p-2 rounded-full hover:bg-[#2acfcf]">
            <Image src={Instagram} alt="instagram-icon"/>
          </div>
        </div>
      </div>
    </footer>
  )
}