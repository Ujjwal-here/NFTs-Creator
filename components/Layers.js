import React, { useState, useCallback, useReducer } from "react";
import { Card } from "./Card";
import {useDropzone} from 'react-dropzone'
import {layerReducer,initialAppState} from '../reducers/layerReducer'
import Dexie from 'dexie'
import { generateUID } from "../utils/generateUid";
import Image from "next/image";

const Layers = () => {

  const db = new Dexie("Files")
  db.version(1).stores({
    files:"key, value"
  })


  const [appState, dispatch] = useReducer(layerReducer,initialAppState)

  const moveCard = useCallback((dragIndex, hoverIndex) => {

    dispatch({type:'MOVE_LAYER',payload:{dragIndex:dragIndex,hoverIndex:hoverIndex}})
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
        <div>
          {/* {appState.nodes.find(item=> item.id===appState.selectedLayer).files.map((itm)=>(
            <Image src={URL.createObjectURL(itm)}></Image>
          ))} */}
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
