import { useContract, useListings } from '@thirdweb-dev/react'
import { Marketplace } from '@thirdweb-dev/sdk'
import Head from 'next/head'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { NFTCard } from '../components/NFTCard'

export default function Home() {
  const [search, setSearch] = useState('')

  const marketplace = useContract<Marketplace | any>(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT, '')

  const {data: listings, status} = useListings(marketplace.contract)

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const filteredListings = useMemo((): any => {
    return listings?.filter(nft => search ? nft.asset.name.toString().toLowerCase().includes(search.toLowerCase()) : true)
  }, [search, listings])

  return ( 
    <div className='h-full w-screen bg-[#1d1f2b] px-[6%] min-h-[80vh]'>
      <Head>
        <title>Bruno NFT</title>
      </Head>

      {status === 'loading' ? (<p>Loading...</p>) : (

      <>
          <div className='flex justify-between items-baseline flex-wrap'>
            <h2 className='text-5xl font-bold text-white mt-24'>
              Discovery
            </h2>

            <input type="text" className='h-12 w-64 p-4 rounded-xl' placeholder='Search item' onChange={handleSearch} value={search} />
          </div>

          <hr className='w-full border-[#242634] mt-12' />

          <div className='flex-col items-start gap-7 mt-12'>
            <h2 className='text-5xl font-bold'>
              Popular Bid
            </h2>

            <div className='flex flex-wrap items-start gap-7 mt-7 min-h[50%]'>
              {filteredListings?.map(listing => (
                <NFTCard listing={listing} key={listing.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
