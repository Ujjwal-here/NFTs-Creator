import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { RiSecurePaymentFill,RiMoneyDollarCircleFill } from "react-icons/ri";

const Banner = () => {
  return (
    <div className="px-40 py-16 bg-[#191C26] flex flex-row justify-between">
      <div className="bg-[#191C26] flex flex-row">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-4">
          <BsShieldFillCheck size={30} className="bg-gradient-to-r from-cyan-500 to-blue-500" />
        </div>
        <p className="bg-[#191C26] mx-4 text-white font-extralight text-lg">Most Trusted and <div>Secured</div></p>
      </div>
      <div className="bg-[#191C26] flex flex-row">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-4">
          <RiSecurePaymentFill size={30} className="bg-gradient-to-r from-cyan-500 to-blue-500" />
        </div>
        <p className="bg-[#191C26] mx-4 text-white font-extralight text-lg">Easy and Secure<div>Payment</div></p>
      </div>
      <div className="bg-[#191C26] flex flex-row">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-4">
          <RiMoneyDollarCircleFill size={30} className="bg-gradient-to-r from-cyan-500 to-blue-500" />
        </div>
        <p className="bg-[#191C26] mx-4 text-white font-extralight text-lg">Get Discount<div>Membership</div></p>
      </div>
    </div>
  );
};

export default Banner;
