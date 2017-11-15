'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _modal_menu = require('./modal_menu');

var _modal_menu2 = _interopRequireDefault(_modal_menu);

var _rect_line = require('./rect_line');

var _constants = require('../constants/constants');

var _actions = require('../actions/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainBoard = function (_React$Component) {
    _inherits(MainBoard, _React$Component);

    function MainBoard(props) {
        _classCallCheck(this, MainBoard);

        var _this = _possibleConstructorReturn(this, (MainBoard.__proto__ || Object.getPrototypeOf(MainBoard)).call(this, props));

        _this.drawCanvas = _this.drawCanvas.bind(_this);
        _this.getMousePosition = _this.getMousePosition.bind(_this);

        _this.click_left = _this.click_left.bind(_this);
        _this.moving = _this.moving.bind(_this);
        _this.mouseUp = _this.mouseUp.bind(_this);
        _this.addLine = _this.addLine.bind(_this);
        _this.drawLine = _this.drawLine.bind(_this);
        _this.deleteNode = _this.deleteNode.bind(_this);
        _this.deleteLine = _this.deleteLine.bind(_this);
        _this.addNode = _this.addNode.bind(_this);
        _this.click_rigth = _this.click_rigth.bind(_this);
        _this.getLine = _this.getLine.bind(_this);
        _this.deleteLineButton = _this.deleteLineButton.bind(_this);
        _this.getNodeByClick = _this.getNodeByClick.bind(_this);
        return _this;
    }

    _createClass(MainBoard, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var dispatch = this.props.dispatch;

            dispatch((0, _actions.getNodesList)()).then(function () {
                return _this2.drawCanvas();
            });
            dispatch((0, _actions.getLinesList)()).then(function () {
                return _this2.drawCanvas();
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.drawCanvas();
        }

        // Функция отрисовки

    }, {
        key: 'drawCanvas',
        value: function drawCanvas(mouse_x, mouse_y) {
            var _props = this.props,
                lines = _props.lines,
                nodes = _props.nodes;


            var canvas = this.refs.myCanvas;
            var ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, 1200, 1200);
            ctx.fillStyle = "#808080";
            ctx.strokeStyle = "#00FFFF";
            if (!!lines.length && !!nodes.length) {
                lines.forEach(function (line) {
                    var startNode = line.start;
                    var finishNode = line.finish;

                    var start = void 0,
                        finish = void 0;
                    nodes.forEach(function (node) {
                        if (node.id == startNode) start = node;
                        if (node.id == finishNode) finish = node;
                    });

                    if (start != undefined && finish != undefined) {
                        (0, _rect_line.line_draw)({
                            ctx: ctx,
                            startX: start.x,
                            startY: start.y,
                            finishX: finish.x,
                            finishY: finish.y,
                            lineWidth: 2,
                            bias: 25
                        });
                    }
                });

                nodes.forEach(function (node) {
                    (0, _rect_line.rect_draw)({
                        ctx: ctx,
                        x: node.x,
                        y: node.y,
                        width: 50,
                        height: 50
                    });
                });

                if (this.props.startElement != null && this.props.startElement != undefined) {
                    (0, _rect_line.line_draw)({
                        ctx: ctx,
                        startX: this.props.startElement.x,
                        startY: this.props.startElement.y,
                        finishX: mouse_x - 25,
                        finishY: mouse_y - 25,
                        lineWidth: 2,
                        bias: 25
                    });
                }
            }
        }
    }, {
        key: 'getMousePosition',
        value: function getMousePosition(event) {
            var bias = this.refs.myCanvas.getBoundingClientRect();

            var x_pos = event.clientX - bias.left;
            var y_pos = event.clientY - bias.top;
            return {
                x: x_pos,
                y: y_pos,
                X: event.clientX,
                Y: event.clientY
            };
        }
        // Обработка правой кнопки мыши

    }, {
        key: 'click_rigth',
        value: function click_rigth(event) {
            event.preventDefault();
            var dispatch = this.props.dispatch;

            var _getMousePosition = this.getMousePosition(event),
                x = _getMousePosition.x,
                y = _getMousePosition.y,
                X = _getMousePosition.X,
                Y = _getMousePosition.Y;

            var result = this.getNodeByClick(x, y)[0];

            if (event.button === 2) {
                if (result) {
                    dispatch((0, _actions.chooseActiveElement)(result));
                    dispatch((0, _actions.changeMenuStatus)({
                        open: true,
                        PointX: X,
                        PointY: Y,
                        showLine: false
                    }));
                } else {
                    var Line = this.getLine(event);
                    if (Line != undefined && Line != null) {
                        dispatch((0, _actions.chooseActiveLine)(Line));
                        dispatch((0, _actions.changeMenuStatus)({
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

    }, {
        key: 'click_left',
        value: function click_left(event) {
            event.preventDefault();
            var dispatch = this.props.dispatch;

            var _getMousePosition2 = this.getMousePosition(event),
                x = _getMousePosition2.x,
                y = _getMousePosition2.y;

            var result = this.getNodeByClick(x, y)[0];

            if (event.button === 0) {
                if (result) {
                    dispatch((0, _actions.chooseElement)({
                        node: result,
                        pointX: result.x - x,
                        pointY: result.y - y
                    }));
                    if (this.props.startElement != null) {
                        if (this.props.startElement.id !== result.id) {
                            dispatch((0, _actions.chooseFinishElement)(result));
                            this.addLine(result);
                        }
                    }
                    dispatch((0, _actions.chooseActiveElement)(null));
                } else {
                    dispatch((0, _actions.chooseStartElement)(null));
                    dispatch((0, _actions.chooseFinishElement)(null));
                    this.drawCanvas();
                };
                dispatch((0, _actions.changeMenuStatus)({
                    open: false,
                    PointX: 0,
                    PointY: 0,
                    showLine: false
                }));
            }
        }

        // Обновление положения передвигаемого блока

    }, {
        key: 'mouseUp',
        value: function mouseUp() {
            var dispatch = this.props.dispatch;
            var dragAndDropElement = this.props.dragAndDropElement;


            if (dragAndDropElement != null) {
                this.funcFetch("http://localhost:4001/api/changeNodePosition", "POST", {
                    id: dragAndDropElement.node.id,
                    X: dragAndDropElement.node.x,
                    Y: dragAndDropElement.node.y
                }).then(function () {
                    dispatch((0, _actions.chooseElement)(null));
                });
            }
        }

        // Если выбран узел, то можно его перетаскивать

    }, {
        key: 'moving',
        value: function moving(event) {
            var dispatch = this.props.dispatch;
            var dragAndDropElement = this.props.dragAndDropElement;


            if (dragAndDropElement != null) {
                var nodes = this.props.nodes;

                var _getMousePosition3 = this.getMousePosition(event),
                    x = _getMousePosition3.x,
                    y = _getMousePosition3.y;

                var result = void 0;
                nodes.forEach(function (node, index) {
                    if (node.id === dragAndDropElement.node.id) result = index;
                });

                nodes[result].x = x + dragAndDropElement.pointX;
                nodes[result].y = y + dragAndDropElement.pointY;

                dispatch((0, _actions.uploadNodeList)(nodes));
                dispatch((0, _actions.uploadChoosenElementPos)({
                    node: nodes[result],
                    pointX: dragAndDropElement.pointX,
                    pointY: dragAndDropElement.pointY
                }));
                this.drawCanvas();
            }
            if (this.props.startElement != null && this.props.startElement != undefined) {
                var _getMousePosition4 = this.getMousePosition(event),
                    _x = _getMousePosition4.x,
                    _y = _getMousePosition4.y;

                this.drawCanvas(_x, _y);
            }
        }

        // Определяеям выбраный элемент

    }, {
        key: 'getNodeByClick',
        value: function getNodeByClick(x, y) {
            return this.props.nodes.filter(function (node) {
                return x >= node.x && x <= node.x + 50 && y >= node.y && y <= node.y + 50;
            });
        }
    }, {
        key: 'funcFetch',
        value: function funcFetch(URL, method, data) {
            return fetch(URL, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: method,
                body: JSON.stringify(data)
            });
        }
    }, {
        key: 'getLine',


        // Захват  выбранной  линиии
        value: function getLine(event) {
            var _props2 = this.props,
                lines = _props2.lines,
                nodes = _props2.nodes;

            var _getMousePosition5 = this.getMousePosition(event),
                x = _getMousePosition5.x,
                y = _getMousePosition5.y;

            return lines.filter(function (line) {
                var NodeStart = void 0;
                var NodeFinish = void 0;

                NodeStart = nodes.filter(function (node) {
                    return node.id === line.start;
                })[0];

                NodeFinish = nodes.filter(function (node) {
                    return node.id === line.finish;
                })[0];

                if (NodeStart != undefined && NodeFinish != undefined) {
                    var PointStartX = NodeStart.x + 25;
                    var PointStartY = NodeStart.y + 25;

                    var PointFinishX = NodeFinish.x + 25;
                    var PointFinishY = NodeFinish.y + 25;

                    var len = Math.sqrt(Math.pow(PointStartX - PointFinishX, 2) + Math.pow(PointStartY - PointFinishY, 2));
                    var len1 = Math.sqrt(Math.pow(PointStartX - x, 2) + Math.pow(PointStartY - y, 2));
                    var len2 = Math.sqrt(Math.pow(x - PointFinishX, 2) + Math.pow(y - PointFinishY, 2));

                    return len1 + len2 - len < 1.5;
                }
            })[0];
        }

        // Добавление линии

    }, {
        key: 'addLine',
        value: function addLine(result) {
            var _this3 = this;

            var lines = this.props.lines;
            var dispatch = this.props.dispatch;


            this.funcFetch("http://localhost:4001/api/addLine", "PUT", {
                start: this.props.startElement.id,
                finish: result.id
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                lines.push({
                    id: data.id[0].id,
                    start: _this3.props.startElement.id,
                    finish: result.id
                });
                dispatch((0, _actions.uploadLinesList)(lines));
                dispatch((0, _actions.chooseFinishElement)(null));
                dispatch((0, _actions.chooseStartElement)(null));
            }).then(function () {
                _this3.drawCanvas();
            }).catch(function (err) {
                console.log(err);
            });
        }

        // Обработчик для кнопки "add line"

    }, {
        key: 'drawLine',
        value: function drawLine() {
            var dispatch = this.props.dispatch;

            dispatch((0, _actions.chooseStartElement)(this.props.activeElement));
            dispatch((0, _actions.changeMenuStatus)({
                open: false,
                PointX: 0,
                PointY: 0,
                showLine: false
            }));
        }
    }, {
        key: 'addNode',


        // Добавление узла
        value: function addNode() {
            var _this4 = this;

            var dispatch = this.props.dispatch;
            var nodes = this.props.nodes;

            var newNode = {
                x: 40,
                y: 40
            };

            this.funcFetch("http://localhost:4001/api/addNode", "PUT", {
                x: newNode.x,
                y: newNode.y
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                nodes.push({
                    id: data.id[0].id,
                    x: 40,
                    y: 40
                });
                dispatch((0, _actions.uploadNodeList)(nodes));
            }).then(function () {
                _this4.drawCanvas();
            }).catch(function (err) {
                console.log(err);
            });
        }

        // Обработчик кнопки "delete line" 

    }, {
        key: 'deleteLineButton',
        value: function deleteLineButton() {
            var dispatch = this.props.dispatch;

            if (this.props.activeLine != null) {
                var lineArray = [this.props.activeLine.id];
                this.deleteLine(lineArray);
                dispatch((0, _actions.chooseActiveLine)(null));
                dispatch((0, _actions.changeMenuStatus)({
                    open: false,
                    PointX: 0,
                    PointY: 0,
                    showLine: false
                }));
            }
        }

        //удаление линии (принимает массив id линий для удаления группы в случае удаления узла)

    }, {
        key: 'deleteLine',
        value: function deleteLine(IDs) {
            var _this5 = this;

            var dispatch = this.props.dispatch;
            var lines = this.props.lines;


            this.funcFetch("http://localhost:4001/api/deleteLine", "DELETE", {
                id: IDs
            }).then(function (res) {
                return res.json();
            }).then(function (data) {

                var deletedLineIndex = [];
                lines.forEach(function (line, index) {
                    IDs.forEach(function (id) {
                        if (line.id === id) deletedLineIndex.push(index);
                    });
                });

                deletedLineIndex.forEach(function (lineID) {
                    lines.splice(lineID, 1);
                });

                dispatch((0, _actions.uploadLinesList)(lines));
            }).then(function () {
                _this5.drawCanvas();
            }).catch(function (err) {
                console.log(err);
            });
        }

        // Удаление узла

    }, {
        key: 'deleteNode',
        value: function deleteNode() {
            var _this6 = this;

            var _props3 = this.props,
                nodes = _props3.nodes,
                activeElement = _props3.activeElement,
                lines = _props3.lines;
            var dispatch = this.props.dispatch;


            if (activeElement != null) {
                var deletedNodeId = activeElement.id;

                this.funcFetch("http://localhost:4001/api/deleteNode", "DELETE", {
                    id: deletedNodeId
                }).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    var deletedNodeIndex = void 0;
                    nodes.forEach(function (node, index) {
                        if (node.id === deletedNodeId) deletedNodeIndex = index;
                    });

                    nodes.splice(deletedNodeIndex, 1);
                    dispatch((0, _actions.uploadNodeList)(nodes));
                    dispatch((0, _actions.changeMenuStatus)({
                        open: false,
                        PointX: 0,
                        PointY: 0,
                        showLine: false
                    }));
                }).then(function () {
                    _this6.drawCanvas();
                }).catch(function (err) {
                    console.log(err);
                });

                var IDs = [];

                lines.forEach(function (line) {
                    if (line.start == deletedNodeId || line.finish == deletedNodeId) {
                        IDs.push(line.id);
                    }
                });

                if (!!IDs.length) {
                    this.deleteLine(IDs);
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'conteiner' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement('div', { className: 'col-xs-12 col-md-2' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-12 col-md-8' },
                            _react2.default.createElement(
                                'div',
                                { className: 'canvasStyle' },
                                _react2.default.createElement('canvas', {
                                    ref: 'myCanvas', width: 1000, height: 1000,
                                    onMouseDown: this.click_left,
                                    onMouseMove: this.moving,
                                    onMouseUp: this.mouseUp,
                                    onContextMenu: this.click_rigth
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'col-xs-12 col-md-2' },
                            _react2.default.createElement('input', { type: 'button', value: 'Add node', onClick: this.addNode })
                        )
                    )
                ),
                _react2.default.createElement(_modal_menu2.default, { menuSettings: this.props.Menu,
                    drawLine: this.drawLine,
                    deleteNode: this.deleteNode,
                    deleteLine: this.deleteLineButton
                })
            );
        }
    }]);

    return MainBoard;
}(_react2.default.Component);

;

function mapStateToProps(state) {
    return {
        nodes: state.nodes.nodes,
        lines: state.lines.lines,
        dragAndDropElement: state.checkedElements.dragAndDropElement, // узел для перетаскивания
        startElement: state.checkedElements.startElement, // узел начала линии
        finishElement: state.checkedElements.finishElement, // узел конца линии
        activeElement: state.checkedElements.activeElement, // узел, выбранный правой кнопкой мыши
        Menu: state.checkedElements.Menu, // состояния дополнительного меню
        activeLine: state.checkedElements.activeLine // линия, выбранная правой кнопкой мыши
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MainBoard);