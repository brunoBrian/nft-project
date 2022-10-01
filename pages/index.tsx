import Head from 'next/head'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { NFTCard } from '../components/NFTCard'

export const nfts = [{
  id: '1',
  name: 'Meu nft',
  price: '0.1',
  author: '786764bi4iubuubi',
  image: 'https://public.nftstatic.com/static/nft/res/nft-cex/S3/1652781894080_njlaa5nbryxdfakx5f7jup8nslqim4cr_400x400.png',
  description: 'Descrição do nft'
},
{
  id: '2',
  name: 'Nosso nft',
  price: '0.1',
  author: '786764bi4iubuubi',
  image: 'https://public.nftstatic.com/static/nft/res/nft-cex/S3/1653901088446_mbupnc878bmfgkkywo0rilc9hrc5mvob_400x400.gif',
  description: 'Descrição do nft'
},
{
  id: '3',
  name: 'Seu nft',
  price: '0.1',
  author: '786764bi4iubuubi',
  image: 'https://public.nftstatic.com/static/nft/res/nft-cex/S3/1662214875816_iwpdovq37rvkzcr9kor9dhcpy35vy5v8_400x400.png',
  description: 'Descrição do nft'
},
{
  id: '4',
  name: 'Dele nft',
  price: '0.1',
  author: '786764bi4iubuubi',
  image: 'https://public.nftstatic.com/static/nft/res/nft-cex/S3/1662653245123_u3anpm7ejaihaq7wne8zj1qr2t5eehsw_400x400.png',
  description: 'Descrição do nft'
},
{
  id: '5',
  name: 'Oshe nft',
  price: '0.1',
  author: '786764bi4iubuubi',
  image: 'https://public.nftstatic.com/static/nft/zipped/6ea6bee0772d449784b73aa7c0750fb4_zipped.png',
  description: 'Descrição do nft'
}]

export default function Home() {
  const [search, setSearch] = useState('')

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }, [])

  const filteredNfts = useMemo((): any => {
    return nfts.filter(nft => search ? nft.name.toLowerCase().includes(search.toLowerCase()) : true)
  }, [search, nfts])

  return (
    <div className='h-full w-screen bg-[#1d1f2b] px-24'>
      <Head>
        <title>Bruno NFT</title>
      </Head>

      <div className='flex justify-between items-baseline'>
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
          {filteredNfts.map(nft => (
            <NFTCard nft={nft} key={nft.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
