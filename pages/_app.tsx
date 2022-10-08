import { ThirdwebProvider } from "@thirdweb-dev/react/solana";

import Layout from './_layout'

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider network="devnet">
      <Layout ><Component {...pageProps} /></Layout>
    </ThirdwebProvider>
    )
}

export default MyApp
