import React, { useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import Image from "next/image";
import block from "../public/block-chain.png";

const Layers = () => {
  const [layer, setlayer] = useState("Add Layer");
  const [images, setImages] = useState([]);

  const onImageChange = (event) => {
    let files = event.target.files
    let img = []
    for(var i=0;i<files.length;i++){
      img.push(files[i])
    }
    setImages(img)
  };

  const handleClick = () => {
    const newlayer = prompt("Enter Layer Name");
    setlayer(newlayer);
  };
  return (
    <div className="flex flex-row px-40 py-6">
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
