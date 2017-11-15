import {
    ADD_NEW_LINE,
} from '../constants/constants';

const initialState = {
            chosenElement: null
};

export default function getLines(state = initialState, action) {
        switch(action.type){
            case ADD_NEW_LINE: {
               return Object.assign({},state,{
                     chosenElement: action.payload
               });
            }
            
            default:
               return state;
       };
}

