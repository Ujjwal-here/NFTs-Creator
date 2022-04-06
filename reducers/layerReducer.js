import update from "immutability-helper";

export let initialAppState = {
    edges:[],
    nodes:[],
    selectedLayer: null
}

export function layerReducer(state,action){
    switch (action.type) {
        case 'ADD_LAYER': {
            const newState = update(state, {
                edges:{
                $splice: [
                  [state.edges.length, 0, { id: state.edges.length + 1, text: action.payload }],
                ],
                }
              })
            return newState
        }

        case 'SELECT_LAYER':{

            let newState = Object.assign({}, state, { selectedLayer:action.payload } );
            console.log(newState,state)
            console.log("is state same ",newState === state)
            return newState
        }
        
        default:
            console.log("default")
            return state
        
        
    }
}
