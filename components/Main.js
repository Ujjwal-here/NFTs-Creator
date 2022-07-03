import React from "react";
import Image from "next/image";
import block from "../public/block-chain.png";
import {BsArrowRightCircle} from 'react-icons/bs'
import Link from 'next/link';
import { useRouter } from 'next/router'

const Main = () => {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push("/Layers")
  }
  return (
    <div className="flex flex-row items-stretch  px-32 py-32 ">
      <div className="flex-1 flex-col px-32">
        <p className="text-white font-bold text-7xl">NFTs Creator</p>
        <p className="text-[#43F2AC] font-bold text-5xl py-2">
          Generate Rare Digital ArtWork of NFTs
        </p>
        <p className="text-[#cbd5e1] font-normal text-lg py-4">
          Easily create amazing NFT artworks in minutes with the Fotor-NFT
          Creator. Empower your unique digital arts with photos with crypto and
          become a crypto artist.
        </p>
        <BsArrowRightCircle size={80} className="text-[#43F2AC] my-4 animate-pulse" onClick={handleClick}/>
      </div>
      <div>
        <Image src={block} className="bg-[#191C26]" alt="" />
      </div>
    </div>
  );
};

export default Main;
