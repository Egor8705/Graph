import {
    GET_LINES_LIST,
    UPLOAD_LINES_LIST
} from '../constants/constants';

const initialState = {
            lines:[]
};

export default function getLines(state = initialState, action) {
        switch(action.type){
            case UPLOAD_LINES_LIST: {
               return Object.assign({},state,{
                     lines: action.payload
               });
            }
            
            default:
               return state;
       };
}

