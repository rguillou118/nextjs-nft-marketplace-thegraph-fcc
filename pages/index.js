// import Image from "next/image"
// import { Inter } from "next/font/google"
// import styles from "@/styles/Home.module.css"

// const inter = Inter({ subsets: ["latin"] })

// export default function Home() {
//     return <div className={styles.container}>Hi!</div>
// }

// import Image from "next/image"
import styles from "../styles/Home.module.css";
import { useMoralisQuery, useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";
import networkMapping from "../constants/networkMapping.json";
import GET_ACTIVE_ITEMS from "@/constants/subgraphQueries";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { isWeb3Enabled, chainId } = useMoralis();
  // const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
  //     // TableName
  //     // Function for the query
  //     "ActiveItem",
  //     (query) => query.limit(10).descending("tokenId")
  // )
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const marketplaceAddress = networkMapping[chainString].NftMarketplace[0];

  const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS);

  return (
    <div className="container mx-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      <div className="flex flex-wrap">
        {isWeb3Enabled ? (
          // fetchingListedNfts ? (
          loading || !listedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.activeItems.map((nft) => {
              const { price, nftAddress, tokenId, seller } = nft;
              return marketplaceAddress ? (
                <NFTBox
                  price={price}
                  nftAddress={nftAddress}
                  tokenId={tokenId}
                  marketplaceAddress={marketplaceAddress}
                  seller={seller}
                  key={`${nftAddress}${tokenId}`}
                />
              ) : (
                <div>Network error, please switch to a supported network. </div>
              );
            })
          )
        ) : (
          <div>Web3 Currently Not Enabled</div>
        )}
      </div>
    </div>
  );
}
