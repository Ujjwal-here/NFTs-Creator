import React, { useState, useCallback } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import Image from "next/image";
import block from "../public/block-chain.png";
import update from 'immutability-helper';
import { Card } from "./Card";

const Layers = () => {

  const [images, setImages] = useState([]);

  const [layers, setLayers] = useState([
    {
        id: 1,
        text: 'Background',
    },
    {
        id: 2,
        text: 'Face',
    },
    {
        id: 3,
        text: 'Cloths',
    },
    {
        id: 4,
        text: 'Tattoo',
    },
    {
        id: 5,
        text: 'Weapon',
    },
    {
        id: 6,
        text: 'Foreground',
    },
  ]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setLayers((prevCards) => update(prevCards, {
        $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
        ],
    }));
  }, []);


  const renderCard = useCallback((card, index) => {
    return (<Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard}/>);
  }, []);

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
  return (<div>
    <div className="w-1/4" >{layers.map((card, i) => renderCard(card, i))}</div>
  </div>);
};

export default Layers;
