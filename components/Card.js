import {  useRef, useEffect, useCallback,useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../Items/ItemTypes';
export const Card = ({ id, text, index, moveCard, dispatch, state, changeLayer }) => {
    const ref = useRef(null);
    const [render, setRender] = useState(null)
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return (<div ref={ref} onClick={()=>dispatch({type:"SELECT_LAYER",payload:id})} className={`text-md ${ state.selectedLayer===id? "border border-white" : "" } my-5 px-2 py-5 text-center cursor-pointer rounded bg-gradient-to-r from-[#1F2628] to-[#313538] text-white ${opacity?"opacity-100":"opacity-0"}`} data-handler-id={handlerId}>
			{text}
		</div>);
};
