import { useRouter } from "next/router";
import { useCallback } from "react";
import Logo from "../assets/logo";

export default function Navbar() {
  const router = useRouter()

  const handleGlobalClick = useCallback(() => {
    router.push('/')
  }, [])

  return(
    <div>
      <div className="h-2 px-24 py-10 flex items-center cursor-pointer" onClick={handleGlobalClick}>
        <Logo />
        <p className="ml-3 font-semibold">Bruno NFT</p>
      </div>
      <hr className="w-full border-[#242634]" />
    </div>
  )
}