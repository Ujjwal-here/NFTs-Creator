import React from "react";
import Image from "next/image"
import block from "../public/block-chain.png"

const Main = () => {
  return (
    <div className="flex flex-row items-stretch px-40 py-28">
      <div className="flex flex-col px-16">
        <p className="text-white font-bold text-7xl">NFTs Creator</p>
        <p className="text-[#43F2AC] font-bold text-5xl">Generate Rare Digital ArtWork of NFTs</p>
        <p className="text-white font-bold text-xl">Most Trusted and Secure Digital Art Creator</p>  
      </div>
      <div>
        <Image src={block} className="bg-[#1C2025]"  alt=""/>
      </div>
    </div>
  );
};

export default Main;
