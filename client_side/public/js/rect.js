"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = rect;
function rect(props) {
    var ctx = props.ctx,
        x = props.x,
        y = props.y,
        width = props.width,
        height = props.height;

    ctx.fillRect(x, y, width, height);
}