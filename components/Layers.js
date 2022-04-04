import React, { useState } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import Image from "next/image";
import block from "../public/block-chain.png";

const Layers = () => {

  const [images, setImages] = useState([]);
  const [layers,setlayers]=useState([])

  const onImageChange = (event) => {
    let files = event.target.files;
    let img = [];
    for (var i = 0; i < files.length; i++) {
      img.push(files[i]);
    }
    setImages(img);
  };

  const handleClick = () => {
    const newlayer = prompt("Enter Layer Name");
    setlayers([...layers,newlayer])
    console.log(layers);
  };
  return (
    <div className="flex flex-row items-stretch px-40 py-6">
      <div className="flex flex-col">
        {layers.map((item, i) => {
          <div
            key={i}
            className="px-20 py-4 rounded-md self-start bg-[#1C2025] text-start cursor-pointer flex flex-row items-center"
          >
            <p className="text-white bg-[#1C2025]">{item}</p>
            <input
              accept="image/*"
              type="file"
              multiple
              onChange={onImageChange}
            />
          </div>;
        })}
        <div className="px-20 py-4 rounded-md self-start bg-[#1C2025] text-start cursor-pointer flex flex-row items-center">
          <p onClick={handleClick} className="text-white bg-[#1C2025]">
            Add layers
          </p>
          <input
            accept="image/*"
            type="file"
            multiple
            onChange={onImageChange}
          />
        </div>
      </div>
      <div className="flex flex-row flex-wrap">
        {images.map((item, i) => (
          <Image
            key={i}
            height={200}
            width={200}
            src={URL.createObjectURL(item)}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default Layers;
