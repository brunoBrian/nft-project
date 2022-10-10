import { useRouter } from "next/router";
import { useCallback } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

import Logo from "../assets/logo";

export default function Navbar() {
  const router = useRouter()

  const handleGlobalClick = useCallback(() => {
    router.push('/')
  }, [router])

  return(
    <div>
      <div className="h-20 px-[10%] py-10 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={handleGlobalClick}>
          <Logo />
          <p className="ml-3 font-semibold">Bruno NFT</p>
        </div>
        <ConnectWallet
          colorMode="light"
          accentColor="#242635"
        />
      </div>
      <hr className="w-full border-[#242634]" />
    </div>
  )
}