
function rect_draw(props){
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
};

function line_draw(props){
    const {ctx, startX,startY,finishX,finishY, lineWidth,bias} = props;
    
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(startX + bias, startY + bias);
        ctx.lineTo(finishX + bias, finishY + bias);
        ctx.stroke();
};

export {rect_draw,line_draw};