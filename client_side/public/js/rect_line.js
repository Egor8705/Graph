"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function rect_draw(props) {
    var ctx = props.ctx,
        x = props.x,
        y = props.y,
        width = props.width,
        height = props.height;

    ctx.fillRect(x, y, width, height);
}

function line_draw(props) {
    var ctx = props.ctx,
        startX = props.startX,
        startY = props.startY,
        finishX = props.finishX,
        finishY = props.finishY,
        lineWidth = props.lineWidth,
        bias = props.bias;


    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(startX + bias, startY + bias);
    ctx.lineTo(finishX + bias, finishY + bias);
    ctx.stroke();
}

exports.rect_draw = rect_draw;
exports.line_draw = line_draw;