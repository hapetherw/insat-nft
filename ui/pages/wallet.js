import dynamic from 'next/dynamic'

const WalletContainerWithNoSSR = dynamic(
  () => import('containers/WalletContainer'),
  { ssr: false }
)
export default WalletContainerWithNoSSR