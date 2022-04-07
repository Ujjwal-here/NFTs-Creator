import update from "immutability-helper";

export let initialAppState = {
    edges:[],
    nodes:[],
    selectedLayer: null
}

export function layerReducer(state,action){
    switch (action.type) {

        case 'MOVE_LAYER':{
            const newState = update(state, {
                
                edges:{
                    $splice: [
                        [action.payload.dragIndex, 1],
                        [action.payload.hoverIndex, 0, state.edges[action.payload.dragIndex]],
                      ],
                }
                
              })
              
            return newState
        }

        case 'ADD_LAYER': {
            const newState = update(state, {
                edges:{
                $splice: [
                  [state.edges.length, 0, { id: state.edges.length + 1, text: action.payload }],
                ],
                },
                nodes:{
                    $push: [{ id: state.edges.length + 1, text: action.payload, files:[] }]
                },
                selectedLayer:{
                    $set: state.edges.length + 1
                }
              })
              
            return newState
        }

        case 'SELECT_LAYER':{

            return {...state, selectedLayer:action.payload}
        }

        case 'ADD_FILES':{
            let find = state.nodes.find((item) => item.id == action.payload.selectedLayer)
            find.files.push({id:action.payload.id,name:action.payload.name,type:action.payload.type,imgUrl:action.payload.imgUrl})

            const newNodes = state.nodes.filter(item=> item.id != action.payload.selectedLayer)

            return {edges:state.edges,nodes:[...newNodes,find],selectedLayer:state.selectedLayer}

        }
        
        default:
            return state
        
        
    }
}
