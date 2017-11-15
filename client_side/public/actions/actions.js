//Actions для получения списков

import {
    UPLOAD_NODES_LIST,
    UPLOAD_LINES_LIST,
    CHOOSE_ELEMENT,
    CHANGE_CHOOSEN_ELEMENT_POS,
    CHOOSE_START_ELEMENT,
    CHOOSE_FINISH_ELEMENT,
    CHOOSE_ACTIVE_ELEMENT,
    CHANGE_MENU_STATUS,
    CHOOSE_ACTIVE_LINE
} from '../constants/constants';


export function uploadNodeList(nodes){
    return ({
        type: UPLOAD_NODES_LIST,
        payload: nodes
    });
};

export function uploadLinesList(lines){
    return ({
        type: UPLOAD_LINES_LIST,
        payload: lines
    });
};

export function chooseActiveLine(line){
    return ({
        type: CHOOSE_ACTIVE_LINE,
        payload: line
    });
};

export function getNodesList(){
    return (dispatch) => {
        return fetch("http://localhost:4000/api/getNodes")
                .then(res => res.json().then(data => {
                     dispatch(uploadNodeList(data.nodes));  
                        
                }))
                .catch(err => {
                    console.log(err);
                });
    };  
};

export function getLinesList(){
    return dispatch => {
        return fetch("http://localhost:4000/api/getLines")
                    .then(res => res.json().then(data => {
                        dispatch(uploadLinesList(data.lines));
                    }))
                    .catch(err => {
                        console.log(err);
                    });
    };  
}

export function chooseElement(node){
    return ({
        type: CHOOSE_ELEMENT,
        payload: node
    });
};

export function uploadChoosenElementPos(node){
    return ({
        type: CHANGE_CHOOSEN_ELEMENT_POS,
        payload: node
    });
};

export function chooseStartElement(node){
    return ({
        type: CHOOSE_START_ELEMENT,
        payload: node
    });
};

export function chooseFinishElement(node){
    return ({
        type: CHOOSE_FINISH_ELEMENT,
        payload: node
    });
};

export function changeMenuStatus(status){
    return ({
        type: CHANGE_MENU_STATUS ,
        payload: status
    });
};

export function chooseActiveElement(node){
    return ({
        type: CHOOSE_ACTIVE_ELEMENT,
        payload: node
    });
};


