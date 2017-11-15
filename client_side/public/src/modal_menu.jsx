import React from 'react';

//Меню выбора действия
class ModalMenu extends React.Component{
    constructor(props) {
        super(props);
        
        this.addLine    = this.addLine.bind(this);
        this.deleteNode = this.deleteNode.bind(this);
        this.deleteLine = this.deleteLine.bind(this);
    };
    
    addLine(){
        this.props.drawLine();
    }
    
    deleteNode(){
        this.props.deleteNode();
    }
    
    deleteLine(){
        this.props.deleteLine();
    }
         
    render(){
        let modalClass = this.props.menuSettings.open ? 'modal-open' : 'modal-close';
        let modalStyle = this.props.menuSettings.PointX && this.props.menuSettings.PointX 
                            ? {left: this.props.menuSettings.PointX,top:this.props.menuSettings.PointY}
                            : {};
        let lineButtonStyle  = this.props.menuSettings.showLine ? {display: "block"} : {display: "none"};
        let NodeButtonsStyle = !this.props.menuSettings.showLine ? {display: "block"} : {display: "none"};
        
        return (     
                <div className = {modalClass} style = {modalStyle}>
                 <div>
                    <input  type = "button" value = "add line"
                            onClick = {this.addLine} className = "btn btn-block"
                            style = {NodeButtonsStyle}
                    />
                    <input type = "button" value = "delete node" 
                            onClick = {this.deleteNode} className = "btn btn-danger btn-block"
                            style = {NodeButtonsStyle}
                    />
                    <input  type = "button" value = "delete line" 
                            onClick = {this.deleteLine} className = "btn btn-danger btn-block" 
                            style = {lineButtonStyle}
                    />
                 </div>
            </div>               
        );
    };
};

export default ModalMenu;

