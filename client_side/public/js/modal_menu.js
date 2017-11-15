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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Меню выбора действия
var ModalMenu = function (_React$Component) {
    _inherits(ModalMenu, _React$Component);

    function ModalMenu(props) {
        _classCallCheck(this, ModalMenu);

        var _this = _possibleConstructorReturn(this, (ModalMenu.__proto__ || Object.getPrototypeOf(ModalMenu)).call(this, props));

        _this.addLine = _this.addLine.bind(_this);
        _this.deleteNode = _this.deleteNode.bind(_this);
        _this.deleteLine = _this.deleteLine.bind(_this);
        return _this;
    }

    _createClass(ModalMenu, [{
        key: 'addLine',
        value: function addLine() {
            this.props.drawLine();
        }
    }, {
        key: 'deleteNode',
        value: function deleteNode() {
            this.props.deleteNode();
        }
    }, {
        key: 'deleteLine',
        value: function deleteLine() {
            this.props.deleteLine();
        }
    }, {
        key: 'render',
        value: function render() {
            var modalClass = this.props.menuSettings.open ? 'modal-open' : 'modal-close';
            var modalStyle = this.props.menuSettings.PointX && this.props.menuSettings.PointX ? { left: this.props.menuSettings.PointX, top: this.props.menuSettings.PointY } : {};
            var lineButtonStyle = this.props.menuSettings.showLine ? { display: "block" } : { display: "none" };
            var NodeButtonsStyle = !this.props.menuSettings.showLine ? { display: "block" } : { display: "none" };

            return _react2.default.createElement(
                'div',
                { className: modalClass, style: modalStyle },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement('input', { type: 'button', value: 'add line',
                        onClick: this.addLine, className: 'btn btn-block',
                        style: NodeButtonsStyle
                    }),
                    _react2.default.createElement('input', { type: 'button', value: 'delete node',
                        onClick: this.deleteNode, className: 'btn btn-danger btn-block',
                        style: NodeButtonsStyle
                    }),
                    _react2.default.createElement('input', { type: 'button', value: 'delete line',
                        onClick: this.deleteLine, className: 'btn btn-danger btn-block',
                        style: lineButtonStyle
                    })
                )
            );
        }
    }]);

    return ModalMenu;
}(_react2.default.Component);

;

exports.default = ModalMenu;