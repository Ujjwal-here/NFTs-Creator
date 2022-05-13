import update from "immutability-helper";

export let initialAppState = {
    edges:[],
    nodes:[],
    selectedLayer: null
}

function saveToLocalStorage(state){
    localStorage.setItem('appState', JSON.stringify(state));
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
            
            saveToLocalStorage(newState)
              
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
            
            saveToLocalStorage(newState)
            return newState
        }

        case 'SELECT_LAYER':{

            const newState = {...state, selectedLayer:action.payload}
            saveToLocalStorage(newState)
            return newState
        }

        case 'ADD_FILES':{
            let find = state.nodes.find((item) => item.id == action.payload.selectedLayer)
            find.files.push({id:action.payload.id,name:action.payload.name,type:action.payload.type,imgUrl:action.payload.imgUrl})

            const newNodes = state.nodes.filter(item=> item.id != action.payload.selectedLayer)

            const newState =  {edges:state.edges,nodes:[...newNodes,find],selectedLayer:state.selectedLayer}
            saveToLocalStorage(newState)
            return newState

        }
        
        default:
            return state
        
    }
}
