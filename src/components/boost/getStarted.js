export default function GetStarted() {
  const isDisabled = true; // Set this dynamically if needed
  return (
    <div className="bg-boost w-full">
      <div className="text-center space-y-4 py-14 md:py-8" disabled={isDisabled}>
        <h3 className="text-3xl text-white font-bold">Boost your links today</h3>
        <button className={`bg-[#2acfcf] hover:bg-cyan-300 text-white text-sm font-bold rounded-3xl px-6 py-2 cursor-pointer ${isDisabled }`}>Get Started</button>
      </div>
    </div>
  )
}