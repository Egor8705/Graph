import React from 'react';
import {connect} from 'react-redux';

import ModalMenu from './modal_menu.jsx';
import {rect_draw,line_draw} from './rect_line';

import {
    UPLOAD_NODES_LIST,
    UPLOAD_LINES_LIST
} from '../constants/constants';

import {
    getNodesList,
    getLinesList,
    chooseElement,
    uploadNodeList,
    uploadLinesList,
    uploadChoosenElementPos,
    chooseStartElement,
    chooseFinishElement,
    changeMenuStatus,
    chooseActiveElement,
    chooseActiveLine
} from '../actions/actions';

class MainBoard extends React.Component{
    constructor(props) {
        super(props);
        this.drawCanvas = this.drawCanvas.bind(this);
        this.getMousePosition = this.getMousePosition.bind(this);

        this.click_left = this.click_left.bind(this);
        this.moving = this.moving.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.addLine = this.addLine.bind(this);
        this.drawLine = this.drawLine.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.deleteLine = this.deleteLine.bind(this);
        this.addNode = this.addNode.bind(this);
        this.click_rigth = this.click_rigth.bind(this);
        this.getLine = this.getLine.bind(this);
        this.deleteLineButton = this.deleteLineButton.bind(this);
        this.getNodeByClick = this.getNodeByClick.bind(this);
    };
   
    componentDidMount(){
         const {dispatch} = this.props;       
         dispatch(getNodesList()).then(() => this.drawCanvas());
         dispatch(getLinesList()).then(() => this.drawCanvas());
    }
    
    componentDidUpdate() {
        this.drawCanvas();
    }
  
    // Функция отрисовки
    drawCanvas(mouse_x,mouse_y){
        
        let {lines, nodes} = this.props;
      
        const canvas = this.refs.myCanvas;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, 1200, 1200);
        ctx.fillStyle = "#808080";
        ctx.strokeStyle = "#00FFFF";
        if(!!lines.length && !!nodes.length){
            lines.forEach((line) => {
                let startNode = line.start;
                let finishNode = line.finish;

                let start,finish;
                    nodes.forEach((node) => {
                        if (node.id == startNode) start = node;
                        if (node.id == finishNode) finish = node;
                });

                if(start != undefined && finish != undefined){
                    line_draw({
                        ctx,
                        startX:     start.x,
                        startY:     start.y,
                        finishX:    finish.x,
                        finishY:    finish.y,
                        lineWidth:  2,
                        bias:       25
                    });
                }         
            });

            nodes.forEach((node) => {
                rect_draw({
                    ctx,
                    x:      node.x, 
                    y:      node.y, 
                    width:  50, 
                    height: 50
                });
            });
           
            if(this.props.startElement != null && this.props.startElement != undefined){
                line_draw({
                    ctx,
                    startX:     this.props.startElement.x,
                    startY:     this.props.startElement.y,
                    finishX:    mouse_x - 25,
                    finishY:    mouse_y - 25,
                    lineWidth:  2,
                    bias: 25
                });
            }
        }             
    }
   
   getMousePosition(event){
       let bias = this.refs.myCanvas.getBoundingClientRect();
       
       let x_pos = event.clientX - bias.left;
       let y_pos = event.clientY - bias.top;
       return {
           x: x_pos,
           y: y_pos,
           X: event.clientX,
           Y: event.clientY
       };
   }
    // Обработка правой кнопки мыши
    click_rigth(event){
        event.preventDefault();
        const {dispatch} = this.props;
        
        let {x,y,X,Y} = this.getMousePosition(event);

        let result = this.getNodeByClick(x,y)[0];

        if(event.button === 2){
            if(result){
                dispatch(chooseActiveElement(result));
                dispatch(changeMenuStatus({
                    open: true,
                    PointX: X,
                    PointY: Y,
                    showLine:false
                }));
            }

            else {
                let Line = this.getLine(event);
                if(Line != undefined && Line != null){
                    dispatch(chooseActiveLine(Line));
                    dispatch(changeMenuStatus({
                        open: true,
                        PointX: X,
                        PointY: Y,
                        showLine: true
                    })); 
                }
            }
        }                        
    }
   
    // Обработка левой кнопки мыши
    click_left(event){
        event.preventDefault();
        const {dispatch} = this.props;
        
        let {x,y} = this.getMousePosition(event);
        
        let result = this.getNodeByClick(x,y)[0];
         
        if(event.button === 0){
            if (result){
                dispatch(chooseElement({
                    node:   result,
                    pointX: result.x - x,
                    pointY: result.y - y
                }));
                if (this.props.startElement != null){
                    if(this.props.startElement.id !== result.id){
                        dispatch(chooseFinishElement(result));
                        this.addLine(result);
                    };
                }
                 dispatch(chooseActiveElement(null))
            } else {
                dispatch(chooseStartElement(null));
                dispatch(chooseFinishElement(null));
                this.drawCanvas();
            };
            dispatch(changeMenuStatus({
                open:false,
                PointX: 0,
                PointY: 0,
                showLine: false
            }));
            
        };
    };
   
   // Обновление положения передвигаемого блока
    mouseUp(){
        const {dispatch} = this.props;
        let {dragAndDropElement} = this.props;

        if (dragAndDropElement != null){
            this.funcFetch("http://localhost:4000/api/changeNodePosition","POST",
            {
                id: dragAndDropElement.node.id,
                X:  dragAndDropElement.node.x, 
                Y:  dragAndDropElement.node.y
            }).then(() => {
                dispatch(chooseElement(null));
            });
        };
    };
   
    // Если выбран узел, то можно его перетаскивать
    moving(event){
        const {dispatch} = this.props;
        let {dragAndDropElement} = this.props;
       
        if(dragAndDropElement != null){
            
            let {nodes} = this.props;
            
            let {x,y} = this.getMousePosition(event);
            
            
            let result;
            nodes.forEach((node,index) => {
               if (node.id === dragAndDropElement.node.id) result = index;
            });

            nodes[result].x = x + dragAndDropElement.pointX;
            nodes[result].y = y + dragAndDropElement.pointY;
            
            dispatch(uploadNodeList(nodes));
            dispatch(uploadChoosenElementPos({
                node:   nodes[result],
                pointX: dragAndDropElement.pointX,
                pointY: dragAndDropElement.pointY
            }));
            this.drawCanvas();            
        };
        if(this.props.startElement != null && this.props.startElement != undefined){
            let {x,y} = this.getMousePosition(event);
            this.drawCanvas(x,y); 
        };       
    };
   
   // Определяеям выбраный элемент
   getNodeByClick(x,y){
        return this.props.nodes.filter((node) => {
            return (x >= node.x && x <= (node.x + 50) && y >= node.y && y <= (node.y + 50));
        });
   }
   
   funcFetch(URL,method,data){
        return fetch(URL,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    method: method,
                    body: JSON.stringify(data)
            });
    }; 
   
   // Захват  выбранной  линиии
   getLine(event){
       let {lines,nodes} = this.props;

       let {x,y} = this.getMousePosition(event);

       return lines.filter((line) => {
            let NodeStart; 
            let NodeFinish;
            
            
            NodeStart = nodes.filter((node) => {
                return (node.id === line.start); 
            })[0];

            NodeFinish = nodes.filter((node) => {
                return (node.id === line.finish); 
            })[0];
            
            if(NodeStart != undefined && NodeFinish != undefined){
                let PointStartX = NodeStart.x + 25;
                let PointStartY = NodeStart.y + 25;
                
                let PointFinishX = NodeFinish.x + 25;
                let PointFinishY = NodeFinish.y + 25;
                
                let len  = Math.sqrt(Math.pow(PointStartX - PointFinishX,2) + Math.pow(PointStartY- PointFinishY,2));
                let len1 = Math.sqrt(Math.pow(PointStartX - x,2) + Math.pow(PointStartY - y,2));
                let len2 = Math.sqrt(Math.pow(x - PointFinishX,2) + Math.pow(y - PointFinishY,2));
                
                return ((len1 + len2 - len) < 1.5);   
            }
        })[0]; 
   }
   
    // Добавление линии
    addLine(result){
        let   {lines}    = this.props;
        const {dispatch} = this.props;
        
        this.funcFetch("http://localhost:4000/api/addLine","PUT",
            {
                start: this.props.startElement.id, 
                finish: result.id
            })
            .then((res) => res.json())
            .then((data) => {                   
                lines.push({
                    id:     data.id,
                    start:  data.start,
                    finish: data.finish
                });
                dispatch(uploadLinesList(lines));
                dispatch(chooseFinishElement(null));
                dispatch(chooseStartElement(null));
            })
            .then(() => {
                this.drawCanvas();
            })
            .catch((err) => {
                 console.log(err);
            });  
    }
   
    // Обработчик для кнопки "add line"
    drawLine(){
        const {dispatch} = this.props;
        dispatch(chooseStartElement(this.props.activeElement));
        dispatch(changeMenuStatus({
            open: false,
            PointX: 0,
            PointY: 0,
            showLine: false
        }));
    };
    
    
    // Добавление узла
    addNode(){
        const {dispatch} = this.props;
        let {nodes} = this.props;
        let newNode = {
                x: 40,
                y: 40
        };
        
        this.funcFetch("http://localhost:4000/api/addNode","PUT",
        {
            x: newNode.x, 
            y: newNode.y
        })
        .then((res) => res.json())
        .then((data) => {                   
            nodes.push({
                id: data.id,
                x:  data.x,
                y:  data.y
            });
            dispatch(uploadNodeList(nodes));
        })
        .then(() => {
            this.drawCanvas();
        })
        .catch((err) => {
            console.log(err);
        });          
    }
    
    // Обработчик кнопки "delete line" 
    deleteLineButton(){
        const {dispatch} = this.props;
        if (this.props.activeLine != null){
            let lineArray = [this.props.activeLine.id];
            this.deleteLine(lineArray);
            dispatch(chooseActiveLine(null));
            dispatch(changeMenuStatus({
                open:false,
                PointX: 0,
                PointY: 0,
                showLine: false
            }));
        }
    }
    
    //удаление линии (принимает массив id линий для удаления группы в случае удаления узла)
    deleteLine(IDs){
        const {dispatch} = this.props;
        let {lines} = this.props;

        this.funcFetch("http://localhost:4000/api/deleteLine","DELETE",
        {
             id: IDs
        })
        .then((res) => res.json())
        .then((data) => {
            let deletedLineIndex = [];
            lines.forEach((line,index) => {
                IDs.forEach(id => {
                  if (line.id === id) deletedLineIndex.push(index);  
                })
            });
            
            deletedLineIndex.forEach(lineID => {
                lines.splice(lineID,1);
            });
            dispatch(uploadLinesList(lines));
        })
        .then(() => {
            this.drawCanvas();
        })
        .catch((err) => {
            console.log(err);
        }); 
        
    }
    
    // Удаление узла
    deleteNode(){
       let {nodes,activeElement,lines} = this.props;
       const {dispatch} = this.props;
       
       if(activeElement != null){
            let deletedNodeId = activeElement.id;
            
            this.funcFetch("http://localhost:4000/api/deleteNode","DELETE",
            {
                id: deletedNodeId
            })
            .then((res) => res.json())
            .then((data) => {                   
                let deletedNodeIndex;
                nodes.forEach((node,index) => {
                    if (node.id === data.id) deletedNodeIndex = index;
                });

                nodes.splice(deletedNodeIndex,1);
                dispatch(uploadNodeList(nodes));
                dispatch(changeMenuStatus({
                    open: false,
                    PointX: 0,
                    PointY: 0,
                    showLine: false
                })); 
            })
            .then(() => {
                this.drawCanvas();
            })
            .catch((err) => {
                console.log(err);
            }); 

            let IDs = [];    

            lines.forEach(line => {
               if (line.start == deletedNodeId || line.finish == deletedNodeId){
                    IDs.push(line.id);
               } 
            });
            
            if (!!IDs.length){
                this.deleteLine(IDs);
            }
       }
    }
                
         
    render(){   
        return ( 
            <div>
                <div className = 'conteiner'>
                    <div className = 'row'>
                        <div className = 'col-xs-12 col-md-2'>
                        </div>
                        <div className = 'col-xs-12 col-md-8'>
                            <div className = "canvasStyle">
                                <canvas 
                                        ref = "myCanvas" width = {1000} height = {1000} 
                                        onMouseDown   = {this.click_left}
                                        onMouseMove   = {this.moving}
                                        onMouseUp     = {this.mouseUp}
                                        onContextMenu = {this.click_rigth}
                                />
                            </div>
                        </div>
                        <div className = 'col-xs-12 col-md-2'>
                            <input type = "button" value = "Add node" onClick = {this.addNode}/>
                        </div>

                    </div>
                </div>
                <ModalMenu   menuSettings =    {this.props.Menu}
                             drawLine =        {this.drawLine}
                             deleteNode =      {this.deleteNode}
                             deleteLine =      {this.deleteLineButton}
                        />
            </div>
        );
     };
};

function mapStateToProps (state) {
  return {
        nodes:              state.nodes.nodes,
        lines:              state.lines.lines,
        dragAndDropElement: state.checkedElements.dragAndDropElement,   // узел для перетаскивания
        startElement:       state.checkedElements.startElement,         // узел начала линии
        finishElement:      state.checkedElements.finishElement,        // узел конца линии
        activeElement:      state.checkedElements.activeElement,        // узел, выбранный правой кнопкой мыши
        Menu:               state.checkedElements.Menu,                 // состояния дополнительного меню
        activeLine:         state.checkedElements.activeLine            // линия, выбранная правой кнопкой мыши
  };
};

export default connect(mapStateToProps)(MainBoard);
