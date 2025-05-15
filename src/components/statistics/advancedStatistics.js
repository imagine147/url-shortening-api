import Image from "next/image"
import { statistics } from "@/db"
import Shortening from "../shorten/urlShortening"
export default function AdvancedStatistics() {
  return (
    <div className="w-full bg-gray-200 relative ">
      <div><Shortening/></div>
      <div className="container w-full md:w-10/12 mx-auto px-6 py-8 pt-[35rem] md:pt-[30rem]">
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-[#35323e] text-3xl font-bold">Advanced statistics</h2>
        <p className="text-[#9e9aa7] text-sm tracking-tight leading-4">Track how your links are performing across the web with <br/> our advanced statistics dashboard.</p>
      </div>

      <div className="w-full relative mt-16">
        <div className="absolute left-1/2 -translate-x-1/2 top-8 bottom-0 w-2 bg-[#2acfcf] md:hidden z-0" />
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-2 bg-[#2acfcf] z-0" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 mb-6">
          {statistics.map((stats, index)=> (
          <div className={`flex flex-col gap-4 px-6 py-8 rounded-md bg-white shadow-lg relative`} style={{ marginTop: `${index * 1.5}rem`, marginBottom: `${(statistics.length - index - 1) * 1}rem`}} // steps each card downward
          key={stats.id}>
              <span className="absolute rounded-[100%] w-16 h-16 justify-items-center bg-[#35323e] z-50 -top-7 right-[40%] md:left-4"><Image className="pt-3 " src={stats.image} alt="statistics-icon" /></span>
            <span className="flex flex-col gap-2 mt-6 text-center md:text-start text-lg md:text-base lg:text-lg">
              <h2 className="text-[#35323e] font-bold tracking-tighter">{stats.title}</h2>
              <p className="text-sm text-[#9e9aa7]">{stats.description}</p>
            </span>
          </div>
        ))}
        </div>
      </div>
      </div>
    </div>
  )
}

