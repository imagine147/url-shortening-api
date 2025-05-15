import Image from "next/image"
import Work from "../../images/illustration-working.svg"
export default function Hero() {
  return (
    <div className="w-full bg-white mb-26">
      <div className="container w-full md:w-10/12 mx-auto flex flex-col-reverse gap-6 md:flex-row justify-between p-6  md:pr-0">
        <div className="w-full flex flex-col gap-6 mt-8">
          <div className="text-sm text-center md:text-start space-y-4">
            <h1 className="text-4xl lg:text-5xl tracking-tight text-[#35323e] font-bold">More than just <br/> shorter links</h1>
            <p className="text-[#9e9aa7]">Build your brand’s recognition and get detailed <br/> insights on how your links are performing.</p>
          </div>

          <div className="flex justify-center md:justify-start"><button className="rounded-3xl px-6 py-2 text-sm font-bold text-white bg-[#2acfcf] hover:opacity-50 cursor-pointer">Get Started</button></div>
        </div>

        
        <div className="">
        <Image src={Work} alt="work-illustration" className="w-full" />
      </div>
        
      </div>
    </div>
  )
}