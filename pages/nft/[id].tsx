import { useAddress, useContract, useListing, useListings, useNFT } from "@thirdweb-dev/react";
import { Marketplace } from "@thirdweb-dev/sdk";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio'

import { NFTCard } from "../../components/NFTCard";

export default function NftDetails() {
  const [loadingPurchase, setLoadingPurchase] = useState(false)
  const router = useRouter()

  const marketplace = useContract<Marketplace | any>(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT, '')
  const listing = useListing(marketplace.contract, Number(router.query.id))
  const { data: listings } = useListings(marketplace.contract)

  const { contract } = useContract(listing?.data?.assetContractAddress)
  const { data: nft } = useNFT(contract, listing?.data?.asset?.id) //id do NFT

  const walletAddress = useAddress()
  const userIsNftOwner = walletAddress && walletAddress === nft?.owner
  const shouldDisableBuyNftButton =  loadingPurchase || listing?.data?.quantity.toString() === '0'

  const handleBuyNft = useCallback(async () => {
    try {
      setLoadingPurchase(true)

      await marketplace?.data?.direct?.buyoutListing(listing?.data?.id, 1)
      Notify.success('You have successfully bought this NFT!')
    }catch(err) {
      Notify.failure('Failed to buy this NFT!')
    } finally {
      setLoadingPurchase(false)
    }
  }, [listing?.data?.id, marketplace])

  console.log(listing.status);
  

  return (
    <div className="px-[6%] min-h-[80vh]">
      <Head>
        <title>{listing?.data?.asset?.name} NFT - Details page</title>
      </Head>

      {listing?.status === 'loading' ? <p>Loading...</p> : (
        <>
          <div className="mt-24 flex flex-wrap gap-10">
            <img src={listing?.data?.asset?.image} alt={listing?.data?.asset?.name.toString()} className="rounded-[1.25rem] w-full max-w-xl h-auto" />

            <div className="w-full max-w-xl">
              <h1 className="text-5xl font-bold">{listing?.data?.asset?.name}</h1>
              <p className="text-[#93989A] mt-4">{listing?.data?.asset?.description}</p>

              <hr className="w-full border-[#242634] mt-8 mb-4" />

              <div>
                <p className="text-[#93989A]">Owner</p>
                <p>{nft?.owner?.slice(0, 10)} {userIsNftOwner && '(You)'}</p>
              </div>

              <hr className="w-full border-[#242634] mt-4 mb-8" />

              <div>
                <button
                  disabled={shouldDisableBuyNftButton}
                  onClick={handleBuyNft}
                  className={`bg-[#ff2748] py-[1rem] px-6 rounded-xl ${shouldDisableBuyNftButton ? 'opacity-50' : 'hover:scale-105 active:scale-95'}`}
                >
                  {loadingPurchase ? 'loading' : 'Buy Nft'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h2 className="text-4xl mt-24">More Works</h2>

            <div className="flex flex-wrap items-start gap-16 mt-7">
              {listings?.slice(0,3).map(listing => (
                <NFTCard listing={listing} key={listing.id} /> //id do NFT no marketplace
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
