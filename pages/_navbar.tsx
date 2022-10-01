import Logo from "../assets/logo";

export default function Navbar() {
  return(
    <div >
      <div className="h-2 px-24 py-10 flex items-center cursor-pointer">
        <Logo />
        <p className="ml-3 font-semibold">Bruno NFT</p>
      </div>
      <hr className="w-full border-[#242634]" />
    </div>
  )
}