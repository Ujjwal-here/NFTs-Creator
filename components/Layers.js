import React, { useState, useCallback, useReducer } from "react";
import { Card } from "./Card";
import { useDropzone } from "react-dropzone";
import { layerReducer, initialAppState } from "../reducers/layerReducer";
import Dexie from "dexie";
import { generateUID } from "../utils/generateUid";
import Image from "next/image";
import mergeImages from 'merge-images';

const Layers = () => {
  const db = new Dexie("Files");
  db.version(1).stores({
    files: "key, value",
  });

  const [appState, dispatch] = useReducer(layerReducer, initialAppState);

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawerProp = () => {
      setIsOpen((prevState) => !prevState)
  }

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: "MOVE_LAYER",
      payload: { dragIndex: dragIndex, hoverIndex: hoverIndex },
    });
  }, []);

  const handleClick = useCallback(() => {
    const newlayer = prompt("Enter Layer Name");
    if (newlayer) {
      dispatch({ type: "ADD_LAYER", payload: newlayer });
    }
  }, []);

  const renderCard = useCallback(
    (card, index) => {
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
    },
    [appState]
  );

  const onDrop = useCallback(
    async (acceptedFiles) => {
      try {
        acceptedFiles.forEach(async (element) => {
          let key = generateUID();
          await db.files.add({
            key,
            element,
          });
          const file = await db.files.get(key);
          const imgUrl = URL.createObjectURL(file.element);
          dispatch({
            type: "ADD_FILES",
            payload: {
              id: key,
              name: element.name,
              type: element.type,
              selectedLayer: appState.selectedLayer,
              imgUrl: imgUrl,
            },
          });
        });
      } catch (err) {
        console.log("database err", err);
      }
    },
    [appState]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [previewImg , setPreviewImg] = useState("")


  function generatePreview(){
    
    const appState = JSON.parse(localStorage.getItem("appState"))
    console.log("appState",appState)
    let imagePathList = []


    appState.edges.forEach(edge => {

        const id = edge.id
        const node = appState.nodes.find(item => item.id === id)
        const randomImgPath = node.files[Math.floor(Math.random()*node.files.length)]
        imagePathList.push(randomImgPath.imgUrl)
        
    });

    mergeImages(imagePathList).then(b64 =>  setPreviewImg(b64))
    

}

  console.log(
    appState.nodes.find((item) => item.id === appState.selectedLayer)
  );
  const name = appState.nodes.find(
    (item) => item.id === appState.selectedLayer
  );
  return (
    <div className="flex flex-col">
      <div className="flex flex-row px-36 py-10 ">
        <div>
          <div
            className="text-lg my-9 px-2 py-5 text-center rounded bg-[#1B232E] text-white "
            onClick={handleClick}
          >
            Layers
          </div>
          <div className="w-80">
            {appState.edges.map((card, i) => renderCard(card, i))}
          </div>
          <div
            className="text-md my-5 px-2 py-5 text-center cursor-pointer rounded bg-[#202B3B] text-white "
            onClick={handleClick}
          >
            Add Layers
          </div>
        </div>
        <div className="pl-40 grow">
          <div className="text-lg my-9 px-2 py-5 text-center rounded bg-[#1B232E] text-white ">
            Background
          </div>
          <div className="flex flex-row flex-wrap">
            {appState.nodes &&
              appState.nodes
                .find((item) => item.id === appState.selectedLayer)
                ?.files.map((itm) => (
                  <div
                    key={itm.imgUrl}
                    className="px-4 mr-4 mb-4 bg-[#1B232E] py-4"
                  >
                    <div className="flex flex-row bg-[#273345] py-4 px-4 rounded mb-4 justify-between">
                      <p className="bg-[#273345] text-xs  text-[#cbd5e1] font-thin">
                        Rarity: 100%
                      </p>
                      <p className="bg-[#273345] text-xs text-[#cbd5e1] font-thin">
                        Remove
                      </p>
                    </div>

                    <Image
                      alt=""
                      src={itm.imgUrl}
                      width={200}
                      height={200}
                    ></Image>
                  </div>
                ))}
          </div>

          <div
            {...getRootProps()}
            className="text-md px-2 py-7 text-center cursor-pointer rounded bg-[#1B232E] text-white "
          >
            Upload or drag & drop images here
            <div className="font-thin text-sm bg-[#1B232E] text-[#cbd5e1]">
              (image/png, image/gif, video/mp4, Max size: 10MB)
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row px-36">
      <div onClick={generatePreview} className="text-md my-5 mr-2 px-2 py-5 grow text-center cursor-pointer rounded bg-[#202B3B] text-white ">
          Preview
        </div>
        <div className="text-md my-5 mx-2 px-2 py-5 grow text-center cursor-pointer rounded bg-[#202B3B] text-white ">
          Generate Collection
        </div>
        <div onClick={toggleDrawerProp} className="text-md my-5 mx-2 px-2 py-5 grow text-center cursor-pointer rounded bg-[#202B3B] text-white ">
          More
        </div>
      
      </div>
      {
      previewImg != "" ?
      <Image
                      alt=""
                      src={previewImg}
                      width={200}
                      height={200}
                    ></Image>:
                    <div></div>
      }
    </div>
  );
};

export default Layers;
