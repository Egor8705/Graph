import {
    CHOOSE_ELEMENT,
    CHANGE_CHOOSEN_ELEMENT_POS,
    CHOOSE_START_ELEMENT,
    CHOOSE_FINISH_ELEMENT,
    CHOOSE_ACTIVE_ELEMENT,
    CHANGE_MENU_STATUS,
    CHOOSE_ACTIVE_LINE
} from '../constants/constants';

const initialState = {
            dragAndDropElement: null,
            startElement:       null,
            finishElement:      null,
            activeElement:      null,
            activeLine:         null,
            Menu: {
                open:       false,
                PointX:     0,
                PointY:     0,
                showLine:   false
            }
};

export default function getLines(state = initialState, action) {
        switch(action.type){
            case CHOOSE_ELEMENT: {
               return Object.assign({},state,{
                     dragAndDropElement: action.payload
               });
            }
            
            case CHANGE_CHOOSEN_ELEMENT_POS: {
               return Object.assign({},state,{
                     dragAndDropElement: action.payload
               });
            }
            
            case CHOOSE_START_ELEMENT: {
               return Object.assign({},state,{
                     startElement: action.payload
               });
            }
                       
            case CHOOSE_FINISH_ELEMENT: {
               return Object.assign({},state,{
                    finishElement: action.payload
               });
            }
            
            case CHOOSE_ACTIVE_ELEMENT: {
               return Object.assign({},state,{
                    activeElement: action.payload
               });
            }
            
            case CHANGE_MENU_STATUS: {
               return Object.assign({},state,{
                    Menu: action.payload
               });
            }
            
            case CHOOSE_ACTIVE_LINE: {
               return Object.assign({},state,{
                    activeLine: action.payload
               });
            }
            
            default:
               return state;
       };
}

