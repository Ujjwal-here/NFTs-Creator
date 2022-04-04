import React from "react";

const Navbar = () => {
  return (
    <div className="px-40 py-6 flex flex-row justify-between items-center">
      <p className="text-white font-bold text-3xl">NFTs Creator</p>
      <div className="px-40 flex flex-row">
        <p className="px-8 text-base text-[#cbd5e1] hover:text-white">Home</p>
        <p className="px-8 text-base text-[#cbd5e1] hover:text-white">Pricing</p>
        <p className="px-8 text-base text-[#cbd5e1] hover:text-white">Features</p>
        <p className="px-8 text-base text-[#cbd5e1] hover:text-white">About</p>
      </div>
      <p className="px-8 font-semibold text-base text-[#cbd5e1]  underline decoration-[#43F2AC] ">Register</p>
      <p className="px-8 font-semibold text-base text-[#cbd5e1]  underline decoration-[#43F2AC] ">Login</p>
    </div>
  );
};

export default Navbar;
