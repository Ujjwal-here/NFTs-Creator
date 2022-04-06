import React, { useState, useCallback } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import Image from "next/image";
import block from "../public/block-chain.png";
import update from "immutability-helper";
import { Card } from "./Card";

const Layers = () => {
  const [images, setImages] = useState([]);

  const [layers, setLayers] = useState([
    {
      id: 1,
      text: "Background",
    },
    {
      id: 2,
      text: "Face",
    },
    {
      id: 3,
      text: "Cloths",
    },
    {
      id: 4,
      text: "Tattoo",
    },
    {
      id: 5,
      text: "Weapon",
    },
    {
      id: 6,
      text: "Foreground",
    },
  ]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setLayers((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const handleClick = () => {
    const newlayer = prompt("Enter Layer Name");
    setLayers((prevCards) =>
      update(prevCards, {
        $splice: [
          [prevCards.length, 0, { id: prevCards.length + 1, text: newlayer }],
        ],
      })
    );
  };

  const renderCard = useCallback((card, index) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
      />
    );
  }, []);

  const onImageChange = (event) => {
    let files = event.target.files;
    let img = [];
    for (var i = 0; i < files.length; i++) {
      img.push(files[i]);
    }
    setImages(img);
  };

  return (
    <div className="flex flex-row px-40 py-6  ">
      <div>
        <div
          className="text-lg my-9 px-2 py-5 text-center rounded bg-[#191C26] text-white "
          onClick={handleClick}
        >
          Layers
        </div>
        <div className="w-80">
          {layers.map((card, i) => renderCard(card, i))}
        </div>
        <div
          className="text-md my-5 px-2 py-5 text-center cursor-pointer rounded bg-[#21242E] text-white "
          onClick={handleClick}
        >
          Add Layers
        </div>
      </div>
      <div className="pl-40 grow">
        <div className="text-lg my-9 px-2 py-5 text-center rounded bg-[#191C26] text-white ">
          Background
        </div>
        <div className="text-md my-9 px-2 py-7 text-center cursor-pointer rounded bg-[#131B22] text-white ">
          Upload or drag & drop images here
          <div className="font-thin text-sm text-[#cbd5e1]">(image/png, image/gif, video/mp4, Max size: 10MB)</div>
        </div>
      </div>
    </div>
  );
};

export default Layers;
