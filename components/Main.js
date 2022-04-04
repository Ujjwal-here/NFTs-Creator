import React from "react";
import Image from "next/image";
import block from "../public/block-chain.png";

const Main = () => {
  return (
    <div className="flex flex-row items-stretch px-40 py-28">
      <div className="flex-1 flex-col px-16">
        <p className="text-white font-bold text-7xl">NFTs Creator</p>
        <p className="text-[#43F2AC] font-bold text-5xl py-2">
          Generate Rare Digital ArtWork of NFTs
        </p>
        <p className="text-[#64748b] font-thin text-md py-2">
          Easily create amazing NFT artworks in minutes with the Fotor-NFT
          Creator. Empower your unique digital arts with photos with crypto and
          become a crypto artist.
        </p>
        <div className="bg-[#1C2025] py-6 my-6 rounded px-6" >
            <p className="bg-[#1C2025] text-[#43F2AC]">Get Started</p>
        </div>
      </div>
      <div>
        <Image src={block} className="bg-[#1C2025]" alt="" />
      </div>
    </div>
  );
};

export default Main;
