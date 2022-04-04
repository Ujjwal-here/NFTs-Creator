import React, { useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import Image from "next/image";
import block from "../public/block-chain.png";

const Layers = () => {
  const [layer, setlayer] = useState("Add Layer");
  const [images, setImages] = useState([]);

  const onImageChange = (event) => {
    console.log(images);
    setImages(event.target.files);
  };

  const handleClick = () => {
    const newlayer = prompt("Enter Layer Name");
    setlayer(newlayer);
  };
  return (
    <div className="px-40 py-6 flex flex-row">
      <div className="px-20 py-4 rounded-md bg-[#1C2025] text-start cursor-pointer flex flex-row items-center">
        <p onClick={handleClick} className="text-white bg-[#1C2025]">
          {layer}
        </p>
        <input accept="image/*" type="file" multiple onChange={onImageChange} />
      </div>
      <div className="flex flex-row flex-wrap">
        
      </div>
    </div>
  );
};

export default Layers;
