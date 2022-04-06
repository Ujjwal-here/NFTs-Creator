import React, { useState, useCallback, useReducer } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import Image from "next/image";
import block from "../public/block-chain.png";
import update from "immutability-helper";
import { Card } from "./Card";
import {useDropzone} from 'react-dropzone'
import {layerReducer,initialAppState} from '../reducers/layerReducer'

const Layers = () => {
  const [images, setImages] = useState([])
  
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const [appState, dispatch] = useReducer(layerReducer,initialAppState)

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

  const handleClick = useCallback(() => {
    const newlayer = prompt("Enter Layer Name");
    if(newlayer){
      dispatch({type:"ADD_LAYER", payload:newlayer})
    }
  },[])

  const renderCard = useCallback((card, index) => {
    return (
      <Card
        dispatch={dispatch}
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
        state={appState}
      />
    );
  }, [appState]);

  const onImageChange = (event) => {
    let files = event.target.files;
    let img = [];
    for (var i = 0; i < files.length; i++) {
      img.push(files[i]);
    }
    setImages(img);
  };
  
  return (
    <div className="flex flex-row px-40 py-6 ">
      <div>
        <div
          className="text-lg my-9 px-2 py-5 text-center rounded bg-[#191C26] text-white "
          onClick={handleClick}
        >
          Layers
        </div>
        <div className="w-80">
          {appState.edges.map((card, i) => renderCard(card, i))}
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

        <div {...getRootProps()} className="text-md my-9 px-2 py-7 text-center cursor-pointer rounded bg-[#131B22] text-white ">
          Upload or drag & drop images here
          <div className="font-thin text-sm text-[#cbd5e1]">(image/png, image/gif, video/mp4, Max size: 10MB)
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Layers;
