import Head from "next/head";
import { useRouter } from "next/router";
import { nfts } from "..";
import { NFTCard } from "../../components/NFTCard";

export default function NftDetails() {
  const router = useRouter()

  const nft = nfts.find(nft => nft.id === router.query.id)

  return (
    <div className="px-24">
      <Head>
        <title>{nft?.name} NFT - Details page</title>
      </Head>

      <div className="mt-24 flex">
        <img src={nft?.image} alt={nft?.name} className="rounded-[1.25rem] w-[45%] h-auto" />

        <div className="ml-10 w-[55%]">
          <h1 className="text-5xl font-bold">{nft?.name}</h1>
          <p className="text-[#93989A] mt-4">{nft?.description}</p>

          <hr className="w-full border-[#242634] mt-8 mb-4" />

          <div>
            <p className="text-[#93989A]">Creator</p>
            <p>{nft?.author}</p>
          </div>

          <hr className="w-full border-[#242634] mt-8 mb-4" />

          <div>
            <button className="bg-[#ff2748] py-[1rem] px-6 rounded-xl hover:scale-105 active:scale-95">
              Place a Bid
            </button>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-4xl mt-24">More Works</h2>

        <div className="flex flex-wrap items-start gap-16 mt-7">
          {nfts.slice(0,3).map(nft => (
            <NFTCard nft={nft} key={nft.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
