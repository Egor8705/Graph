import {
    UPLOAD_NODES_LIST,
    ADD_NODE
} from '../constants/constants';

const initialState = {
            nodes: []
};

export default function getNodes(state = initialState,action) {
        switch(action.type){
            case UPLOAD_NODES_LIST:{
               return Object.assign({},state,{
                     nodes: action.payload
               });
            }
            
            case ADD_NODE:{
               return Object.assign({},state,{
                     nodes: action.payload
               });
            }
            
            default:
               return state;
       };
}

