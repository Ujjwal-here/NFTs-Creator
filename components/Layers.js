import React, { useState, useCallback, useReducer } from "react";
import { BsArrowUpCircle } from "react-icons/bs";
import Image from "next/image";
import block from "../public/block-chain.png";
import update from "immutability-helper";
import { Card } from "./Card";
import {useDropzone} from 'react-dropzone'
import {layerReducer,initialAppState} from '../reducers/layerReducer'
import Dexie from 'dexie'
import { useUID, useUIDSeed } from 'react-uid';

const Layers = () => {

  const db = new Dexie("Files")
  db.version(1).stores({
    files:"key, value"
  })

  const [images, setImages] = useState([])


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


  function generateUID() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

  const onDrop = useCallback(async (acceptedFiles) => {
    try{

      acceptedFiles.forEach( async element => {
        let key = generateUID()
        await db.files.add({
          key,
          element
        })
        dispatch({type:'ADD_FILES',payload:{id:key, name:element.name, type:element.type, selectedLayer:appState.selectedLayer}})
      });

    }
    catch (err){
      console.log("database err", err)
    }
  },[appState])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  console.log(appState)
  
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
