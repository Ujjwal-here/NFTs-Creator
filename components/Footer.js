import React from "react";
import { IoMdMail } from "react-icons/io";
import { AiFillTwitterCircle ,AiFillInstagram} from "react-icons/ai";
import {BsFacebook,BsTelegram,BsLinkedin} from "react-icons/bs"

const Footer = () => {
  return (
    <div className="px-40 py-32 flex flex-row justify-between">
      <div className="">
        <p className="text-white font-bold text-2xl mb-8">NFTs logo</p>
        <div className="flex flex-row items-center my-4">
          <IoMdMail className="text-white mr-2" />
          <p className="text-[#94a3b8] font-thin cursor-pointer">nftscreator@gmail.com</p>
        </div>
        <div className="flex flex-row items-center mb-8">
          <IoMdMail className="text-white mr-2" />
          <p className="text-[#94a3b8] font-thin cursor-pointer">nftscreator@gmail.com</p>
        </div>
      </div>
      <div className="">
        <p className="text-white font-bold text-md mb-4">Company</p>
        <p className="text-[#94a3b8] font-thin cursor-pointer my-2">About Us</p>
        <p className="text-[#94a3b8] font-thin cursor-pointer my-2">Careers</p>
        <p className="text-[#94a3b8] font-thin cursor-pointer my-2">Contact Us</p>
      </div>

      <div className="">
        <p className="text-white font-bold text-md mb-4">Futher Information</p>
        <p className="text-[#94a3b8] cursor-pointer font-thin my-2">Terms and Conditions</p>
        <p className="text-[#94a3b8] cursor-pointer font-thin my-2">Privacy Policy</p>
      </div>
      <div className="">
        <p className="text-white font-bold text-md mb-4">Follow Us</p>
        <div className="flex flex-row">
          <AiFillTwitterCircle size={20} className="text-white mr-6 cursor-pointer" />
          <BsLinkedin size={20}  className="text-white mr-6 cursor-pointer" />
          <BsFacebook size={20} className="text-white mr-6 cursor-pointer" />
          <BsTelegram size={20} className="text-white mr-6 cursor-pointer" />
          <AiFillInstagram size={20} className="text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
