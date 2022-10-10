import { AuctionListing, DirectListing } from "@thirdweb-dev/sdk"
import { useRouter } from "next/router"
import { useCallback } from "react"

import Ethereum from "../../assets/ethereum"

type NFTCardProps = {
  listing: (AuctionListing | DirectListing)
}

export function NFTCard({ listing }: NFTCardProps) {
  const router = useRouter()

  const handleNftClick = useCallback(() => {
    router.push(`/nft/${listing.asset.id}`)
  }, [listing.asset.id, router])

  return (
    <div className="w-[24rem] h-[31rem] bg-[#242634] rounded-[1.25rem] cursor-pointer hover:scale-105" onClick={handleNftClick}>
      <div>
        <img src={listing.asset.image} alt={listing.asset.name.toString()} className='rounded-[1.25rem] h-80 p-2 w-96' />
      </div>

      <div className="mx-6 mt-4">
        <div className="mb-5">
          <p className="text-2xl font-semibold">{listing.asset.name}</p>
          <p className="text-[#93989a]">By {listing.sellerAddress.slice(0, 10)}</p>
        </div>

        <div>
          <p className="text-[#93989a]">Current Bid</p>

          <div className="flex mt-0.5">
            <Ethereum />
            <p className="text-xl font-semibold">{listing.buyoutCurrencyValuePerToken.displayValue} ETH</p>
          </div>

          <div className="relative">
            <button className="absolute right-1 bottom-0.5 bg-[#ff2748] py-[0.625rem] px-5 rounded-xl hover:scale-105 active:scale-95">
              Buy Nft
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}