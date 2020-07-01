'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React$1 = require('react');
var React$1__default = _interopDefault(React$1);
var react = require('@emotion/react');
require('@emotion/core');
var reactDom = _interopDefault(require('react-dom'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var typescale = {
  lvl1: "1rem",
  lvl2: "1.25rem",
  lvl3: "1.563rem",
  lvl4: "1.953em"
};
var system = {
  white: "#ffffff",
  foreground: "#f7f7f7",
  gray: "#e5e5e5",
  border: "#d8d8d8",
  darkGray: "#b2b2b2",
  black: "#2D2926",
  pitchBlack: "#0c0c0c",
  brand: "#2935ff",
  green: "#28a745",
  yellow: " #FFC940",
  red: "#ff0000",
  lightGreen: "#93d3a2",
  lightYellow: "#ffd76f",
  lightRed: "#ff8080",
  lightBlue: "#949aff"
};

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  cursor: not-allowed;\n  background-color: ", ";\n  color: ", ";\n\n  :focus {\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  cursor: not-allowed;\n  background-color: ", ";\n  color: ", ";\n\n  :focus {\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  cursor: pointer;\n  background-color: ", ";\n  color: ", ";\n\n  :hover {\n    background-color: ", ";\n  }\n\n  :focus {\n    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);\n    background-color: ", ";\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  cursor: pointer;\n  background-color: ", ";\n  color: ", ";\n\n  :hover {\n    background-color: ", ";\n  }\n\n  :focus {\n    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);\n    background-color: ", ";\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  cursor: pointer;\n  background-color: ", ";\n  color: ", ";\n\n  :hover {\n    background-color: #003fe3;\n  }\n\n  :focus {\n    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);\n    background-color: ", ";\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  cursor: pointer;\n  background-color: ", ";\n  color: ", ";\n\n  :hover {\n    background-color: #003fe3;\n  }\n\n  :focus {\n    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);\n    background-color: ", ";\n    outline: 0;\n    border: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_BUTTON = "\n  border-radius: 4px;\n  outline: 0;\n  border: 0;\n  min-height: 40px;\n  padding: 6px 24px 6px 24px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  letter-spacing: 0.2px;\n  font-family: \"inter-semi-bold\";\n  transition: 200ms ease all;\n";
var STYLES_BUTTON_FULL = "\n  border-radius: 4px;\n  outline: 0;\n  border: 0;\n  min-height: 40px;\n  padding: 6px 24px 6px 24px;\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  letter-spacing: 0.2px;\n  font-family: \"inter-semi-bold\";\n  transition: 200ms ease all;\n";
var STYLES_BUTTON_PRIMARY = react.css(_templateObject(), STYLES_BUTTON, system.brand, system.white, system.brand);
var ButtonPrimary = function ButtonPrimary(props) {
  if (props.type === 'label') {
    return /*#__PURE__*/React$1.createElement("label", _extends({
      css: STYLES_BUTTON_PRIMARY
    }, props));
  }

  return /*#__PURE__*/React$1.createElement("button", _extends({
    css: STYLES_BUTTON_PRIMARY
  }, props));
};
var STYLES_BUTTON_PRIMARY_FULL = react.css(_templateObject2(), STYLES_BUTTON_FULL, system.brand, system.white, system.brand);
var ButtonPrimaryFull = function ButtonPrimaryFull(props) {
  if (props.type === 'label') {
    return /*#__PURE__*/React$1.createElement("label", _extends({
      css: STYLES_BUTTON_PRIMARY_FULL
    }, props));
  }

  return /*#__PURE__*/React$1.createElement("button", _extends({
    css: STYLES_BUTTON_PRIMARY_FULL
  }, props));
};
var STYLES_BUTTON_SECONDARY = react.css(_templateObject3(), STYLES_BUTTON, system.black, system.white, system.pitchBlack, system.black);
var ButtonSecondary = function ButtonSecondary(props) {
  if (props.type === 'label') {
    return /*#__PURE__*/React$1.createElement("label", _extends({
      css: STYLES_BUTTON_SECONDARY
    }, props));
  }

  return /*#__PURE__*/React$1.createElement("button", _extends({
    css: STYLES_BUTTON_SECONDARY
  }, props));
};
var STYLES_BUTTON_SECONDARY_FULL = react.css(_templateObject4(), STYLES_BUTTON_FULL, system.black, system.white, system.pitchBlack, system.black);
var ButtonSecondaryFull = function ButtonSecondaryFull(props) {
  if (props.type === 'label') {
    return /*#__PURE__*/React$1.createElement("label", _extends({
      css: STYLES_BUTTON_SECONDARY_FULL
    }, props));
  }

  return /*#__PURE__*/React$1.createElement("button", _extends({
    css: STYLES_BUTTON_SECONDARY_FULL
  }, props));
};
var STYLES_BUTTON_DISABLED = react.css(_templateObject5(), STYLES_BUTTON, system.gray, system.darkGray);
var ButtonDisabled = function ButtonDisabled(props) {
  return /*#__PURE__*/React$1.createElement("button", _extends({
    css: STYLES_BUTTON_DISABLED
  }, props));
};
var STYLES_BUTTON_DISABLED_FULL = react.css(_templateObject6(), STYLES_BUTTON_FULL, system.gray, system.darkGray);
var ButtonDisabledFull = function ButtonDisabledFull(props) {
  return /*#__PURE__*/React$1.createElement("button", _extends({
    css: STYLES_BUTTON_DISABLED_FULL
  }, props));
};

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n  background: #fdfdfd;\n  color: rgba(0, 0, 0, 0.4);\n  font-size: 14px;\n  font-family: 'inter-semi-bold';\n  height: 48px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: 200ms ease all;\n  user-select: none;\n  border-bottom: 2px solid transparent;\n\n  :last-child {\n    box-shadow: none;\n  }\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  align-items: flex-start;\n  box-shadow: 0 -1px 0 0 ", ", 0 1px 0 0 ", ";\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var TAB_GROUP_SIZE_MAP = {
  1: '100%',
  2: '50%',
  3: '33.33%',
  4: '25%'
};
var STYLES_CARD_TAB_GROUP = react.css(_templateObject$1(), system.border, system.border);
var STYLES_CARD_TAB_GROUP_TAB = react.css(_templateObject2$1(), system.brand);
var CardTabGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(CardTabGroup, _React$Component);

  var _super = _createSuper(CardTabGroup);

  function CardTabGroup() {
    var _this;

    _classCallCheck(this, CardTabGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_handleChange", function (value) {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: value
        }
      });
    });

    return _this;
  }

  _createClass(CardTabGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React$1.createElement("div", {
        css: STYLES_CARD_TAB_GROUP,
        style: this.props.style
      }, this.props.options.map(function (tab) {
        var selected = tab.value === _this2.props.value;
        return /*#__PURE__*/React$1.createElement("div", {
          css: STYLES_CARD_TAB_GROUP_TAB,
          key: tab.value,
          style: {
            color: selected ? system.brand : null,
            backgroundColor: selected ? system.white : null,
            borderBottom: selected ? "2px solid ".concat(system.brand) : null,
            width: TAB_GROUP_SIZE_MAP[_this2.props.options.length],
            cursor: !selected ? 'pointer' : null
          },
          onClick: function onClick() {
            return _this2._handleChange(tab.value);
          }
        }, tab.label);
      }));
    }
  }]);

  return CardTabGroup;
}(React$1.Component);

var FileImage = function FileImage(props) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    height: props.height,
    style: props.style
  }, /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m21.207 4.5-.00000002-.00000002c.187549.187493.292943.441805.293.707v17.293c0 .552285-.447715 1-1 1h-17-.00000004c-.552285-.00000002-1-.447715-1-1v-21 .00000015c-.00000008-.552285.447715-1 1-1h13.293.00000001c.265195.00005664.519507.105451.707.293z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12.826 12.366-2.8-3.74.00000001.00000002c-.165798-.22083-.479221-.265442-.700051-.0996437-.0578698.0434484-.105619.0989405-.139949.162644l-3.276 6.074.00000001-.00000002c-.130892.24315-.0398879.546371.203262.677262.0727636.0391698.154101.0596942.236738.0597376h4.181"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m17.3284 13.1716c1.5621 1.5621 1.5621 4.09476 0 5.65685-1.5621 1.5621-4.09476 1.5621-5.65685 0-1.5621-1.5621-1.5621-4.09476 0-5.65685 1.5621-1.5621 4.09476-1.5621 5.65685 0"
  })));
};
var Information = function Information(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "m12 0h-.00000052c-6.62742.00000029-12 5.37258-12 12 .00000029 6.62742 5.37258 12 12 12 6.62742-.00000029 12-5.37258 12-12l-.00000013-.00012266c-.00723277-6.62445-5.37568-11.9928-12.0001-11.9999zm0 19h-.00000007c-.828427-.00000004-1.5-.671573-1.5-1.5.00000004-.828427.671573-1.5 1.5-1.5.828427.00000004 1.5.671573 1.5 1.5v-.00000007c0 .828427-.671573 1.5-1.5 1.5zm1.6-6.08h.00000001c-.364588.159119-.600193.519202-.6.917 0 .552285-.447715 1-1 1s-1-.447715-1-1l-.00000003-.00045412c-.00000018-1.19303.706913-2.27268 1.80042-2.74973l.00000001-.00000001c1.01225-.442058 1.47449-1.62101 1.03243-2.63326-.442058-1.01225-1.62101-1.47449-2.63326-1.03243-.728973.318347-1.19999 1.03843-1.19958 1.83388 0 .552285-.447715 1-1 1s-1-.447715-1-1v-.00005995c-.00000033-2.20914 1.79086-4 4-4 2.20914-.00000033 4 1.79086 4 4 .00000024 1.59051-.942318 3.0299-2.40005 3.66609z"
  }));
};
var ChevronDown = function ChevronDown(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, props), /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }));
};
var CheckBox = function CheckBox(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, props), /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }));
};
var CopyAndPaste = function CopyAndPaste(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m9.5 21.5h-8-.00000004c-.552285-.00000002-1-.447715-1-1v-16 .00000015c-.00000008-.552285.447715-1 1-1h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m13.5 3.5h2-.00000004c.552285-.00000002 1 .447715 1 1v3.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9.56066.93834c.585786.585786.585786 1.53553 0 2.12132-.585786.585786-1.53553.585786-2.12132 0-.585786-.585786-.585786-1.53553 0-2.12132.585786-.585786 1.53553-.585786 2.12132 0"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9.915 2.5h2.585-.00000004c.552285-.00000002 1 .447715 1 1v1c0 .552285-.447715 1-1 1h-8-.00000004c-.552285-.00000002-1-.447715-1-1v-1 .00000015c-.00000008-.552285.447715-1 1-1h2.585"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22.5 22.5c0 .552285-.447715 1-1 1h-9-.00000004c-.552285-.00000002-1-.447715-1-1v-11.5.00000015c-.00000008-.552285.447715-1 1-1h7.086.00000001c.265195.00005664.519507.105451.707.293l1.914 1.914-.00000002-.00000002c.187549.187493.292943.441805.293.707z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m14.5 14.5h5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m14.5 17.5h5"
  })));
};
var BandwidthDown = function BandwidthDown(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m20.25 17.25h-.00000013c1.65685-.00000007 3 1.34315 3 3 .00000007 1.65685-1.34315 3-3 3h-16.5-.00000013c-1.65685-.00000007-3-1.34315-3-3 .00000007-1.65685 1.34315-3 3-3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7.5 6.751h-1.356-.00000002c-1.39991-.00004099-2.61375.968129-2.925 2.333l-2.394 10.499"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m23.175 19.583-2.394-10.5.00000014.0000006c-.311246-1.36487-1.52509-2.33304-2.925-2.333h-1.356"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m19.125 19.875h-.00000002c-.207107.00000001-.375.167893-.375.375.00000001.207107.167893.375.375.375.207107-.00000001.375-.167893.375-.375 0-.207107-.167893-.375-.375-.375"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9.75 20.25h-5.25"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 9.75 3 3 3-3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 12.75v-12"
  })));
};
var BandwidthUp = function BandwidthUp(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m20.25 17.25h-.00000013c1.65685-.00000007 3 1.34315 3 3 .00000007 1.65685-1.34315 3-3 3h-16.5-.00000013c-1.65685-.00000007-3-1.34315-3-3 .00000007-1.65685 1.34315-3 3-3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7.5 6.751h-1.356-.00000002c-1.39991-.00004099-2.61375.968129-2.925 2.333l-2.394 10.499"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m23.175 19.583-2.394-10.5.00000014.0000006c-.311246-1.36487-1.52509-2.33304-2.925-2.333h-1.356"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m19.125 19.875h-.00000002c-.207107.00000001-.375.167893-.375.375.00000001.207107.167893.375.375.375.207107-.00000001.375-.167893.375-.375 0-.207107-.167893-.375-.375-.375"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9.75 20.25h-5.25"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m15 3.75-3-3-3 3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 .75v12"
  })));
};
var CheckCircle = function CheckCircle(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.6666 8.5L10.25 14.9167L7.33331 12"
  })));
};
var InfoCircle = function InfoCircle(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12.01",
    y2: "8"
  })));
};
var AlertCircle = function AlertCircle(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  })));
};
var XCircle = function XCircle(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "9",
    x2: "9",
    y2: "15"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "9",
    x2: "15",
    y2: "15"
  })));
};
var X = function X(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })));
};
var Folder = function Folder(props) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    height: props.height,
    style: props.style
  }, /*#__PURE__*/React.createElement("path", {
    d: "m11.236 6h.00000005c-.378666-.0002022-.724736-.214271-.894-.553l-.948-1.894.00000002.00000003c-.169264-.338729-.515334-.552798-.894-.553h-6.5-.00000004c-.552285.00000002-1 .447715-1 1v16 .00000015c.00000008.552285.447715 1 1 1h20-.00000004c.552285.00000002 1-.447715 1-1v-13c0-.552285-.447715-1-1-1z",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};

function _templateObject4$1() {
  var data = _taggedTemplateLiteral(["\n  font-size: 14px;\n  min-width: 10%;\n  width: 100%;\n  line-height: 1.5;\n  padding-top: 2px;\n  overflow-wrap: break-word;\n\n  strong {\n    font-family: 'inter-semi-bold';\n    font-weight: 400;\n  }\n"]);

  _templateObject4$1 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$1() {
  var data = _taggedTemplateLiteral(["\n  opacity: 0;\n  pointer-events: none;\n  visibility: hidden;\n  height: 1px;\n  width: 1px;\n  position: absolute;\n  top: 0;\n  left: 0;\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$2() {
  var data = _taggedTemplateLiteral(["\n  box-shadow: 0 0 0 1px ", ";\n  background-color: ", ";\n  height: 32px;\n  width: 32px;\n  border-radius: 3px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: none;\n  margin-right: 16px;\n  flex-shrink: 0;\n"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_CHECKBOX = react.css(_templateObject$2());
var STYLES_CHECKBOX_FIGURE = react.css(_templateObject2$2(), system.darkGray, system.white);
var STYLES_CHECKBOX_INPUT = react.css(_templateObject3$1());
var STYLES_CHECKBOX_LABEL = react.css(_templateObject4$1());
var CheckBox$1 = /*#__PURE__*/function (_React$Component) {
  _inherits(CheckBox$1, _React$Component);

  var _super = _createSuper(CheckBox$1);

  function CheckBox$1() {
    var _this;

    _classCallCheck(this, CheckBox$1);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_handleChange", function (value) {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: !_this.props.value
        }
      });
    });

    return _this;
  }

  _createClass(CheckBox$1, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React$1.createElement("label", {
        css: STYLES_CHECKBOX,
        style: this.props.style
      }, /*#__PURE__*/React$1.createElement("figure", {
        css: STYLES_CHECKBOX_FIGURE
      }, this.props.value ? /*#__PURE__*/React$1.createElement(CheckBox, {
        height: "20px"
      }) : null), /*#__PURE__*/React$1.createElement("input", {
        css: STYLES_CHECKBOX_INPUT,
        name: this.props.name,
        type: "checkbox",
        checked: this.props.value,
        onChange: function onChange() {
          return _this2._handleChange(_this2.props.value);
        }
      }), /*#__PURE__*/React$1.createElement("span", {
        css: STYLES_CHECKBOX_LABEL
      }, this.props.children));
    }
  }]);

  return CheckBox$1;
}(React$1.Component);

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  font-family: \"mono\";\n  background-color: ", ";\n  color: ", ";\n  border-radius: 4px;\n  padding: 24px;\n  font-size: 12px;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  width: 100%;\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_CODE_BLOCK = react.css(_templateObject$3(), system.black, system.white);
var CodeBlock = function CodeBlock(props) {
  return /*#__PURE__*/React$1.createElement("div", {
    css: STYLES_CODE_BLOCK
  }, /*#__PURE__*/React$1.createElement("code", props));
};

var HIDDEN_TEXTAREA_STYLE = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0"
};
var SIZING_STYLE = ["letter-spacing", "line-height", "font-family", "font-weight", "font-size", "font-style", "tab-size", "text-rendering", "text-transform", "width", "text-indent", "padding-top", "padding-right", "padding-bottom", "padding-left", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "box-sizing"];
var computedStyleCache = {};
var hiddenTextarea = process.browser && document.createElement("textarea");

var forceHiddenStyles = function forceHiddenStyles(node) {
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(function (key) {
    node.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], "important");
  });
};

if (process.browser) {
  hiddenTextarea.setAttribute("tab-index", "-1");
  hiddenTextarea.setAttribute("aria-hidden", "true");
  forceHiddenStyles(hiddenTextarea);
}

function calculateNodeHeight(uiTextNode, uid) {
  var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var minRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var maxRows = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  } // Copy all CSS properties that have an impact on the height of the content in
  // the textbox


  var nodeStyling = calculateNodeStyling(uiTextNode, uid, useCache);

  if (nodeStyling === null) {
    return null;
  }

  var paddingSize = nodeStyling.paddingSize,
      borderSize = nodeStyling.borderSize,
      boxSizing = nodeStyling.boxSizing,
      sizingStyle = nodeStyling.sizingStyle; // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content

  Object.keys(sizingStyle).forEach(function (key) {
    hiddenTextarea.style[key] = sizingStyle[key];
  });
  forceHiddenStyles(hiddenTextarea);
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || "x";
  var minHeight = -Infinity;
  var maxHeight = Infinity;
  var height = hiddenTextarea.scrollHeight;

  if (boxSizing === "border-box") {
    // border-box: add border, since height = content + padding + border
    height = height + borderSize;
  } else if (boxSizing === "content-box") {
    // remove padding, since height = content
    height = height - paddingSize;
  } // measure height of a textarea with a single row


  hiddenTextarea.value = "x";
  var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize; // Stores the value's rows count rendered in `hiddenTextarea`,
  // regardless if `maxRows` or `minRows` props are passed

  var valueRowCount = Math.floor(height / singleRowHeight);

  if (minRows !== null) {
    minHeight = singleRowHeight * minRows;

    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize;
    }

    height = Math.max(minHeight, height);
  }

  if (maxRows !== null) {
    maxHeight = singleRowHeight * maxRows;

    if (boxSizing === "border-box") {
      maxHeight = maxHeight + paddingSize + borderSize;
    }

    height = Math.min(maxHeight, height);
  }

  var rowCount = Math.floor(height / singleRowHeight);
  return {
    height: height,
    minHeight: minHeight,
    maxHeight: maxHeight,
    rowCount: rowCount,
    valueRowCount: valueRowCount
  };
}

function calculateNodeStyling(node, uid) {
  var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (useCache && computedStyleCache[uid]) {
    return computedStyleCache[uid];
  }

  var style = window.getComputedStyle(node);

  if (style === null) {
    return null;
  }

  var sizingStyle = SIZING_STYLE.reduce(function (obj, name) {
    obj[name] = style.getPropertyValue(name);
    return obj;
  }, {});
  var boxSizing = sizingStyle["box-sizing"]; // probably node is detached from DOM, can't read computed dimensions

  if (boxSizing === "") {
    return null;
  }

  var paddingSize = parseFloat(sizingStyle["padding-bottom"]) + parseFloat(sizingStyle["padding-top"]);
  var borderSize = parseFloat(sizingStyle["border-bottom-width"]) + parseFloat(sizingStyle["border-top-width"]);
  var nodeInfo = {
    sizingStyle: sizingStyle,
    paddingSize: paddingSize,
    borderSize: borderSize,
    boxSizing: boxSizing
  };

  if (useCache) {
    computedStyleCache[uid] = nodeInfo;
  }

  return nodeInfo;
}

var purgeCache = function purgeCache(uid) {
  delete computedStyleCache[uid];
};

var noop = function noop() {};

var uid = 0;

var TextareaAutosize = /*#__PURE__*/function (_React$Component) {
  _inherits(TextareaAutosize, _React$Component);

  var _super = _createSuper(TextareaAutosize);

  function TextareaAutosize(props) {
    var _this;

    _classCallCheck(this, TextareaAutosize);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_onRef", function (node) {
      _this._ref = node;
      var inputRef = _this.props.inputRef;

      if (typeof inputRef === "function") {
        inputRef(node);
        return;
      }

      inputRef.current = node;
    });

    _defineProperty(_assertThisInitialized(_this), "_onChange", function (event) {
      if (!_this._controlled) {
        _this._resizeComponent();
      }

      _this.props.onChange(event, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "_resizeComponent", function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

      if (!process.env.BROWSER && !_this._ref) {
        callback();
        return;
      }

      var nodeHeight = calculateNodeHeight(_this._ref, _this._uid, _this.props.useCacheForDOMMeasurements, _this.props.minRows, _this.props.maxRows);

      if (nodeHeight === null) {
        callback();
        return;
      }

      var height = nodeHeight.height,
          minHeight = nodeHeight.minHeight,
          maxHeight = nodeHeight.maxHeight,
          rowCount = nodeHeight.rowCount,
          valueRowCount = nodeHeight.valueRowCount;
      _this.rowCount = rowCount;
      _this.valueRowCount = valueRowCount;

      if (_this.state.height !== height || _this.state.minHeight !== minHeight || _this.state.maxHeight !== maxHeight) {
        _this.setState({
          height: height,
          minHeight: minHeight,
          maxHeight: maxHeight
        }, callback);

        return;
      }

      callback();
    });

    _this.state = {
      height: props.style && props.style.height || 0,
      minHeight: -Infinity,
      maxHeight: Infinity
    };
    _this._uid = uid++;
    _this._controlled = props.value !== undefined;
    _this._resizeLock = false;
    return _this;
  }

  _createClass(TextareaAutosize, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          inputRef = _this$props.inputRef,
          maxRows = _this$props.maxRows,
          minRows = _this$props.minRows,
          onHeightChange = _this$props.onHeightChange,
          useCacheForDOMMeasurements = _this$props.useCacheForDOMMeasurements,
          props = _objectWithoutProperties(_this$props, ["inputRef", "maxRows", "minRows", "onHeightChange", "useCacheForDOMMeasurements"]);

      props.style = _objectSpread2(_objectSpread2({}, props.style), {}, {
        height: this.state.height
      });
      var maxHeight = Math.max(props.style.maxHeight || Infinity, this.state.maxHeight);

      if (maxHeight < this.state.height) {
        props.style.overflow = "hidden";
      }

      return /*#__PURE__*/React$1.createElement("textarea", _extends({}, props, {
        onChange: this._onChange,
        ref: this._onRef
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this._resizeComponent(); // Working around Firefox bug which runs resize listeners even when other JS is running at the same moment
      // causing competing rerenders (due to setState in the listener) in React.
      // More can be found here - facebook/react#6324


      this._resizeListener = function () {
        if (_this2._resizeLock) {
          return;
        }

        _this2._resizeLock = true;

        _this2._resizeComponent(function () {
          _this2._resizeLock = false;
        });
      };

      window.addEventListener("resize", this._resizeListener);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps !== this.props) {
        this._resizeComponent();
      }

      if (this.state.height !== prevState.height) {
        this.props.onHeightChange(this.state.height, this);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this._resizeListener);
      purgeCache(this._uid);
    }
  }]);

  return TextareaAutosize;
}(React$1.Component);

_defineProperty(TextareaAutosize, "defaultProps", {
  inputRef: noop,
  onChange: noop,
  onHeightChange: noop,
  useCacheForDOMMeasurements: false
});

function _templateObject$4() {
  var data = _taggedTemplateLiteral(["\n  font-family: 'mono';\n  display: block;\n  max-width: 480px;\n  border-radius: 4px;\n  width: 100%;\n  background: ", ";\n  min-height: 288px;\n  padding: 24px;\n  color: ", ";\n  resize: none;\n  font-size: 14px;\n  box-sizing: border-box;\n  outline: 0;\n  border: 0;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  scrollbar-width: none;\n  white-space: pre-wrap;\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_CODE_TEXTAREA = react.css(_templateObject$4(), system.pitchBlack, system.white);
var CodeTextarea = /*#__PURE__*/function (_React$Component) {
  _inherits(CodeTextarea, _React$Component);

  var _super = _createSuper(CodeTextarea);

  function CodeTextarea() {
    _classCallCheck(this, CodeTextarea);

    return _super.apply(this, arguments);
  }

  _createClass(CodeTextarea, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React$1.createElement(TextareaAutosize, {
        value: this.props.value,
        name: this.props.name,
        onChange: this.props.onChange,
        css: STYLES_CODE_TEXTAREA
      });
    }
  }]);

  return CodeTextarea;
}(React$1.Component);

var bytesToSize = function bytesToSize(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (bytes === 0) return "0 Bytes";
  var k = 1024;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
var isEmpty = function isEmpty(string) {
  return !string || !string.toString().trim();
};
var pluralize = function pluralize(text, count) {
  return count > 1 || count === 0 ? "".concat(text, "s") : text;
};
var toDate = function toDate(data) {
  var date = new Date(data);
  return "".concat(date.getMonth() + 1, "-").concat(date.getDate(), "-").concat(date.getFullYear());
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends$1 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends$1({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends$1({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends$1({}, attributes, data.attributes);
  data.styles = _extends$1({}, styles, data.styles);
  data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends$1({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends$1({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends$1({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

var reactTippy = createCommonjsModule(function (module, exports) {
(function webpackUniversalModuleDefinition(root, factory) {
	module.exports = factory(React$1__default, Popper, reactDom);
})(commonjsGlobal, function(__WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_38__, __WEBPACK_EXTERNAL_MODULE_39__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Browser = exports.Browser = {};

if (typeof window !== 'undefined') {
  Browser.SUPPORTED = 'requestAnimationFrame' in window;
  Browser.SUPPORTS_TOUCH = 'ontouchstart' in window;
  Browser.touch = false;
  Browser.dynamicInputDetection = true;
  // Chrome device/touch emulation can make this dynamic
  Browser.iOS = function () {
    return (/iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream
    );
  };
}

/**
* The global storage array which holds all data reference objects
* from every instance
* This allows us to hide tooltips from all instances, finding the ref when
* clicking on the body, and for followCursor
*/
var Store = exports.Store = [];

/**
* Selector constants used for grabbing elements
*/
var Selectors = exports.Selectors = {
  POPPER: '.tippy-popper',
  TOOLTIP: '.tippy-tooltip',
  CONTENT: '.tippy-tooltip-content',
  CIRCLE: '[x-circle]',
  ARROW: '[x-arrow]',
  TOOLTIPPED_EL: '[data-tooltipped]',
  CONTROLLER: '[data-tippy-controller]'
};

/**
* The default settings applied to each instance
*/
var Defaults = exports.Defaults = {
  html: false,
  position: 'top',
  animation: 'shift',
  animateFill: true,
  arrow: false,
  arrowSize: 'regular',
  delay: 0,
  trigger: 'mouseenter focus',
  duration: 350,
  interactive: false,
  interactiveBorder: 2,
  theme: 'dark',
  size: 'regular',
  distance: 10,
  offset: 0,
  hideOnClick: true,
  multiple: false,
  followCursor: false,
  inertia: false,
  flipDuration: 350,
  sticky: false,
  stickyDuration: 200,
  appendTo: function appendTo() {
    return document.body;
  },
  zIndex: 9999,
  touchHold: false,
  performance: false,
  dynamicTitle: false,
  useContext: false,
  reactInstance: undefined,
  popperOptions: {},
  open: undefined,
  onRequestClose: function onRequestClose() {}
};

/**
* The keys of the defaults object for reducing down into a new object
* Used in `getIndividualSettings()`
*/
var DefaultsKeys = exports.DefaultsKeys = Browser.SUPPORTED && Object.keys(Defaults);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefix;
/**
* Returns the supported prefixed property - only `webkit` is needed, `moz`, `ms` and `o` are obsolete
* @param {String} property
* @return {String} - browser supported prefixed property
*/
function prefix(property) {
  var prefixes = [false, 'webkit'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var _prefix = prefixes[i];
    var prefixedProp = _prefix ? '' + _prefix + upperProp : property;
    if (typeof window.document.body.style[prefixedProp] !== 'undefined') {
      return prefixedProp;
    }
  }

  return null;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = find;
/**
* Ponyfill for Array.prototype.find
* @param {Array} arr
* @param {Function} checkFn
* @return item in the array
*/
function find(arr, checkFn) {
  if (Array.prototype.find) {
    return arr.find(checkFn);
  }

  // use `filter` as fallback
  return arr.filter(checkFn)[0];
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getCorePlacement;
/**
* Returns the non-shifted placement (e.g., 'bottom-start' => 'bottom')
* @param {String} placement
* @return {String}
*/
function getCorePlacement(placement) {
  return placement.replace(/-.+/, '');
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = closest;

var _matches = __webpack_require__(8);

/**
* Ponyfill to get the closest parent element
* @param {Element} element - child of parent to be returned
* @param {String} parentSelector - selector to match the parent if found
* @return {Element}
*/
function closest(element, parentSelector) {
  var _closest = Element.prototype.closest || function (selector) {
    var el = this;
    while (el) {
      if (_matches.matches.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
  };

  return _closest.call(element, parentSelector);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = defer;
/**
* Waits until next repaint to execute a fn
* @param {Function} fn
*/
function defer(fn) {
  window.requestAnimationFrame(function () {
    setTimeout(fn, 0);
  });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInnerElements;

var _globals = __webpack_require__(0);

/**
* Returns inner elements of the popper element
* @param {Element} popper
* @return {Object}
*/
function getInnerElements(popper) {
  return {
    tooltip: popper.querySelector(_globals.Selectors.TOOLTIP),
    circle: popper.querySelector(_globals.Selectors.CIRCLE),
    content: popper.querySelector(_globals.Selectors.CONTENT)
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isVisible;
/**
* Determines if a popper is currently visible
* @param {Element} popper
* @return {Boolean}
*/
function isVisible(popper) {
  return popper.style.visibility === 'visible';
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
function defaultMatchSelector(s) {
  var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i = matches.length;
  while (--i >= 0 && matches.item(i) !== this) {}
  return i > -1;
}

var matches = exports.matches = typeof window === 'undefined' ? defaultMatchSelector : Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || defaultMatchSelector;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

var _tippy = __webpack_require__(30);

var _tippy2 = _interopRequireDefault(_tippy);

var _globals = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stopPortalEvent = function stopPortalEvent(e) {
  return e.stopPropagation();
};

var defaultProps = {
  html: null,
  position: 'top',
  animation: 'shift',
  animateFill: true,
  arrow: false,
  delay: 0,
  hideDelay: 0,
  trigger: 'mouseenter focus',
  duration: 375,
  hideDuration: 375,
  interactive: false,
  interactiveBorder: 2,
  theme: 'dark',
  offset: 0,
  hideOnClick: true,
  multiple: false,
  followCursor: false,
  inertia: false,
  popperOptions: {},
  onShow: function onShow() {},
  onShown: function onShown() {},
  onHide: function onHide() {},
  onHidden: function onHidden() {},
  disabled: false,
  arrowSize: 'regular',
  size: 'regular',
  className: '',
  style: {},
  distance: 10,
  onRequestClose: function onRequestClose() {},
  sticky: false,
  stickyDuration: 200,
  tag: 'div',
  touchHold: false,
  unmountHTMLWhenHide: false,
  zIndex: 9999
};

var propKeys = Object.keys(defaultProps);

var detectPropsChanged = function detectPropsChanged(props, prevProps) {
  var result = [];
  propKeys.forEach(function (key) {
    if (props[key] !== prevProps[key]) {
      result.push(key);
    }
  });
  return result;
};

var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, props));

    _this.initTippy = _this._initTippy.bind(_this);
    _this.destroyTippy = _this._destroyTippy.bind(_this);
    _this.updateTippy = _this._updateTippy.bind(_this);
    _this.updateReactDom = _this._updateReactDom.bind(_this);
    _this.showTooltip = _this._showTooltip.bind(_this);
    _this.hideTooltip = _this._hideTooltip.bind(_this);
    _this.updateSettings = _this._updateSettings.bind(_this);

    _this.state = {
      reactDOMValue: null
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      this.initTippy();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      this.destroyTippy();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      // enable and disabled
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.props.disabled === false && prevProps.disabled === true) {
        this.updateSettings('disabled', false);
        this.destroyTippy();
        this.initTippy();
        return;
      }

      if (this.props.disabled === true && prevProps.disabled === false) {
        this.updateSettings('disabled', true);
        this.destroyTippy();
        return;
      }

      // open
      if (this.props.open === true && !prevProps.open) {
        this.updateSettings('open', true);
        setTimeout(function () {
          _this2.showTooltip();
        }, 0);
      }
      if (this.props.open === false && prevProps.open === true) {
        this.updateSettings('open', false);
        this.hideTooltip();
      }

      if (this.props.html !== prevProps.html) {
        this.updateReactDom();
      }

      // Update content
      if (this.props.title !== prevProps.title) {
        this.updateTippy();
      }

      // update otherProps
      var propChanges = detectPropsChanged(this.props, prevProps);
      propChanges.forEach(function (key) {
        _this2.updateSettings(key, _this2.props[key]);
      });
    }
  }, {
    key: '_showTooltip',
    value: function _showTooltip() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.show(popper, this.props.duration);
      }
    }
  }, {
    key: '_hideTooltip',
    value: function _hideTooltip() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.hide(popper, this.props.hideDuration);
      }
    }
  }, {
    key: '_updateSettings',
    value: function _updateSettings(name, value) {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.updateSettings(popper, name, value);
      }
    }
  }, {
    key: '_updateReactDom',
    value: function _updateReactDom() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        this.updateSettings('reactDOM', this.props.html);
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        var isVisible = popper.style.visibility === 'visible' || this.props.open;
        if (isVisible) {
          this.tippy.updateForReact(popper, this.props.html);
        }
      }
    }
  }, {
    key: '_updateTippy',
    value: function _updateTippy() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.tippy.update(popper);
      }
    }
  }, {
    key: '_initTippy',
    value: function _initTippy() {
      var _this3 = this;

      if (typeof window === 'undefined' || typeof document === 'undefined' || !_globals.Browser.SUPPORTED) {
        return;
      }
      if (!this.props.disabled) {
        if (this.props.title) {
          this.tooltipDOM.setAttribute('title', this.props.title);
        }

        this.tippy = (0, _tippy2.default)(this.tooltipDOM, {
          disabled: this.props.disabled,
          position: this.props.position,
          animation: this.props.animation,
          animateFill: this.props.animateFill,
          arrow: this.props.arrow,
          arrowSize: this.props.arrowSize,
          delay: this.props.delay,
          hideDelay: this.props.hideDelay,
          trigger: this.props.trigger,
          duration: this.props.duration,
          hideDuration: this.props.hideDuration,
          interactive: this.props.interactive,
          interactiveBorder: this.props.interactiveBorder,
          theme: this.props.theme,
          offset: this.props.offset,
          hideOnClick: this.props.hideOnClick,
          multiple: this.props.multiple,
          size: this.props.size,
          followCursor: this.props.followCursor,
          inertia: this.props.inertia,
          popperOptions: this.props.popperOptions,
          onShow: this.props.onShow,
          onShown: this.props.onShown,
          onHide: this.props.onHide,
          onHidden: this.props.onHidden,
          distance: this.props.distance,
          reactDOM: this.props.html,
          setReactDOMValue: function setReactDOMValue(newReactDOM) {
            return _this3.setState({ reactDOMValue: newReactDOM });
          },
          unmountHTMLWhenHide: this.props.unmountHTMLWhenHide,
          open: this.props.open,
          sticky: this.props.sticky,
          stickyDuration: this.props.stickyDuration,
          tag: this.props.tag,
          touchHold: this.props.touchHold,
          onRequestClose: this.props.onRequestClose,
          useContext: this.props.useContext,
          reactInstance: this.props.useContext ? this : undefined,
          performance: true,
          html: this.props.rawTemplate ? this.props.rawTemplate : undefined,
          zIndex: this.props.zIndex
        });
        if (this.props.open) {
          this.showTooltip();
        }
      } else {
        this.tippy = null;
      }
    }
  }, {
    key: '_destroyTippy',
    value: function _destroyTippy() {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
      }
      if (this.tippy) {
        var popper = this.tippy.getPopperElement(this.tooltipDOM);
        this.updateSettings('open', false);
        this.tippy.hide(popper, 0);
        this.tippy.destroy(popper);
        this.tippy = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var Tag = this.props.tag;


      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          Tag,
          {
            ref: function ref(tooltip) {
              _this4.tooltipDOM = tooltip;
            },
            title: this.props.title,
            className: this.props.className,
            tabIndex: this.props.tabIndex,
            style: _extends({
              display: 'inline'
            }, this.props.style)
          },
          this.props.children
        ),
        this.state.reactDOMValue && _react2.default.createElement(
          'div',
          {
            onClick: stopPortalEvent,
            onContextMenu: stopPortalEvent,
            onDoubleClick: stopPortalEvent,
            onDrag: stopPortalEvent,
            onDragEnd: stopPortalEvent,
            onDragEnter: stopPortalEvent,
            onDragExit: stopPortalEvent,
            onDragLeave: stopPortalEvent,
            onDragOver: stopPortalEvent,
            onDragStart: stopPortalEvent,
            onDrop: stopPortalEvent,
            onMouseDown: stopPortalEvent,
            onMouseEnter: stopPortalEvent,
            onMouseLeave: stopPortalEvent,
            onMouseMove: stopPortalEvent,
            onMouseOver: stopPortalEvent,
            onMouseOut: stopPortalEvent,
            onMouseUp: stopPortalEvent,

            onKeyDown: stopPortalEvent,
            onKeyPress: stopPortalEvent,
            onKeyUp: stopPortalEvent,

            onFocus: stopPortalEvent,
            onBlur: stopPortalEvent,

            onChange: stopPortalEvent,
            onInput: stopPortalEvent,
            onInvalid: stopPortalEvent,
            onSubmit: stopPortalEvent
          },
          this.state.reactDOMValue
        )
      );
    }
  }]);

  return Tooltip;
}(_react.Component);

Tooltip.defaultProps = defaultProps;

exports.default = Tooltip;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = followCursorHandler;

var _globals = __webpack_require__(0);

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _closest = __webpack_require__(4);

var _closest2 = _interopRequireDefault(_closest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Mousemove event listener callback method for follow cursor setting
* @param {MouseEvent} e
*/
function followCursorHandler(e) {
  var _this = this;

  var refData = (0, _find2.default)(_globals.Store, function (refData) {
    return refData.el === _this;
  });
  if (!refData) return;

  var popper = refData.popper,
      offset = refData.settings.offset;


  var position = (0, _getCorePlacement2.default)(popper.getAttribute('x-placement'));
  var halfPopperWidth = Math.round(popper.offsetWidth / 2);
  var halfPopperHeight = Math.round(popper.offsetHeight / 2);
  var viewportPadding = 5;
  var pageWidth = document.documentElement.offsetWidth || document.body.offsetWidth;

  var pageX = e.pageX,
      pageY = e.pageY;


  var x = void 0,
      y = void 0;

  switch (position) {
    case 'top':
      x = pageX - halfPopperWidth + offset;
      y = pageY - 2.25 * halfPopperHeight;
      break;
    case 'left':
      x = pageX - 2 * halfPopperWidth - 10;
      y = pageY - halfPopperHeight + offset;
      break;
    case 'right':
      x = pageX + halfPopperHeight;
      y = pageY - halfPopperHeight + offset;
      break;
    case 'bottom':
      x = pageX - halfPopperWidth + offset;
      y = pageY + halfPopperHeight / 1.5;
      break;
  }

  var isRightOverflowing = pageX + viewportPadding + halfPopperWidth + offset > pageWidth;
  var isLeftOverflowing = pageX - viewportPadding - halfPopperWidth + offset < 0;

  // Prevent left/right overflow
  if (position === 'top' || position === 'bottom') {
    if (isRightOverflowing) {
      x = pageWidth - viewportPadding - 2 * halfPopperWidth;
    }

    if (isLeftOverflowing) {
      x = viewportPadding;
    }
  }

  popper.style[(0, _prefix2.default)('transform')] = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOffsetDistanceInPx;

var _globals = __webpack_require__(0);

/**
* Returns the distance taking into account the default distance due to
* the transform: translate setting in CSS
* @param {Number} distance
* @return {String}
*/
function getOffsetDistanceInPx(distance) {
  return -(distance - _globals.Defaults.distance) + 'px';
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeTitle;
/**
* Removes the title from the tooltipped element, setting `data-original-title`
* appropriately
* @param {Element} el
*/
function removeTitle(el) {
  var title = el.getAttribute('title');

  // Only set `data-original-title` attr if there is a title
  if (title) {
    el.setAttribute('data-original-title', title);
  }

  el.removeAttribute('title');
}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

var _component = __webpack_require__(9);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var withTooltip = function withTooltip(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (_ref) {
    var props = _objectWithoutProperties(_ref, []);

    return _react2.default.createElement(
      _component2.default,
      options,
      _react2.default.createElement(Component, props)
    );
  };
};

exports.default = withTooltip;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTooltip = exports.Tooltip = undefined;

var _component = __webpack_require__(9);

var _component2 = _interopRequireDefault(_component);

var _hoc = __webpack_require__(14);

var _hoc2 = _interopRequireDefault(_hoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Tooltip = _component2.default;
exports.withTooltip = _hoc2.default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bindEventListeners;

var _globals = __webpack_require__(0);

var _hideAllPoppers = __webpack_require__(25);

var _hideAllPoppers2 = _interopRequireDefault(_hideAllPoppers);

var _closest = __webpack_require__(4);

var _closest2 = _interopRequireDefault(_closest);

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

var _matches = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Adds the needed event listeners
*/
function bindEventListeners() {
  var touchHandler = function touchHandler() {
    _globals.Browser.touch = true;

    if (_globals.Browser.iOS()) {
      document.body.classList.add('tippy-touch');
    }

    if (_globals.Browser.dynamicInputDetection && window.performance) {
      document.addEventListener('mousemove', mousemoveHandler);
    }
  };

  var mousemoveHandler = function () {
    var time = void 0;

    return function () {
      var now = performance.now();

      // Chrome 60+ is 1 mousemove per rAF, use 20ms time difference
      if (now - time < 20) {
        _globals.Browser.touch = false;
        document.removeEventListener('mousemove', mousemoveHandler);
        if (!_globals.Browser.iOS()) {
          document.body.classList.remove('tippy-touch');
        }
      }

      time = now;
    };
  }();

  var clickHandler = function clickHandler(event) {
    // Simulated events dispatched on the document
    if (!(event.target instanceof Element)) {
      return (0, _hideAllPoppers2.default)();
    }

    var el = (0, _closest2.default)(event.target, _globals.Selectors.TOOLTIPPED_EL);
    var popper = (0, _closest2.default)(event.target, _globals.Selectors.POPPER);

    if (popper) {
      var ref = (0, _find2.default)(_globals.Store, function (ref) {
        return ref.popper === popper;
      });
      if (!ref) return;

      var interactive = ref.settings.interactive;

      if (interactive) return;
    }

    if (el) {
      var _ref = (0, _find2.default)(_globals.Store, function (ref) {
        return ref.el === el;
      });
      if (!_ref) return;

      var _ref$settings = _ref.settings,
          hideOnClick = _ref$settings.hideOnClick,
          multiple = _ref$settings.multiple,
          trigger = _ref$settings.trigger;

      // Hide all poppers except the one belonging to the element that was clicked IF
      // `multiple` is false AND they are a touch user, OR
      // `multiple` is false AND it's triggered by a click

      if (!multiple && _globals.Browser.touch || !multiple && trigger.indexOf('click') !== -1) {
        return (0, _hideAllPoppers2.default)(_ref);
      }

      // If hideOnClick is not strictly true or triggered by a click don't hide poppers
      if (hideOnClick !== true || trigger.indexOf('click') !== -1) return;
    }

    // Don't trigger a hide for tippy controllers, and don't needlessly run loop
    if ((0, _closest2.default)(event.target, _globals.Selectors.CONTROLLER) || !document.querySelector(_globals.Selectors.POPPER)) return;

    (0, _hideAllPoppers2.default)();
  };

  var blurHandler = function blurHandler(event) {
    var _document = document,
        el = _document.activeElement;

    if (el && el.blur && _matches.matches.call(el, _globals.Selectors.TOOLTIPPED_EL)) {
      el.blur();
    }
  };

  // Hook events
  document.addEventListener('click', clickHandler);
  document.addEventListener('touchstart', touchHandler);
  window.addEventListener('blur', blurHandler);

  if (!_globals.Browser.SUPPORTS_TOUCH && (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)) {
    document.addEventListener('pointerdown', touchHandler);
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPopperElement;

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

var _getOffsetDistanceInPx = __webpack_require__(11);

var _getOffsetDistanceInPx2 = _interopRequireDefault(_getOffsetDistanceInPx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Creates a popper element then returns it
* @param {Number} id - the popper id
* @param {String} title - the tooltip's `title` attribute
* @param {Object} settings - individual settings
* @return {Element} - the popper element
*/
function createPopperElement(id, title, settings) {
  var position = settings.position,
      distance = settings.distance,
      arrow = settings.arrow,
      animateFill = settings.animateFill,
      inertia = settings.inertia,
      animation = settings.animation,
      arrowSize = settings.arrowSize,
      size = settings.size,
      theme = settings.theme,
      html = settings.html,
      zIndex = settings.zIndex,
      interactive = settings.interactive;


  var popper = document.createElement('div');
  popper.setAttribute('class', 'tippy-popper');
  popper.setAttribute('role', 'tooltip');
  popper.setAttribute('aria-hidden', 'true');
  popper.setAttribute('id', 'tippy-tooltip-' + id);
  popper.style.zIndex = zIndex;

  var tooltip = document.createElement('div');
  tooltip.setAttribute('class', 'tippy-tooltip tippy-tooltip--' + size + ' leave');
  tooltip.setAttribute('data-animation', animation);

  theme.split(' ').forEach(function (t) {
    tooltip.classList.add(t + '-theme');
  });

  if (arrow) {
    // Add an arrow
    var _arrow = document.createElement('div');
    _arrow.setAttribute('class', 'arrow-' + arrowSize);
    _arrow.setAttribute('x-arrow', '');
    tooltip.appendChild(_arrow);
  }

  if (animateFill) {
    // Create animateFill circle element for animation
    tooltip.setAttribute('data-animatefill', '');
    var circle = document.createElement('div');
    circle.setAttribute('class', 'leave');
    circle.setAttribute('x-circle', '');
    tooltip.appendChild(circle);
  }

  if (inertia) {
    // Change transition timing function cubic bezier
    tooltip.setAttribute('data-inertia', '');
  }

  if (interactive) {
    tooltip.setAttribute('data-interactive', '');
  }

  // Tooltip content (text or HTML)
  var content = document.createElement('div');
  content.setAttribute('class', 'tippy-tooltip-content');

  if (html) {
    var templateId = void 0;

    if (html instanceof Element) {
      content.appendChild(html);
      templateId = '#' + html.id || 'tippy-html-template';
    } else {
      content.innerHTML = document.getElementById(html.replace('#', '')).innerHTML;
      templateId = html;
    }

    popper.classList.add('html-template');
    interactive && popper.setAttribute('tabindex', '-1');
    tooltip.setAttribute('data-template-id', templateId);
  } else {
    content.innerHTML = title;
  }

  // Init distance. Further updates are made in the popper instance's `onUpdate()` method
  tooltip.style[(0, _getCorePlacement2.default)(position)] = (0, _getOffsetDistanceInPx2.default)(distance);

  tooltip.appendChild(content);
  popper.appendChild(tooltip);

  return popper;
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createPopperInstance;

var _popper = __webpack_require__(38);

var _popper2 = _interopRequireDefault(_popper);

var _defer = __webpack_require__(5);

var _defer2 = _interopRequireDefault(_defer);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

var _getInnerElements2 = __webpack_require__(6);

var _getInnerElements3 = _interopRequireDefault(_getInnerElements2);

var _getOffsetDistanceInPx = __webpack_require__(11);

var _getOffsetDistanceInPx2 = _interopRequireDefault(_getOffsetDistanceInPx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Creates a new popper instance
* @param {Object} data
* @return {Object} - the popper instance
*/
function createPopperInstance(data) {
  var el = data.el,
      popper = data.popper,
      _data$settings = data.settings,
      position = _data$settings.position,
      popperOptions = _data$settings.popperOptions,
      offset = _data$settings.offset,
      distance = _data$settings.distance,
      flipDuration = _data$settings.flipDuration;

  var _getInnerElements = (0, _getInnerElements3.default)(popper),
      tooltip = _getInnerElements.tooltip;

  var config = _extends({
    placement: position
  }, popperOptions || {}, {
    modifiers: _extends({}, popperOptions ? popperOptions.modifiers : {}, {
      flip: _extends({
        padding: distance + 5 /* 5px from viewport boundary */
      }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.flip : {}),
      offset: _extends({
        offset: offset
      }, popperOptions && popperOptions.modifiers ? popperOptions.modifiers.offset : {})
    }),
    onUpdate: function onUpdate() {
      var styles = tooltip.style;
      styles.top = '';
      styles.bottom = '';
      styles.left = '';
      styles.right = '';
      styles[(0, _getCorePlacement2.default)(popper.getAttribute('x-placement'))] = (0, _getOffsetDistanceInPx2.default)(distance);
    }
  });

  // Update the popper's position whenever its content changes
  // Not supported in IE10 unless polyfilled
  if (window.MutationObserver) {
    var styles = popper.style;

    var observer = new MutationObserver(function () {
      styles[(0, _prefix2.default)('transitionDuration')] = '0ms';
      data.popperInstance.update();
      (0, _defer2.default)(function () {
        styles[(0, _prefix2.default)('transitionDuration')] = flipDuration + 'ms';
      });
    });

    observer.observe(popper, {
      childList: true,
      subtree: true,
      characterData: true
    });

    data._mutationObserver = observer;
  }

  return new _popper2.default(el, popper, config);
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTooltips;

var _getIndividualSettings = __webpack_require__(24);

var _getIndividualSettings2 = _interopRequireDefault(_getIndividualSettings);

var _createPopperElement = __webpack_require__(17);

var _createPopperElement2 = _interopRequireDefault(_createPopperElement);

var _createTrigger = __webpack_require__(20);

var _createTrigger2 = _interopRequireDefault(_createTrigger);

var _getEventListenerHandlers = __webpack_require__(23);

var _getEventListenerHandlers2 = _interopRequireDefault(_getEventListenerHandlers);

var _evaluateSettings = __webpack_require__(21);

var _evaluateSettings2 = _interopRequireDefault(_evaluateSettings);

var _removeTitle = __webpack_require__(12);

var _removeTitle2 = _interopRequireDefault(_removeTitle);

var _globals = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var idCounter = 1;

/**
* Creates tooltips for all el elements that match the instance's selector
* @param {Element[]} els
* @return {Object[]} Array of ref data objects
*/
function createTooltips(els) {
  var _this = this;

  return els.reduce(function (a, el) {
    var id = idCounter;

    var settings = (0, _evaluateSettings2.default)(_this.settings.performance ? _this.settings : (0, _getIndividualSettings2.default)(el, _this.settings));

    var html = settings.html,
        reactDOM = settings.reactDOM,
        trigger = settings.trigger,
        touchHold = settings.touchHold;


    var title = el.getAttribute('title');
    if (!title && !html && !reactDOM) return a;

    el.setAttribute('data-tooltipped', '');
    el.setAttribute('aria-describedby', 'tippy-tooltip-' + id);
    (0, _removeTitle2.default)(el);

    var popper = (0, _createPopperElement2.default)(id, title, settings);
    var handlers = _getEventListenerHandlers2.default.call(_this, el, popper, settings);

    var listeners = [];

    trigger.trim().split(' ').forEach(function (event) {
      return listeners = listeners.concat((0, _createTrigger2.default)(event, el, handlers, touchHold));
    });

    a.push({
      id: id,
      el: el,
      popper: popper,
      settings: settings,
      listeners: listeners,
      tippyInstance: _this
    });

    idCounter++;

    return a;
  }, []);
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTrigger;

var _globals = __webpack_require__(0);

/**
* Creates a trigger
* @param {Object} event - the custom event specified in the `trigger` setting
* @param {Element} el - tooltipped element
* @param {Object} handlers - the handlers for each listener
* @param {Boolean} touchHold
* @return {Array} - array of listener objects
*/
function createTrigger(event, el, handlers, touchHold) {
  var listeners = [];

  if (event === 'manual') return listeners;

  // Enter
  el.addEventListener(event, handlers.handleTrigger);
  listeners.push({
    event: event,
    handler: handlers.handleTrigger
  });

  // Leave
  if (event === 'mouseenter') {
    if (_globals.Browser.SUPPORTS_TOUCH && touchHold) {
      el.addEventListener('touchstart', handlers.handleTrigger);
      listeners.push({
        event: 'touchstart',
        handler: handlers.handleTrigger
      });
      el.addEventListener('touchend', handlers.handleMouseleave);
      listeners.push({
        event: 'touchend',
        handler: handlers.handleMouseleave
      });
    }

    el.addEventListener('mouseleave', handlers.handleMouseleave);
    listeners.push({
      event: 'mouseleave',
      handler: handlers.handleMouseleave
    });
  }

  if (event === 'focus') {
    el.addEventListener('blur', handlers.handleBlur);
    listeners.push({
      event: 'blur',
      handler: handlers.handleBlur
    });
  }

  return listeners;
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = evaluateSettings;
/**
* Evaluates/modifies the settings object for appropriate behavior
* @param {Object} settings
* @return {Object} modified/evaluated settings
*/
function evaluateSettings(settings) {
  // animateFill is disabled if an arrow is true
  if (settings.arrow) {
    settings.animateFill = false;
  }

  // reassign appendTo into the result of evaluating appendTo
  // if it's set as a function instead of Element
  if (settings.appendTo && typeof settings.appendTo === 'function') {
    settings.appendTo = settings.appendTo();
  }

  return settings;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getArrayOfElements;
/**
* Returns an array of elements based on the selector input
* @param {String|Element|Element[]} selector
* @return {Element[]}
*/
function getArrayOfElements(selector) {
  if (selector instanceof Element) {
    return [selector];
  }

  if (Array.isArray(selector)) {
    return selector;
  }

  return [].slice.call(document.querySelectorAll(selector));
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getEventListenerHandlers;

var _globals = __webpack_require__(0);

var _isVisible = __webpack_require__(7);

var _isVisible2 = _interopRequireDefault(_isVisible);

var _closest = __webpack_require__(4);

var _closest2 = _interopRequireDefault(_closest);

var _cursorIsOutsideInteractiveBorder = __webpack_require__(32);

var _cursorIsOutsideInteractiveBorder2 = _interopRequireDefault(_cursorIsOutsideInteractiveBorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Returns relevant listener callbacks for each ref
* @param {Element} el
* @param {Element} popper
* @param {Object} settings
* @return {Object} - relevant listener handlers
*/
function getEventListenerHandlers(el, popper, settings) {
  var _this = this;

  var position = settings.position,
      delay = settings.delay,
      duration = settings.duration,
      interactive = settings.interactive,
      interactiveBorder = settings.interactiveBorder,
      distance = settings.distance,
      hideOnClick = settings.hideOnClick,
      trigger = settings.trigger,
      touchHold = settings.touchHold,
      touchWait = settings.touchWait;


  var showDelay = void 0,
      hideDelay = void 0;

  var clearTimeouts = function clearTimeouts() {
    clearTimeout(showDelay);
    clearTimeout(hideDelay);
  };

  var _show = function _show() {
    clearTimeouts();

    // Not hidden. For clicking when it also has a `focus` event listener
    if ((0, _isVisible2.default)(popper)) return;

    var _delay = Array.isArray(delay) ? delay[0] : delay;

    if (delay) {
      showDelay = setTimeout(function () {
        return _this.show(popper);
      }, _delay);
    } else {
      _this.show(popper);
    }
  };

  var show = function show(event) {
    return _this.callbacks.wait ? _this.callbacks.wait.call(popper, _show, event) : _show();
  };

  var hide = function hide() {
    clearTimeouts();

    var _delay = Array.isArray(delay) ? delay[1] : delay;

    if (delay) {
      hideDelay = setTimeout(function () {
        return _this.hide(popper);
      }, _delay);
    } else {
      _this.hide(popper);
    }
  };

  var handleTrigger = function handleTrigger(event) {
    var mouseenterTouch = event.type === 'mouseenter' && _globals.Browser.SUPPORTS_TOUCH && _globals.Browser.touch;

    if (mouseenterTouch && touchHold) return;

    // Toggle show/hide when clicking click-triggered tooltips
    var isClick = event.type === 'click';
    var isNotPersistent = hideOnClick !== 'persistent';

    isClick && (0, _isVisible2.default)(popper) && isNotPersistent ? hide() : show(event);

    if (mouseenterTouch && _globals.Browser.iOS() && el.click) {
      el.click();
    }
  };

  var handleMouseleave = function handleMouseleave(event) {

    // Don't fire 'mouseleave', use the 'touchend'
    if (event.type === 'mouseleave' && _globals.Browser.SUPPORTS_TOUCH && _globals.Browser.touch && touchHold) {
      return;
    }

    if (interactive) {
      // Temporarily handle mousemove to check if the mouse left somewhere
      // other than its popper
      var handleMousemove = function handleMousemove(event) {

        var triggerHide = function triggerHide() {
          document.body.removeEventListener('mouseleave', hide);
          document.removeEventListener('mousemove', handleMousemove);
          hide();
        };

        var closestTooltippedEl = (0, _closest2.default)(event.target, _globals.Selectors.TOOLTIPPED_EL);

        var isOverPopper = (0, _closest2.default)(event.target, _globals.Selectors.POPPER) === popper;
        var isOverEl = closestTooltippedEl === el;
        var isClickTriggered = trigger.indexOf('click') !== -1;
        var isOverOtherTooltippedEl = closestTooltippedEl && closestTooltippedEl !== el;

        if (isOverOtherTooltippedEl) {
          return triggerHide();
        }

        if (isOverPopper || isOverEl || isClickTriggered) return;

        if ((0, _cursorIsOutsideInteractiveBorder2.default)(event, popper, settings)) {
          triggerHide();
        }
      };

      document.body.addEventListener('mouseleave', hide);
      document.addEventListener('mousemove', handleMousemove);

      return;
    }

    // If it's not interactive, just hide it
    hide();
  };

  var handleBlur = function handleBlur(event) {
    // Ignore blur on touch devices, if there is no `relatedTarget`, hide
    // If the related target is a popper, ignore
    if (!event.relatedTarget || _globals.Browser.touch) return;
    if ((0, _closest2.default)(event.relatedTarget, _globals.Selectors.POPPER)) return;

    hide();
  };

  return {
    handleTrigger: handleTrigger,
    handleMouseleave: handleMouseleave,
    handleBlur: handleBlur
  };
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIndividualSettings;

var _globals = __webpack_require__(0);

/**
* Returns an object of settings to override global settings
* @param {Element} el - the tooltipped element
* @param {Object} instanceSettings
* @return {Object} - individual settings
*/
function getIndividualSettings(el, instanceSettings) {
  var settings = _globals.DefaultsKeys.reduce(function (acc, key) {
    var val = el.getAttribute('data-' + key.toLowerCase()) || instanceSettings[key];

    // Convert strings to booleans
    if (val === 'false') val = false;
    if (val === 'true') val = true;

    // Convert number strings to true numbers
    if (isFinite(val) && !isNaN(parseFloat(val))) {
      val = parseFloat(val);
    }

    // Convert array strings to actual arrays
    if (typeof val === 'string' && val.trim().charAt(0) === '[') {
      val = JSON.parse(val);
    }

    acc[key] = val;

    return acc;
  }, {});

  return Object.assign({}, instanceSettings, settings);
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hideAllPoppers;

var _globals = __webpack_require__(0);

/**
* Hides all poppers
* @param {Object} exclude - refData to exclude if needed
*/
function hideAllPoppers(exclude) {
  _globals.Store.forEach(function (refData) {
    var popper = refData.popper,
        tippyInstance = refData.tippyInstance,
        _refData$settings = refData.settings,
        appendTo = _refData$settings.appendTo,
        hideOnClick = _refData$settings.hideOnClick,
        trigger = _refData$settings.trigger;

    // Don't hide already hidden ones

    if (!appendTo.contains(popper)) return;

    // hideOnClick can have the truthy value of 'persistent', so strict check is needed
    var isHideOnClick = hideOnClick === true || trigger.indexOf('focus') !== -1;
    var isNotCurrentRef = !exclude || popper !== exclude.popper;

    if (isHideOnClick && isNotCurrentRef) {
      refData.settings.onRequestClose();
      tippyInstance.hide(popper);
    }
  });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _bindEventListeners = __webpack_require__(16);

var _bindEventListeners2 = _interopRequireDefault(_bindEventListeners);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* To run a single time, once DOM is presumed to be ready
* @return {Boolean} whether the function has run or not
*/
function init() {
  if (init.done) return false;
  init.done = true;

  (0, _bindEventListeners2.default)();

  return true;
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSticky;

var _defer = __webpack_require__(5);

var _defer2 = _interopRequireDefault(_defer);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _isVisible = __webpack_require__(7);

var _isVisible2 = _interopRequireDefault(_isVisible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Updates a popper's position on each animation frame to make it stick to a moving element
* @param {Object} refData
*/
function makeSticky(refData) {
  var popper = refData.popper,
      popperInstance = refData.popperInstance,
      stickyDuration = refData.settings.stickyDuration;


  var applyTransitionDuration = function applyTransitionDuration() {
    return popper.style[(0, _prefix2.default)('transitionDuration')] = stickyDuration + 'ms';
  };

  var removeTransitionDuration = function removeTransitionDuration() {
    return popper.style[(0, _prefix2.default)('transitionDuration')] = '';
  };

  var updatePosition = function updatePosition() {
    popperInstance && popperInstance.scheduleUpdate();

    applyTransitionDuration();

    (0, _isVisible2.default)(popper) ? window.requestAnimationFrame(updatePosition) : removeTransitionDuration();
  };

  // Wait until Popper's position has been updated initially
  (0, _defer2.default)(updatePosition);
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mountPopper;

var _globals = __webpack_require__(0);

var _followCursorHandler = __webpack_require__(10);

var _followCursorHandler2 = _interopRequireDefault(_followCursorHandler);

var _createPopperInstance = __webpack_require__(18);

var _createPopperInstance2 = _interopRequireDefault(_createPopperInstance);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Appends the popper and creates a popper instance if one does not exist
* Also updates its position if need be and enables event listeners
* @param {Object} data -  the element/popper reference data
*/
function mountPopper(data) {
  var el = data.el,
      popper = data.popper,
      _data$settings = data.settings,
      appendTo = _data$settings.appendTo,
      followCursor = _data$settings.followCursor;

  // Already on the DOM

  if (appendTo.contains(popper)) return;

  appendTo.appendChild(popper);

  if (!data.popperInstance) {
    data.popperInstance = (0, _createPopperInstance2.default)(data);
  } else {
    data.popperInstance.update();
    if (!followCursor || _globals.Browser.touch) {
      data.popperInstance.enableEventListeners();
    }
  }

  // Since touch is determined dynamically, followCursor is set on mount
  if (followCursor && !_globals.Browser.touch) {
    el.addEventListener('mousemove', _followCursorHandler2.default);
    data.popperInstance.disableEventListeners();
  }
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = onTransitionEnd;

var _globals = __webpack_require__(0);

var _getInnerElements2 = __webpack_require__(6);

var _getInnerElements3 = _interopRequireDefault(_getInnerElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Prepares the callback functions for `show` and `hide` methods
* @param {Object} data
* @param {Number} duration
* @param {Function} callback - callback function to fire once transitions complete
*/
function onTransitionEnd(data, duration, callback) {
  // Make callback synchronous if duration is 0
  if (!duration) {
    return callback();
  }

  var _getInnerElements = (0, _getInnerElements3.default)(data.popper),
      tooltip = _getInnerElements.tooltip;

  var transitionendFired = false;

  var listenerCallback = function listenerCallback(e) {
    if (e.target === tooltip && !transitionendFired) {
      transitionendFired = true;
      callback();
    }
  };

  // Fire callback upon transition completion
  tooltip.addEventListener('webkitTransitionEnd', listenerCallback);
  tooltip.addEventListener('transitionend', listenerCallback);

  // Fallback: transitionend listener sometimes may not fire
  clearTimeout(data._transitionendTimeout);
  data._transitionendTimeout = setTimeout(function () {
    if (!transitionendFired) {
      callback();
    }
  }, duration);
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

/* Utility functions */


/* Core library functions */


var _globals = __webpack_require__(0);

var _reactDom = __webpack_require__(39);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _init = __webpack_require__(26);

var _init2 = _interopRequireDefault(_init);

var _defer = __webpack_require__(5);

var _defer2 = _interopRequireDefault(_defer);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

var _findIndex = __webpack_require__(34);

var _findIndex2 = _interopRequireDefault(_findIndex);

var _removeTitle = __webpack_require__(12);

var _removeTitle2 = _interopRequireDefault(_removeTitle);

var _elementIsInViewport = __webpack_require__(33);

var _elementIsInViewport2 = _interopRequireDefault(_elementIsInViewport);

var _triggerReflow = __webpack_require__(37);

var _triggerReflow2 = _interopRequireDefault(_triggerReflow);

var _modifyClassList = __webpack_require__(35);

var _modifyClassList2 = _interopRequireDefault(_modifyClassList);

var _getInnerElements4 = __webpack_require__(6);

var _getInnerElements5 = _interopRequireDefault(_getInnerElements4);

var _applyTransitionDuration = __webpack_require__(31);

var _applyTransitionDuration2 = _interopRequireDefault(_applyTransitionDuration);

var _isVisible = __webpack_require__(7);

var _isVisible2 = _interopRequireDefault(_isVisible);

var _noop = __webpack_require__(36);

var _noop2 = _interopRequireDefault(_noop);

var _followCursorHandler = __webpack_require__(10);

var _followCursorHandler2 = _interopRequireDefault(_followCursorHandler);

var _getArrayOfElements = __webpack_require__(22);

var _getArrayOfElements2 = _interopRequireDefault(_getArrayOfElements);

var _onTransitionEnd = __webpack_require__(29);

var _onTransitionEnd2 = _interopRequireDefault(_onTransitionEnd);

var _mountPopper = __webpack_require__(28);

var _mountPopper2 = _interopRequireDefault(_mountPopper);

var _makeSticky = __webpack_require__(27);

var _makeSticky2 = _interopRequireDefault(_makeSticky);

var _createTooltips = __webpack_require__(19);

var _createTooltips2 = _interopRequireDefault(_createTooltips);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* @param {String|Element|Element[]} selector
* @param {Object} settings (optional) - the object of settings to be applied to the instance
*/
var Tippy = function () {
  function Tippy(selector) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Tippy);

    // Use default browser tooltip on unsupported browsers
    if (!_globals.Browser.SUPPORTED) return;

    (0, _init2.default)();

    this.state = {
      destroyed: false
    };

    this.selector = selector;

    this.settings = _extends({}, _globals.Defaults, settings);

    if (settings.show || settings.shown || settings.hide || settings.hidden) {
      console.warn('Callbacks without the `on` prefix are deprecated (with the exception of `wait`).' + ' Use onShow, onShown, onHide, and onHidden instead.');
    }

    this.callbacks = {
      wait: settings.wait,
      show: settings.onShow || settings.show || _noop2.default,
      shown: settings.onShown || settings.shown || _noop2.default,
      hide: settings.onHide || settings.hide || _noop2.default,
      hidden: settings.onHidden || settings.hidden || _noop2.default
    };

    this.store = _createTooltips2.default.call(this, (0, _getArrayOfElements2.default)(selector));
    _globals.Store.push.apply(_globals.Store, this.store);
  }

  /**
  * Returns the reference element's popper element
  * @param {Element} el
  * @return {Element}
  */


  _createClass(Tippy, [{
    key: 'getPopperElement',
    value: function getPopperElement(el) {
      try {
        return (0, _find2.default)(this.store, function (data) {
          return data.el === el;
        }).popper;
      } catch (e) {
        console.error('[getPopperElement]: Element passed as the argument does not exist in the instance');
      }
    }

    /**
    * Returns a popper's reference element
    * @param {Element} popper
    * @return {Element}
    */

  }, {
    key: 'getReferenceElement',
    value: function getReferenceElement(popper) {
      try {
        return (0, _find2.default)(this.store, function (data) {
          return data.popper === popper;
        }).el;
      } catch (e) {
        console.error('[getReferenceElement]: Popper passed as the argument does not exist in the instance');
      }
    }

    /**
    * Returns the reference data object from either the reference element or popper element
    * @param {Element} x (reference element or popper)
    * @return {Object}
    */

  }, {
    key: 'getReferenceData',
    value: function getReferenceData(x) {
      return (0, _find2.default)(this.store, function (data) {
        return data.el === x || data.popper === x;
      });
    }

    /**
    * Update settings
    * @param {DOMElement} - popper
    * @param {string} - name
    * @param {string} - value
    */

  }, {
    key: 'updateSettings',
    value: function updateSettings(popper, name, value) {
      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var newSettings = _extends({}, data.settings, _defineProperty({}, name, value));
      data.settings = newSettings;
    }
  }, {
    key: 'updateForReact',


    /**
    * Update for React
    * @param {DOMElement} - popper
    * @param {ReactElement} - content
    */
    value: function updateForReact(popper, updatedContent) {
      var tooltipContent = popper.querySelector(_globals.Selectors.CONTENT);
      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var _data$settings = data.settings,
          useContext = _data$settings.useContext,
          setReactDOMValue = _data$settings.setReactDOMValue;


      if (useContext) {
        setReactDOMValue(_reactDom2.default.createPortal(updatedContent, tooltipContent));
      } else {
        _reactDom2.default.render(updatedContent, tooltipContent);
      }
    }
    /**
    * Shows a popper
    * @param {Element} popper
    * @param {Number} customDuration (optional)
    */

  }, {
    key: 'show',
    value: function show(popper, customDuration) {
      var _this = this;

      if (this.state.destroyed) return;

      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var _getInnerElements = (0, _getInnerElements5.default)(popper),
          tooltip = _getInnerElements.tooltip,
          circle = _getInnerElements.circle,
          content = _getInnerElements.content;

      if (!document.body.contains(data.el)) {
        this.destroy(popper);
        return;
      }

      this.callbacks.show.call(popper);

      // Custom react
      if (data.settings && data.settings.open === false) {
        return;
      }

      if (data.settings.reactDOM) {
        this.updateForReact(popper, data.settings.reactDOM);
      }
      // end: Custom react

      var el = data.el,
          _data$settings2 = data.settings,
          appendTo = _data$settings2.appendTo,
          sticky = _data$settings2.sticky,
          interactive = _data$settings2.interactive,
          followCursor = _data$settings2.followCursor,
          flipDuration = _data$settings2.flipDuration,
          duration = _data$settings2.duration,
          dynamicTitle = _data$settings2.dynamicTitle;


      if (dynamicTitle) {
        var title = el.getAttribute('title');
        if (title) {
          content.innerHTML = title;
          (0, _removeTitle2.default)(el);
        }
      }

      var _duration = customDuration !== undefined ? customDuration : Array.isArray(duration) ? duration[0] : duration;

      // Prevent a transition when popper changes position
      (0, _applyTransitionDuration2.default)([popper, tooltip, circle], 0);

      (0, _mountPopper2.default)(data);

      popper.style.visibility = 'visible';
      popper.setAttribute('aria-hidden', 'false');

      // Wait for popper's position to update
      (0, _defer2.default)(function () {
        // Sometimes the arrow will not be in the correct position, force another update
        if (!followCursor || _globals.Browser.touch) {
          data.popperInstance.update();
          (0, _applyTransitionDuration2.default)([popper], flipDuration);
        }

        // Re-apply transition durations
        (0, _applyTransitionDuration2.default)([tooltip, circle], _duration);

        // Make content fade out a bit faster than the tooltip if `animateFill`
        if (circle) content.style.opacity = 1;

        // Interactive tooltips receive a class of 'active'
        interactive && el.classList.add('active');

        // Update popper's position on every animation frame
        sticky && (0, _makeSticky2.default)(data);

        // Repaint/reflow is required for CSS transition when appending
        (0, _triggerReflow2.default)(tooltip, circle);

        (0, _modifyClassList2.default)([tooltip, circle], function (list) {
          list.contains('tippy-notransition') && list.remove('tippy-notransition');
          list.remove('leave');
          list.add('enter');
        });

        // Wait for transitions to complete
        (0, _onTransitionEnd2.default)(data, _duration, function () {
          if (!(0, _isVisible2.default)(popper) || data._onShownFired) return;

          // Focus interactive tooltips only
          interactive && popper.focus();
          // Remove transitions from tooltip
          tooltip.classList.add('tippy-notransition');
          // Prevents shown() from firing more than once from early transition cancellations
          data._onShownFired = true;

          _this.callbacks.shown.call(popper);
        });
      });
    }

    /**
    * Hides a popper
    * @param {Element} popper
    * @param {Number} customDuration (optional)
    */

  }, {
    key: 'hide',
    value: function hide(popper, customDuration) {
      var _this2 = this;

      if (this.state.destroyed) return;

      this.callbacks.hide.call(popper);

      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var _getInnerElements2 = (0, _getInnerElements5.default)(popper),
          tooltip = _getInnerElements2.tooltip,
          circle = _getInnerElements2.circle,
          content = _getInnerElements2.content;

      // custom react
      // Prevent hide if open


      if (data.settings.disabled === false && data && data.settings.open) {
        return;
      }

      var isUnmount = data && data.settings && data.settings.unmountHTMLWhenHide && data.settings.reactDOM;
      // end: custom react

      var el = data.el,
          _data$settings3 = data.settings,
          appendTo = _data$settings3.appendTo,
          sticky = _data$settings3.sticky,
          interactive = _data$settings3.interactive,
          followCursor = _data$settings3.followCursor,
          html = _data$settings3.html,
          trigger = _data$settings3.trigger,
          duration = _data$settings3.duration;


      var _duration = customDuration !== undefined ? customDuration : Array.isArray(duration) ? duration[1] : duration;

      data._onShownFired = false;
      interactive && el.classList.remove('active');

      popper.style.visibility = 'hidden';
      popper.setAttribute('aria-hidden', 'true');

      (0, _applyTransitionDuration2.default)([tooltip, circle, circle ? content : null], _duration);

      if (circle) content.style.opacity = 0;

      (0, _modifyClassList2.default)([tooltip, circle], function (list) {
        list.contains('tippy-tooltip') && list.remove('tippy-notransition');
        list.remove('enter');
        list.add('leave');
      });

      // Re-focus click-triggered html elements
      // and the tooltipped element IS in the viewport (otherwise it causes unsightly scrolling
      // if the tooltip is closed and the element isn't in the viewport anymore)
      if (html && trigger.indexOf('click') !== -1 && (0, _elementIsInViewport2.default)(el)) {
        el.focus();
      }

      // Wait for transitions to complete
      (0, _onTransitionEnd2.default)(data, _duration, function () {
        // `isVisible` is not completely reliable to determine if we shouldn't
        // run the hidden callback, we need to check the computed opacity style.
        // This prevents glitchy behavior of the transition when quickly showing
        // and hiding a tooltip.
        if ((0, _isVisible2.default)(popper) || !appendTo.contains(popper) || getComputedStyle(tooltip).opacity === '1') return;

        el.removeEventListener('mousemove', _followCursorHandler2.default);
        data.popperInstance.disableEventListeners();
        appendTo.removeChild(popper);

        _this2.callbacks.hidden.call(popper);

        // custom react
        if (isUnmount) {
          _reactDom2.default.unmountComponentAtNode(content);
        }
      });
    }

    /**
    * Updates a popper with new content
    * @param {Element} popper
    */

  }, {
    key: 'update',
    value: function update(popper) {
      if (this.state.destroyed) return;

      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var _getInnerElements3 = (0, _getInnerElements5.default)(popper),
          content = _getInnerElements3.content;

      var el = data.el,
          html = data.settings.html;


      if (html instanceof Element) {
        console.warn('Aborted: update() should not be used if `html` is a DOM element');
        return;
      }

      content.innerHTML = html ? document.getElementById(html.replace('#', '')).innerHTML : el.getAttribute('title') || el.getAttribute('data-original-title');

      if (!html) (0, _removeTitle2.default)(el);
    }

    /**
    * Destroys a popper
    * @param {Element} popper
    * @param {Boolean} _isLast - private param used by destroyAll to optimize
    */

  }, {
    key: 'destroy',
    value: function destroy(popper, _isLast) {
      var _this3 = this;

      if (this.state.destroyed) return;

      var data = (0, _find2.default)(this.store, function (data) {
        return data.popper === popper;
      });
      if (!data) return;

      var el = data.el,
          popperInstance = data.popperInstance,
          listeners = data.listeners,
          _mutationObserver = data._mutationObserver;

      // Ensure the popper is hidden

      if ((0, _isVisible2.default)(popper)) {
        this.hide(popper, 0);
      }

      // Remove Tippy-only event listeners from tooltipped element
      listeners.forEach(function (listener) {
        return el.removeEventListener(listener.event, listener.handler);
      });

      // Restore original title
      el.setAttribute('title', el.getAttribute('data-original-title'));

      el.removeAttribute('data-original-title');
      el.removeAttribute('data-tooltipped');
      el.removeAttribute('aria-describedby');

      popperInstance && popperInstance.destroy();
      _mutationObserver && _mutationObserver.disconnect();

      // Remove from store
      _globals.Store.splice((0, _findIndex2.default)(_globals.Store, function (data) {
        return data.popper === popper;
      }), 1);

      // Ensure filter is called only once
      if (_isLast === undefined || _isLast) {
        this.store = _globals.Store.filter(function (data) {
          return data.tippyInstance === _this3;
        });
      }
    }

    /**
    * Destroys all tooltips created by the instance
    */

  }, {
    key: 'destroyAll',
    value: function destroyAll() {
      var _this4 = this;

      if (this.state.destroyed) return;

      var storeLength = this.store.length;

      this.store.forEach(function (_ref, index) {
        var popper = _ref.popper;

        _this4.destroy(popper, index === storeLength - 1);
      });

      this.store = null;
      this.state.destroyed = true;
    }
  }]);

  return Tippy;
}();

function tippy(selector, settings) {
  return new Tippy(selector, settings);
}

tippy.Browser = _globals.Browser;
tippy.Defaults = _globals.Defaults;
tippy.disableDynamicInputDetection = function () {
  return _globals.Browser.dynamicInputDetection = false;
};
tippy.enableDynamicInputDetection = function () {
  return _globals.Browser.dynamicInputDetection = true;
};

exports.default = tippy;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyTransitionDuration;

var _globals = __webpack_require__(0);

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

var _matches = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Applies the transition duration to each element
* @param {Element[]} els - Array of elements
* @param {Number} duration
*/
function applyTransitionDuration(els, duration) {
  els.forEach(function (el) {
    if (!el) return;

    var isContent = _matches.matches.call(el, _globals.Selectors.CONTENT);

    var _duration = isContent ? Math.round(duration / 1.3) : duration;

    el.style[(0, _prefix2.default)('transitionDuration')] = _duration + 'ms';
  });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursorIsOutsideInteractiveBorder;

var _getCorePlacement = __webpack_require__(3);

var _getCorePlacement2 = _interopRequireDefault(_getCorePlacement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Determines if the mouse's cursor is outside the interactive border
* @param {MouseEvent} event
* @param {Element} popper
* @param {Object} settings
* @return {Boolean}
*/
function cursorIsOutsideInteractiveBorder(event, popper, settings) {
  if (!popper.getAttribute('x-placement')) return true;

  var x = event.clientX,
      y = event.clientY;
  var interactiveBorder = settings.interactiveBorder,
      distance = settings.distance;


  var rect = popper.getBoundingClientRect();
  var corePosition = (0, _getCorePlacement2.default)(popper.getAttribute('x-placement'));
  var borderWithDistance = interactiveBorder + distance;

  var exceeds = {
    top: rect.top - y > interactiveBorder,
    bottom: y - rect.bottom > interactiveBorder,
    left: rect.left - x > interactiveBorder,
    right: x - rect.right > interactiveBorder
  };

  switch (corePosition) {
    case 'top':
      exceeds.top = rect.top - y > borderWithDistance;
      break;
    case 'bottom':
      exceeds.bottom = y - rect.bottom > borderWithDistance;
      break;
    case 'left':
      exceeds.left = rect.left - x > borderWithDistance;
      break;
    case 'right':
      exceeds.right = x - rect.right > borderWithDistance;
      break;
  }

  return exceeds.top || exceeds.bottom || exceeds.left || exceeds.right;
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = elementIsInViewport;
/**
* Determines if an element is visible in the viewport
* @param {Element} el
* @return {Boolean}
*/
function elementIsInViewport(el) {
  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findIndex;

var _find = __webpack_require__(2);

var _find2 = _interopRequireDefault(_find);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Ponyfill for Array.prototype.findIndex
* @param {Array} arr
* @param {Function} checkFn
* @return index of the item in the array
*/
function findIndex(arr, checkFn) {
  if (Array.prototype.findIndex) {
    return arr.findIndex(checkFn);
  }

  // fallback
  return arr.indexOf((0, _find2.default)(arr, checkFn));
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = modifyClassList;
/**
* Modifies elements' class lists
* @param {Element[]} els - Array of elements
* @param {Function} callback
*/
function modifyClassList(els, callback) {
  els.forEach(function (el) {
    if (!el) return;
    callback(el.classList);
  });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = noop;
function noop() {}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = triggerReflow;

var _prefix = __webpack_require__(1);

var _prefix2 = _interopRequireDefault(_prefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Triggers a document repaint or reflow for CSS transition
* @param {Element} tooltip
* @param {Element} circle
*/
function triggerReflow(tooltip, circle) {
  // Safari needs the specific 'transform' property to be accessed
  circle ? window.getComputedStyle(circle)[(0, _prefix2.default)('transform')] : window.getComputedStyle(tooltip).opacity;
}

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_38__;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_39__;

/***/ })
/******/ ]);
});

});

unwrapExports(reactTippy);
var reactTippy_1 = reactTippy.Tooltip;

function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  height: 32px;\n  width: 32px;\n  cursor: pointer;\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_TOOLTIP_ANCHOR = react.css(_templateObject$5());
var TooltipAnchor = /*#__PURE__*/function (_React$Component) {
  _inherits(TooltipAnchor, _React$Component);

  var _super = _createSuper(TooltipAnchor);

  function TooltipAnchor() {
    _classCallCheck(this, TooltipAnchor);

    return _super.apply(this, arguments);
  }

  _createClass(TooltipAnchor, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React$1.createElement(reactTippy_1, {
        animation: "fade",
        animateFill: false,
        title: this.props.tooltip
      }, /*#__PURE__*/React$1.createElement("span", {
        css: STYLES_TOOLTIP_ANCHOR,
        style: this.props.style
      }, this.props.children ? this.props.children : /*#__PURE__*/React$1.createElement(Information, {
        height: this.props.height ? this.props.height : '24px'
      })));
    }
  }]);

  return TooltipAnchor;
}(React$1.Component);

function _templateObject2$3() {
  var data = _taggedTemplateLiteral(["\n  font-size: 14px;\n  margin-bottom: 12px;\n  line-height: 1.3;\n"]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$6() {
  var data = _taggedTemplateLiteral(["\n  font-family: 'inter-semi-bold';\n  font-size: 14px;\n  padding: 0 0 0 0;\n  margin-bottom: 8px;\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_DESCRIPTION_GROUP_LABEL = react.css(_templateObject$6());
var STYLES_DESCRIPTION_GROUP_DESCRIPTION = react.css(_templateObject2$3());
var DescriptionGroup = function DescriptionGroup(props) {
  return /*#__PURE__*/React$1.createElement("div", {
    style: props.style
  }, !isEmpty(props.label) ? /*#__PURE__*/React$1.createElement("div", {
    css: STYLES_DESCRIPTION_GROUP_LABEL
  }, props.label, ' ', props.tooltip ? /*#__PURE__*/React$1.createElement(TooltipAnchor, {
    tooltip: props.tooltip,
    height: "14px",
    style: {
      paddingTop: 16
    }
  }) : null) : null, !isEmpty(props.description) ? /*#__PURE__*/React$1.createElement("div", {
    css: STYLES_DESCRIPTION_GROUP_DESCRIPTION
  }, props.description) : null);
};

function _templateObject3$2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 12px;\n  margin-top: 1px;\n  bottom: 12px;\n  transition: 200ms ease all;\n  cursor: pointer;\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject3$2 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$4() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  padding: 0 24px 0 24px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15), inset 0 0 0 1px ", ";\n\n  :focus {\n    outline: 0;\n    border: 0;\n    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07), inset 0 0 0 2px ", ";\n  }\n\n  ::placeholder {\n    /* Chrome, Firefox, Opera, Safari 10.1+ */\n    color: ", ";\n    opacity: 1; /* Firefox */\n  }\n\n  :-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    color: ", ";\n  }\n\n  ::-ms-input-placeholder {\n    /* Microsoft Edge */\n    color: ", ";\n  }\n"]);

  _templateObject2$4 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$7() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  max-width: 480px;\n  min-width: 188px;\n"]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var INPUT_STYLES = "\n  -webkit-appearance: none;\n  width: 100%;\n  height: 40px;\n  background: ".concat(system.white, ";\n  color: ").concat(system.black, ";\n  border-radius: 4px;\n  display: flex;\n  font-size: 14px;\n  align-items: center;\n  justify-content: flex-start;\n  outline: 0;\n  border: 0;\n  box-sizing: border-box;\n  transition: 200ms ease all;\n");
var STYLES_INPUT_CONTAINER = react.css(_templateObject$7());
var STYLES_INPUT = react.css(_templateObject2$4(), INPUT_STYLES, system.darkGray, system.brand, system.darkGray, system.darkGray, system.darkGray);
var STYLES_COPY_AND_PASTE = react.css(_templateObject3$2(), system.brand);
var INPUT_COLOR_MAP = {
  SUCCESS: system.green,
  ERROR: system.red,
  WARNING: system.yellow
};
var Input = /*#__PURE__*/function (_React$Component) {
  _inherits(Input, _React$Component);

  var _super = _createSuper(Input);

  function Input() {
    var _this;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_input", void 0);

    _defineProperty(_assertThisInitialized(_this), "_handleCopy", function (e) {
      _this._input.select();

      document.execCommand('copy');
    });

    _defineProperty(_assertThisInitialized(_this), "_handleKeyUp", function (e) {
      if (e.which === 13 && _this.props.onSubmit) {
        _this.props.onSubmit(e);

        return;
      }

      _this.props.onKeyUp(e);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleChange", function (e) {
      if (!isEmpty(_this.props.pattern) && !isEmpty(e.target.value)) {
        var TestRegex = new RegExp(_this.props.pattern);

        if (!TestRegex.test(e.target.value)) {
          e.preventDefault();
          return;
        }
      }

      if (e.target.value && e.target.value.length > _this.props.max) {
        e.preventDefault();
        return;
      }

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    });

    return _this;
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      var _this2 = this,
          _React$createElement;

      return /*#__PURE__*/React$1.createElement("div", {
        css: STYLES_INPUT_CONTAINER,
        style: this.props.containerStyle
      }, /*#__PURE__*/React$1.createElement(DescriptionGroup, {
        tooltip: this.props.tooltip,
        label: this.props.label,
        description: this.props.description
      }), /*#__PURE__*/React$1.createElement("input", (_React$createElement = {
        ref: function ref(c) {
          _this2._input = c;
        },
        css: STYLES_INPUT,
        value: this.props.value,
        name: this.props.name,
        type: this.props.type,
        placeholder: this.props.placeholder,
        onChange: this._handleChange,
        autoComplete: "off",
        readOnly: this.props.readOnly
      }, _defineProperty(_React$createElement, "type", this.props.type), _defineProperty(_React$createElement, "style", _objectSpread2(_objectSpread2({}, this.props.style), {}, {
        boxShadow: this.props.validation ? "0 1px 4px rgba(0, 0, 0, 0.07), 0 0 4px ".concat(INPUT_COLOR_MAP[this.props.validation]) : null
      })), _React$createElement)), this.props.copyable ? /*#__PURE__*/React$1.createElement(CopyAndPaste, {
        height: "16px",
        css: STYLES_COPY_AND_PASTE,
        onClick: this._handleCopy
      }) : null);
    }
  }]);

  return Input;
}(React$1.Component);

function _templateObject3$3() {
  var data = _taggedTemplateLiteral(["\n  height: 18px;\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  cursor: pointer;\n"]);

  _templateObject3$3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$5() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  bottom: 2px;\n  margin-bottom: 8px;\n"]);

  _templateObject2$5 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$8() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 5px;\n  padding: 15px 15px 3px 15px;\n  display: grid;\n  grid-template-columns: 35px 1fr;\n  position: relative;\n  width: 500px;\n"]);

  _templateObject$8 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_NOTIFICATION = react.css(_templateObject$8(), system.white);
var STYLES_ICON = react.css(_templateObject2$5());
var STYLES_CLOSE = react.css(_templateObject3$3());
var NOTIF_COLOR_MAP = {
  SUCCESS: system.lightGreen,
  ERROR: system.lightRed,
  WARNING: system.lightYellow,
  INFO: system.lightBlue
};
var ICON_MAP = {
  SUCCESS: /*#__PURE__*/React$1.createElement(CheckCircle, {
    css: STYLES_ICON,
    height: "24px",
    style: {
      color: "".concat(system.green)
    }
  }),
  ERROR: /*#__PURE__*/React$1.createElement(XCircle, {
    css: STYLES_ICON,
    height: "24px",
    style: {
      color: "".concat(system.red)
    }
  }),
  WARNING: /*#__PURE__*/React$1.createElement(AlertCircle, {
    css: STYLES_ICON,
    height: "24px",
    style: {
      color: "".concat(system.yellow)
    }
  }),
  INFO: /*#__PURE__*/React$1.createElement(InfoCircle, {
    css: STYLES_ICON,
    height: "24px",
    style: {
      color: "".concat(system.lightBlue)
    }
  })
};
var Notification = /*#__PURE__*/function (_React$Component) {
  _inherits(Notification, _React$Component);

  var _super = _createSuper(Notification);

  function Notification() {
    _classCallCheck(this, Notification);

    return _super.apply(this, arguments);
  }

  _createClass(Notification, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React$1.createElement("div", {
        css: STYLES_NOTIFICATION,
        style: {
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.07), 0 0 4px 1px ".concat(NOTIF_COLOR_MAP[this.props.status || 'INFO'])
        }
      }, ICON_MAP[this.props.status || 'INFO'], /*#__PURE__*/React$1.createElement(DescriptionGroup, {
        tooltip: this.props.tooltip,
        label: this.props.label,
        description: this.props.description,
        style: {
          marginBottom: '0'
        }
      }), this.props.onClose ? /*#__PURE__*/React$1.createElement(X, {
        css: STYLES_CLOSE,
        onClick: this.props.onClose
      }) : /*#__PURE__*/React$1.createElement("div", null));
    }
  }]);

  return Notification;
}(React$1.Component);

function _templateObject2$6() {
  var data = _taggedTemplateLiteral(["\n  top: 0;\n  left: 0;\n  padding: 8px 24px 8px 24px;\n  margin: 8px 0 8px 0;\n  display: flex;\n  align-items: center;\n  height: 40px;\n  font-size: ", ";\n  transition: 200ms ease all;\n  cursor: pointer;\n\n  :hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"]);

  _templateObject2$6 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$9() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  width: 288px;\n  border-radius: 4px;\n  background-color: ", ";\n  box-shadow: inset 0 0 0 1px ", ", 0 1px 4px rgba(0, 0, 0, 0.07);\n"]);

  _templateObject$9 = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_POPOVER = react.css(_templateObject$9(), system.white, system.border);
var STYLES_POPOVER_ITEM = react.css(_templateObject2$6(), typescale.lvl1, system.brand, system.white);
var PopoverNavigation = /*#__PURE__*/function (_React$Component) {
  _inherits(PopoverNavigation, _React$Component);

  var _super = _createSuper(PopoverNavigation);

  function PopoverNavigation() {
    _classCallCheck(this, PopoverNavigation);

    return _super.apply(this, arguments);
  }

  _createClass(PopoverNavigation, [{
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/React$1.createElement("div", {
        css: STYLES_POPOVER,
        style: this.props.style
      }, this.props.navigation.map(function (each) {
        return /*#__PURE__*/React$1.createElement("div", {
          key: each.value,
          css: STYLES_POPOVER_ITEM,
          onClick: function onClick() {
            return _this.props.onNavigateTo({
              id: each.value
            });
          }
        }, each.text);
      }));
    }
  }]);

  return PopoverNavigation;
}(React$1.Component);

_defineProperty(PopoverNavigation, "defaultProps", {
  onNavigateTo: function onNavigateTo() {
    console.error('requires onNavigateTo');
  }
});

function _templateObject6$1() {
  var data = _taggedTemplateLiteral(["\n  font-size: 14px;\n  cursor: pointer;\n  min-width: 10%;\n  width: 100%;\n  line-height: 1.5;\n  padding-top: 4px;\n  overflow-wrap: break-word;\n\n  strong {\n    font-family: 'inter-semi-bold';\n    font-weight: 400;\n  }\n"]);

  _templateObject6$1 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$1() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  height: 24px;\n  width: 24px;\n  border-radius: 24px;\n  pointer-events: none;\n  opacity: 0;\n  transition: 200ms ease opacity;\n  z-index: 1;\n"]);

  _templateObject5$1 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$2() {
  var data = _taggedTemplateLiteral(["\n  box-shadow: 0 0 0 1px ", ";\n  background-color: ", ";\n  cursor: pointer;\n  height: 32px;\n  width: 32px;\n  border-radius: 32px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: none;\n  margin-right: 16px;\n  flex-shrink: 0;\n"]);

  _templateObject4$2 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$4() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  width: 100%;\n"]);

  _templateObject3$4 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$7() {
  var data = _taggedTemplateLiteral(["\n  opacity: 0;\n  pointer-events: none;\n  visibility: hidden;\n  height: 1px;\n  width: 1px;\n  position: absolute;\n  top: 0;\n  left: 0;\n"]);

  _templateObject2$7 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$a() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  width: 100%;\n  position: relative;\n  margin-bottom: 16px;\n"]);

  _templateObject$a = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_RADIO = react.css(_templateObject$a());
var STYLES_RADIO_INPUT = react.css(_templateObject2$7());
var STYLES_RADIO_GROUP = react.css(_templateObject3$4());
var STYLES_RADIO_CUSTOM = react.css(_templateObject4$2(), system.darkGray, system.white);
var STYLES_RADIO_CUSTOM_SELECTED = react.css(_templateObject5$1(), system.brand);
var STYLES_RADIO_LABEL = react.css(_templateObject6$1());
var RadioGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(RadioGroup, _React$Component);

  var _super = _createSuper(RadioGroup);

  function RadioGroup() {
    var _this;

    _classCallCheck(this, RadioGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_handleChange", function (value) {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: value
        }
      });
    });

    return _this;
  }

  _createClass(RadioGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React$1.createElement("form", {
        css: STYLES_RADIO_GROUP
      }, this.props.options.map(function (radio) {
        var checked = _this2.props.selected === radio.value;
        return /*#__PURE__*/React$1.createElement("label", {
          css: STYLES_RADIO,
          key: "radio-".concat(radio.value)
        }, /*#__PURE__*/React$1.createElement("span", {
          css: STYLES_RADIO_CUSTOM
        }, /*#__PURE__*/React$1.createElement("span", {
          css: STYLES_RADIO_CUSTOM_SELECTED,
          style: {
            opacity: checked ? 1 : 0
          }
        })), /*#__PURE__*/React$1.createElement("input", {
          css: STYLES_RADIO_INPUT,
          type: "radio",
          value: radio.value,
          checked: checked,
          onChange: function onChange() {
            return _this2._handleChange(radio.value);
          }
        }), ' ', /*#__PURE__*/React$1.createElement("span", {
          css: STYLES_RADIO_LABEL
        }, radio.label));
      }));
    }
  }]);

  return RadioGroup;
}(React$1.Component);

function _templateObject6$2() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 12px;\n  margin-top: 1px;\n"]);

  _templateObject6$2 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$2() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  margin-left: 4px;\n"]);

  _templateObject5$2 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$3() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15),\n    inset 0 0 0 1px ", ";\n  padding: 0 48px 0 24px;\n"]);

  _templateObject4$3 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$5() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  opacity: 0;\n  width: 100%;\n  height: 40px;\n"]);

  _templateObject3$5 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$8() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  position: relative;\n  height: 40px;\n  width: 100%;\n"]);

  _templateObject2$8 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$b() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  position: relative;\n  height: 40px;\n  max-width: 320px;\n  width: 100%;\n"]);

  _templateObject$b = function _templateObject() {
    return data;
  };

  return data;
}
var INPUT_STYLES$1 = "\n  -webkit-appearance: none;\n  width: 100%;\n  height: 40px;\n  background: ".concat(system.white, ";\n  color: ").concat(system.black, ";\n  border-radius: 4px;\n  display: flex;\n  font-size: 14px;\n  align-items: center;\n  justify-content: flex-start;\n  outline: 0;\n  border: 0;\n  box-sizing: border-box;\n  transition: 200ms ease all;\n");
var STYLES_SELECT_MENU = react.css(_templateObject$b());
var STYLES_SELECT_MENU_FULL = react.css(_templateObject2$8());
var STYLES_SELECT_MENU_ANCHOR = react.css(_templateObject3$5());
var STYLES_SELECT_MENU_LABEL = react.css(_templateObject4$3(), INPUT_STYLES$1, system.darkGray);
var STYLES_SELECT_MENU_CATEGORY = react.css(_templateObject5$2(), system.darkGray);
var STYLES_SELECT_MENU_CHEVRON = react.css(_templateObject6$2());
var SelectMenu = function SelectMenu(props) {
  return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement(DescriptionGroup, {
    label: props.label,
    description: props.description,
    tooltip: props.tooltip,
    style: props.containerStyle
  }), /*#__PURE__*/React$1.createElement("div", {
    css: props.className ? props.className : STYLES_SELECT_MENU
  }, /*#__PURE__*/React$1.createElement("label", {
    css: STYLES_SELECT_MENU_LABEL,
    htmlFor: "id-".concat(props.name)
  }, props.children, " ", props.category ? /*#__PURE__*/React$1.createElement("span", {
    css: STYLES_SELECT_MENU_CATEGORY
  }, props.category) : null, /*#__PURE__*/React$1.createElement(ChevronDown, {
    height: "16px",
    css: STYLES_SELECT_MENU_CHEVRON
  })), /*#__PURE__*/React$1.createElement("select", {
    css: STYLES_SELECT_MENU_ANCHOR,
    value: props.value,
    onChange: props.onChange,
    name: props.name,
    id: "id-".concat(props.name)
  }, props.options.map(function (each) {
    return /*#__PURE__*/React$1.createElement("option", {
      value: each.value,
      key: each.value
    }, each.name);
  }))));
};
var SelectMenuFull = function SelectMenuFull(props) {
  return /*#__PURE__*/React$1.createElement(SelectMenu, _extends({}, props, {
    css: STYLES_SELECT_MENU_FULL
  }));
};

function _templateObject$c() {
  var data = _taggedTemplateLiteral(["\n  padding: 8px 8px 8px 8px;\n  display: inline-flex;\n  font-family: 'mono';\n  font-size: 12px;\n  letter-spacing: 0.2px;\n  align-items: center;\n  text-transform: uppercase;\n"]);

  _templateObject$c = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_BANDWIDTH = react.css(_templateObject$c());
var StatUpload = function StatUpload(props) {
  return /*#__PURE__*/React$1.createElement("div", {
    css: STYLES_BANDWIDTH,
    style: props.style
  }, /*#__PURE__*/React$1.createElement(BandwidthUp, {
    height: "16px",
    style: {
      marginRight: 8
    }
  }), " ", props.children);
};
var StatDownload = function StatDownload(props) {
  return /*#__PURE__*/React$1.createElement("div", {
    css: STYLES_BANDWIDTH,
    style: props.style
  }, /*#__PURE__*/React$1.createElement(BandwidthDown, {
    height: "16px",
    style: {
      marginRight: 8
    }
  }), " ", props.children);
};

function _templateObject2$9() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  color: ", ";\n  border-bottom: 1px solid ", ";\n  height: 40px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 14px;\n  font-family: 'inter-semi-bold';\n  transition: 200ms ease all;\n  user-select: none;\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject2$9 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$d() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: flex;\n  align-items: flex-start;\n"]);

  _templateObject$d = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_TAB_GROUP = react.css(_templateObject$d());
var STYLES_TAB_GROUP_TAB = react.css(_templateObject2$9(), system.gray, system.black, system.white, system.brand);
var TAB_GROUP_SIZE_MAP$1 = {
  1: '100%',
  2: '50%',
  3: '33.33%',
  4: '25%'
};
var TabGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(TabGroup, _React$Component);

  var _super = _createSuper(TabGroup);

  function TabGroup() {
    var _this;

    _classCallCheck(this, TabGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_handleChange", function (value) {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: value
        }
      });
    });

    return _this;
  }

  _createClass(TabGroup, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React$1.createElement("div", {
        css: STYLES_TAB_GROUP
      }, this.props.options.map(function (tab) {
        var selected = tab.value === _this2.props.value;
        return /*#__PURE__*/React$1.createElement("div", {
          css: STYLES_TAB_GROUP_TAB,
          key: tab.value,
          style: {
            backgroundColor: selected ? system.white : null,
            width: TAB_GROUP_SIZE_MAP$1[_this2.props.options.length],
            cursor: !selected ? 'pointer' : null,
            borderBottom: !selected ? "1px solid #D7D7D7" : null
          },
          onClick: function onClick() {
            return _this2._handleChange(tab.value);
          }
        }, tab.label);
      }));
    }
  }]);

  return TabGroup;
}(React$1.Component);

var getNavigatorAgent = function getNavigatorAgent(userAgent) {
  return userAgent ? userAgent : navigator.userAgent || navigator.vendor || window.opera;
};
var isMobileBrowser = function isMobileBrowser(userAgent) {
  var navigatorAgent = getNavigatorAgent(userAgent);
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ipad|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigatorAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigatorAgent.substr(0, 4));
};

var WebRectBoundary = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(WebRectBoundary, _React$PureComponent);

  var _super = _createSuper(WebRectBoundary);

  function WebRectBoundary() {
    var _this;

    _classCallCheck(this, WebRectBoundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_root", undefined);

    _defineProperty(_assertThisInitialized(_this), "_addListeners", function () {
      _this._removeListeners();

      window.setTimeout(function () {
        if (_this.props.onOutsideRectEvent) {
          if (isMobileBrowser()) {
            window.addEventListener("touchstart", _this._handleOutsideClick);
          } else {
            window.addEventListener("click", _this._handleOutsideClick);
          }
        }

        if (_this.props.captureResize) {
          window.addEventListener("resize", _this._handleWindowResize);
        }

        if (_this.props.captureScroll) {
          window.addEventListener("scroll", _this._handleWindowScroll);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_handleOutsideClick", function (e) {
      // NOTE(jim): anything with `data-menu` is also ignored...
      if (!e.target) {
        return;
      }

      if (_this.props.isDataMenuCaptured && typeof e.target.hasAttribute === "function" && e.target.hasAttribute("data-menu")) {
        return;
      }

      if (_this.props.isDataMenuCaptured && e.target.parentNode && typeof e.target.parentNode.hasAttribute === "function" && e.target.parentNode.hasAttribute("data-menu")) {
        return;
      }

      if (_this._root && !_this._root.contains(e.target)) {
        _this._handleOutsideRectEvent(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleWindowResize", function (e) {
      return _this._handleOutsideRectEvent(e);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleWindowScroll", function (e) {
      return _this._handleOutsideRectEvent(e);
    });

    _defineProperty(_assertThisInitialized(_this), "_removeListeners", function () {
      window.removeEventListener("touchstart", _this._handleOutsideClick);
      window.removeEventListener("click", _this._handleOutsideClick);
      window.removeEventListener("resize", _this._handleWindowResize);
      window.removeEventListener("scroll", _this._handleWindowScroll);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleOutsideRectEvent", function (e) {
      _this.props.onOutsideRectEvent(e);
    });

    return _this;
  }

  _createClass(WebRectBoundary, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.enabled) {
        return;
      }

      this._addListeners();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._removeListeners();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(props) {
      if (props.enabled) {
        this._addListeners();
      } else {
        this._removeListeners();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React$1.createElement("div", {
        className: this.props.className,
        ref: function ref(c) {
          _this2._root = c;
        },
        style: this.props.style,
        onClick: this.props.onClick
      }, this.props.children);
    }
  }]);

  return WebRectBoundary;
}(React$1.PureComponent);

_defineProperty(WebRectBoundary, "defaultProps", {
  className: undefined,
  captureResize: true,
  captureScroll: true,
  children: null,
  enabled: false,
  isDataMenuCaptured: false,
  onOutsideRectEvent: function onOutsideRectEvent() {}
});

function _templateObject2$a() {
  var data = _taggedTemplateLiteral(["\n  height: 16px;\n  width: 16px;\n  background-color: ", ";\n  border: 2px solid ", ";\n  position: absolute;\n  bottom: -4px;\n  right: -4px;\n  border-radius: 16px;\n"]);

  _templateObject2$a = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$e() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  background-size: cover;\n  background-position: 50% 50%;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);\n  position: relative;\n  background-color: ", ";\n"]);

  _templateObject$e = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_AVATAR = react.css(_templateObject$e(), system.black);
var STYLES_AVATAR_ONLINE = react.css(_templateObject2$a(), system.green, system.white);

var AvatarEntity = /*#__PURE__*/function (_React$Component) {
  _inherits(AvatarEntity, _React$Component);

  var _super = _createSuper(AvatarEntity);

  function AvatarEntity() {
    var _this;

    _classCallCheck(this, AvatarEntity);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "_handleClick", function (e) {
      if (_this.props.popover) {
        _this.setState({
          visible: !_this.state.visible
        });
      }

      if (_this.props.onClick) {
        _this.props.onClick(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_handleHide", function () {
      _this.setState({
        visible: false
      });
    });

    return _this;
  }

  _createClass(AvatarEntity, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React$1.createElement(WebRectBoundary, {
        css: STYLES_AVATAR,
        captureResize: false,
        captureScroll: true,
        enabled: this.state.visible,
        onOutsideRectEvent: this._handleHide,
        onClick: this._handleClick,
        style: _objectSpread2(_objectSpread2({}, this.props.style), {}, {
          width: "".concat(this.props.size, "px"),
          height: "".concat(this.props.size, "px"),
          borderRadius: "".concat(this.props.size, "px"),
          backgroundImage: "url('".concat(this.props.url, "')"),
          cursor: this.props.onClick ? "pointer" : this.props.style
        })
      }, this.state.visible ? this.props.popover : null, this.props.online ? /*#__PURE__*/React$1.createElement("span", {
        css: STYLES_AVATAR_ONLINE
      }) : null);
    }
  }]);

  return AvatarEntity;
}(React$1.Component);

function _templateObject6$3() {
  var data = _taggedTemplateLiteral(["\n  font-family: 'inter-medium';\n  text-decoration: underline;\n  cursor: pointer;\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject6$3 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5$3() {
  var data = _taggedTemplateLiteral(["\n  flex-shrink: 0;\n  height: 40px;\n  width: 30px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: 200ms ease all;\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject5$3 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4$4() {
  var data = _taggedTemplateLiteral(["\n  padding: 12px 12px 16px 12px;\n  min-width: 10%;\n  width: 100%;\n  align-self: stretch;\n  flex-direction: column;\n  word-break: break-word;\n  overflow-wrap: anywhere;\n  font-size: 12px;\n"]);

  _templateObject4$4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$6() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  align-self: stretch;\n  min-width: 10%;\n  cursor: pointer;\n  transition: 200ms ease all;\n\n  :hover {\n    color: ", ";\n  }\n"]);

  _templateObject3$6 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$b() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  align-self: stretch;\n  min-width: 10%;\n"]);

  _templateObject2$b = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$f() {
  var data = _taggedTemplateLiteral(["\n  font-weight: 400;\n  font-family: 'inter-semi-bold';\n  letter-spacing: 0.2px;\n  padding: 4px 6px 4px 6px;\n  font-size: 10px;\n  text-transform: uppercase;\n  background: ", ";\n  color: ", ";\n  border-radius: 4px;\n  white-space: nowrap;\n"]);

  _templateObject$f = function _templateObject() {
    return data;
  };

  return data;
}
var STORAGE_DEAL_STATES = {
  '0': 'Local file only.',
  '1': 'Searching for miners.',
  '2': 'Proposing storage deal.',
  '3': 'Accepted by miners.',
  '4': 'Data transfer in progress.',
  '5': 'Data transfer complete.',
  '6': 'Stored on network.'
};
var RETRIEVAL_DEAL_STATES = {
  '0': 'Local file',
  '1': 'Available on network',
  '2': 'Retrieval deal proposed.',
  '3': 'Retrieval deal accepted.',
  '4': 'Data transfer in progress.',
  '5': 'Data transfer completed.',
  '6': 'Retrieved from network.'
};
var COMPONENTS_ICON = {
  PNG: /*#__PURE__*/React$1.createElement(FileImage, {
    height: "24px"
  }),
  FOLDER: /*#__PURE__*/React$1.createElement(Folder, {
    height: "24px"
  })
};
var STYLES_TABLE_TAG = react.css(_templateObject$f(), system.black, system.white);
var COMPONENTS_TRANSACTION_DIRECTION = {
  '1': /*#__PURE__*/React$1.createElement("span", {
    css: STYLES_TABLE_TAG,
    style: {
      background: system.green
    }
  }, "+ incoming"),
  '2': /*#__PURE__*/React$1.createElement("span", {
    css: STYLES_TABLE_TAG
  }, "- outgoing")
};
var COMPONENTS_TRANSACTION_STATUS = {
  '1': /*#__PURE__*/React$1.createElement("span", {
    css: STYLES_TABLE_TAG
  }, "complete"),
  '2': /*#__PURE__*/React$1.createElement("span", {
    css: STYLES_TABLE_TAG,
    style: {
      background: system.yellow
    }
  }, "pending")
};
var STYLES_COLUMN = react.css(_templateObject2$b());
var STYLES_TOP_COLUMN = react.css(_templateObject3$6(), system.brand);
var STYLES_CONTENT = react.css(_templateObject4$4());
var STYLES_CONTENT_BUTTON = react.css(_templateObject5$3(), system.green);
var STYLES_TABLE_CONTENT_LINK = react.css(_templateObject6$3(), system.green);
var TableColumn = function TableColumn(props) {
  var tooltipElement = props.tooltip ? /*#__PURE__*/React$1.createElement(reactTippy_1, {
    animation: "fade",
    animateFill: false,
    title: props.tooltip
  }, /*#__PURE__*/React$1.createElement("span", {
    css: STYLES_CONTENT_BUTTON
  }, /*#__PURE__*/React$1.createElement(Information, {
    height: "14px"
  }))) : null;
  var copyableElement = props.copyable ? /*#__PURE__*/React$1.createElement("span", {
    css: STYLES_CONTENT_BUTTON
  }, /*#__PURE__*/React$1.createElement(CopyAndPaste, {
    height: "16px"
  })) : null;
  return /*#__PURE__*/React$1.createElement("span", {
    css: props.top ? STYLES_TOP_COLUMN : STYLES_COLUMN,
    style: props.style
  }, /*#__PURE__*/React$1.createElement("span", {
    css: STYLES_CONTENT
  }, props.children), tooltipElement, copyableElement);
};
var TableContent = function TableContent(_ref) {
  var type = _ref.type,
      text = _ref.text,
      action = _ref.action,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      onNavigateTo = _ref.onNavigateTo,
      onAction = _ref.onAction;
  var status = data.status,
      online = data.online;

  if (text === null || text === undefined) {
    return null;
  }

  switch (type) {
    case 'DEAL_CATEGORY':
      return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, text == 1 ? 'Storage' : 'Retrieval');

    case 'LOCATION':
      return 'United States';

    case 'BUTTON':
      return /*#__PURE__*/React$1.createElement("span", {
        css: STYLES_TABLE_CONTENT_LINK,
        onClick: function onClick() {
          return onAction({
            type: 'SIDEBAR',
            value: action
          });
        }
      }, text);

    case 'TRANSACTION_DIRECTION':
      return COMPONENTS_TRANSACTION_DIRECTION[text];

    case 'TRANSACTION_STATUS':
      return COMPONENTS_TRANSACTION_STATUS[text];

    case 'ICON':
      return COMPONENTS_ICON[text];

    case 'AVATAR':
      return /*#__PURE__*/React$1.createElement(AvatarEntity, {
        url: text,
        size: 40,
        online: online
      });

    case 'DEAL_STATUS_RETRIEVAL':
      return RETRIEVAL_DEAL_STATES["".concat(text)];

    case 'DEAL_STATUS':
      return data['deal_category'] === 1 ? STORAGE_DEAL_STATES["".concat(text)] : RETRIEVAL_DEAL_STATES["".concat(text)];

    case 'BANDWIDTH_UPLOAD':
      return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement(BandwidthUp, {
        height: "16px",
        style: {
          marginRight: 8
        }
      }), bytesToSize(text));

    case 'BANDWIDTH_DOWNLOAD':
      return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement(BandwidthDown, {
        height: "16px",
        style: {
          marginRight: 8
        }
      }), bytesToSize(text));

    case 'MINER_AVAILABILITY':
      return text == 1 ? /*#__PURE__*/React$1.createElement("span", {
        css: STYLES_TABLE_TAG,
        style: {
          background: system.green
        }
      }, "Online") : null;

    case 'DEAL_AUTO_RENEW':
      return text == 1 ? /*#__PURE__*/React$1.createElement("span", {
        css: STYLES_TABLE_TAG,
        style: {
          background: system.brand
        }
      }, "true") : /*#__PURE__*/React$1.createElement("span", {
        css: STYLES_TABLE_TAG
      }, "false");

    case 'NOTIFICATION_ERROR':
      return /*#__PURE__*/React$1.createElement("span", {
        css: STYLES_TABLE_TAG,
        style: {
          background: system.red
        }
      }, text, " ", pluralize('error', text));

    case 'FILE_DATE':
      return toDate(text);

    case 'FILE_SIZE':
      return bytesToSize(text, 2);

    case 'FILE_LINK':
      // NOTE(jim): Special case to prevent navigation.
      if (!data) {
        return text;
      } // NOTE(jim): Navigate to folers.


      if (data && data.folderId) {
        return /*#__PURE__*/React$1.createElement("span", {
          css: STYLES_TABLE_CONTENT_LINK,
          onClick: function onClick() {
            return onAction({
              type: 'NAVIGATE',
              value: data.folderId,
              data: data
            });
          }
        }, text);
      } // NOTE(jim): Special case for navigating to a sidebar.


      if (data && data['retrieval_status'] === 1) {
        return /*#__PURE__*/React$1.createElement("span", {
          css: STYLES_TABLE_CONTENT_LINK,
          onClick: function onClick() {
            return onAction({
              type: 'SIDEBAR',
              value: 'SIDEBAR_FILE_STORAGE_DEAL'
            });
          }
        }, text);
      } // NOTE(jim): Special case to prevent navigation.


      if (data && (data['retrieval_status'] === 5 || data['retrieval_status'] === 4 || data['retrieval_status'] === 3 || data['retrieval_status'] === 2)) {
        return /*#__PURE__*/React$1.createElement("span", {
          onClick: function onClick() {
            return onAction({
              name: 'File does not exist',
              type: 'ACTION',
              value: 'ACTION_FILE_MISSING'
            });
          }
        }, text);
      } // NOTE(jim): Navigates to file.


      return /*#__PURE__*/React$1.createElement("span", {
        css: STYLES_TABLE_CONTENT_LINK,
        onClick: function onClick() {
          return onNavigateTo({
            id: 15
          }, data);
        }
      }, text);

    default:
      return text;
  }
};

function _templateObject3$7() {
  var data = _taggedTemplateLiteral(["\n  font-size: ", ";\n  line-height: 1.5;\n\n  strong {\n    font-family: 'inter-semi-bold';\n    font-weight: 400;\n  }\n"]);

  _templateObject3$7 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$c() {
  var data = _taggedTemplateLiteral(["\n  font-size: ", ";\n  line-height: 1.1;\n  font-family: 'inter-medium';\n  font-weight: 400;\n\n  color: inherit;\n  text-decoration: none;\n  display: block;\n\n  :hover {\n    color: inherit;\n  }\n\n  :visited {\n    color: inherit;\n  }\n\n  strong {\n    font-family: 'inter-semi-bold';\n    font-weight: 400;\n  }\n"]);

  _templateObject2$c = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$g() {
  var data = _taggedTemplateLiteral(["\n  font-size: ", ";\n  line-height: 1.1;\n  font-family: 'inter-semi-bold';\n  font-weight: 400;\n  color: inherit;\n  text-decoration: none;\n  display: block;\n\n  :hover {\n    color: inherit;\n  }\n\n  :visited {\n    color: inherit;\n  }\n\n  strong {\n    font-family: 'inter-semi-bold';\n    font-weight: 400;\n  }\n"]);

  _templateObject$g = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_H1 = react.css(_templateObject$g(), typescale.lvl4);
var H1 = function H1(props) {
  if (props.href) {
    return /*#__PURE__*/React$1.createElement("a", _extends({
      css: STYLES_H1
    }, props));
  }

  return /*#__PURE__*/React$1.createElement("h1", _extends({
    css: STYLES_H1
  }, props));
};
var STYLES_H2 = react.css(_templateObject2$c(), typescale.lvl3);
var H2 = function H2(props) {
  if (props.href) {
    return /*#__PURE__*/React$1.createElement("a", _extends({
      css: STYLES_H2
    }, props));
  }

  return /*#__PURE__*/React$1.createElement("h2", _extends({
    css: STYLES_H2
  }, props));
};
var STYLES_P = react.css(_templateObject3$7(), typescale.lvl1);
var P = function P(props) {
  return /*#__PURE__*/React$1.createElement("p", _extends({
    css: STYLES_P
  }, props));
};

function _templateObject4$5() {
  var data = _taggedTemplateLiteral(["\n  font-family: 'inter-semi-bold';\n  width: 100%;\n  padding: 0 8px 0 8px;\n  border-bottom: 1px solid ", ";\n  display: flex;\n  align-items: flex-start;\n"]);

  _templateObject4$5 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$8() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  border-bottom: 1px solid ", ";\n"]);

  _templateObject3$8 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$d() {
  var data = _taggedTemplateLiteral(["\n  padding: 0 8px 0 8px;\n  border-bottom: 1px solid ", ";\n  display: flex;\n  align-items: flex-start;\n  transition: 200ms ease all;\n\n  :last-child {\n    border: 0;\n  }\n"]);

  _templateObject2$d = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$h() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  width: 100%;\n  padding: 20px;\n  font-size: 12px;\n  color: ", ";\n"]);

  _templateObject$h = function _templateObject() {
    return data;
  };

  return data;
}
var TABLE_COLUMN_WIDTH_DEFAULTS = {
  1: '100%',
  2: '50%',
  3: '33.333%',
  4: '25%',
  5: '20%',
  6: '16.666%',
  7: '14.28%',
  8: '12.5%'
};
var STYLES_TABLE_PLACEHOLDER = react.css(_templateObject$h(), system.black);
var STYLES_TABLE_ROW = react.css(_templateObject2$d(), system.gray);
var STYLES_TABLE_SELECTED_ROW = react.css(_templateObject3$8(), system.gray);
var STYLES_TABLE_TOP_ROW = react.css(_templateObject4$5(), system.gray);
var Table = /*#__PURE__*/function (_React$Component) {
  _inherits(Table, _React$Component);

  var _super = _createSuper(Table);

  function Table() {
    var _this;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_handleChange", function (value) {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: value !== _this.props.selectedRowId ? value : null
        }
      });
    });

    return _this;
  }

  _createClass(Table, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var data = this.props.data;
      var ac = {};

      if (!data || !data.rows || data.rows.length === 0) {
        return /*#__PURE__*/React$1.createElement(P, {
          style: {
            padding: 24
          }
        }, "No data.");
      }

      for (var x = 0; x < data.columns.length; x++) {
        ac[data.columns[x].key] = _objectSpread2(_objectSpread2({}, data.columns[x]), {}, {
          index: x,
          color: x % 2 !== 0 ? 'rgba(0, 0, 0, 0.01)' : null
        });
      }

      var width = TABLE_COLUMN_WIDTH_DEFAULTS[data.columns.length];
      return /*#__PURE__*/React$1.createElement(React$1.Fragment, null, /*#__PURE__*/React$1.createElement("div", {
        css: STYLES_TABLE_TOP_ROW
      }, data.columns.map(function (c, cIndex) {
        var text = c.hideLabel ? '' : isEmpty(c.name) ? c.key : c.name;
        var localWidth = c.width ? c.width : width;
        var flexShrink = c.width && c.width !== '100%' ? '0' : null;

        if (cIndex === 0 && !c.width) {
          localWidth = '100%';
        }

        return /*#__PURE__*/React$1.createElement(TableColumn, {
          top: true,
          key: "table-top-".concat(c.key, "-").concat(cIndex),
          style: {
            width: localWidth,
            backgroundColor: ac[c.key].color,
            flexShrink: flexShrink
          },
          tooltip: c.tooltip
        }, text);
      })), data.rows.map(function (r, i) {
        var selected = r.id === _this2.props.selectedRowId;
        return /*#__PURE__*/React$1.createElement(React$1.Fragment, {
          key: r.id
        }, /*#__PURE__*/React$1.createElement("div", {
          css: STYLES_TABLE_ROW
        }, Object.keys(ac).map(function (each, cIndex) {
          var field = ac[each];
          var text = r[each];
          var localWidth = field.width ? field.width : width;
          var flexShrink = field.width && field.width !== '100%' ? '0' : null;

          if (cIndex === 0 && !field.width) {
            localWidth = '100%';
          }

          return /*#__PURE__*/React$1.createElement(TableColumn, {
            key: "".concat(each, "-").concat(i),
            style: {
              width: localWidth,
              backgroundColor: field.color,
              flexShrink: flexShrink
            },
            copyable: field.copyable
          }, /*#__PURE__*/React$1.createElement(TableContent, {
            data: r,
            text: text,
            type: field.type,
            action: field.action,
            onNavigateTo: _this2.props.onNavigateTo,
            onAction: _this2.props.onAction
          }));
        })), selected ? /*#__PURE__*/React$1.createElement("div", {
          css: STYLES_TABLE_SELECTED_ROW
        }, /*#__PURE__*/React$1.createElement("span", {
          css: STYLES_TABLE_PLACEHOLDER
        }, r.children)) : null);
      }));
    }
  }]);

  return Table;
}(React$1.Component);

_defineProperty(Table, "defaultProps", {
  onNavigateTo: function onNavigateTo() {
    return console.log('No navigation function set');
  },
  onAction: function onAction() {
    return console.log('No action function set');
  }
});

function _templateObject$i() {
  var data = _taggedTemplateLiteral(["\n  -webkit-appearance: none;\n  width: 100%;\n  min-height: 160px;\n  max-width: 480px;\n  resize: none;\n  background: ", ";\n  color: ", ";\n  border-radius: 4px;\n  display: flex;\n  font-size: 14px;\n  align-items: center;\n  justify-content: flex-start;\n  outline: 0;\n  border: 0;\n  box-sizing: border-box;\n  transition: 200ms ease all;\n  padding: 16px 24px 16px 24px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15), inset 0 0 0 1px ", ";\n"]);

  _templateObject$i = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_TEXTAREA = react.css(_templateObject$i(), system.white, system.black, system.darkGray);
var Textarea = /*#__PURE__*/function (_React$Component) {
  _inherits(Textarea, _React$Component);

  var _super = _createSuper(Textarea);

  function Textarea() {
    _classCallCheck(this, Textarea);

    return _super.apply(this, arguments);
  }

  _createClass(Textarea, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React$1.createElement(TextareaAutosize, {
        css: STYLES_TEXTAREA,
        onChange: this.props.onChange,
        name: this.props.name,
        value: this.props.value
      });
    }
  }]);

  return Textarea;
}(React$1.Component);

function _templateObject2$e() {
  var data = _taggedTemplateLiteral(["\n  height: 32px;\n  width: 32px;\n  border-radius: 32px;\n  margin-top: 4px;\n  margin-left: 4px;\n  background: ", ";\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);\n  transition: transform 200ms ease;\n"]);

  _templateObject2$e = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$j() {
  var data = _taggedTemplateLiteral(["\n  display: inline-flex;\n  height: 40px;\n  border-radius: 40px;\n  width: 80px;\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);\n  background: ", ";\n  transition: background 200ms ease;\n  cursor: pointer;\n  user-select: none;\n"]);

  _templateObject$j = function _templateObject() {
    return data;
  };

  return data;
}
var STYLES_TOGGLE = react.css(_templateObject$j(), system.black);
var STYLES_DIAL = react.css(_templateObject2$e(), system.white);
var Toggle = /*#__PURE__*/function (_React$Component) {
  _inherits(Toggle, _React$Component);

  var _super = _createSuper(Toggle);

  function Toggle() {
    var _this;

    _classCallCheck(this, Toggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "_handleChange", function () {
      _this.props.onChange({
        target: {
          name: _this.props.name,
          value: !_this.props.active
        }
      });
    });

    return _this;
  }

  _createClass(Toggle, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React$1.createElement("div", {
        css: STYLES_TOGGLE,
        onClick: this._handleChange,
        style: {
          backgroundColor: this.props.active ? system.brand : null
        }
      }, /*#__PURE__*/React$1.createElement("figure", {
        css: STYLES_DIAL,
        style: {
          transform: this.props.active ? "translateX(40px)" : null
        }
      }));
    }
  }]);

  return Toggle;
}(React$1.Component);

exports.ButtonDisabled = ButtonDisabled;
exports.ButtonDisabledFull = ButtonDisabledFull;
exports.ButtonPrimary = ButtonPrimary;
exports.ButtonPrimaryFull = ButtonPrimaryFull;
exports.ButtonSecondary = ButtonSecondary;
exports.ButtonSecondaryFull = ButtonSecondaryFull;
exports.CardTabGroup = CardTabGroup;
exports.CheckBox = CheckBox$1;
exports.CodeBlock = CodeBlock;
exports.CodeTextarea = CodeTextarea;
exports.DescriptionGroup = DescriptionGroup;
exports.H1 = H1;
exports.H2 = H2;
exports.Input = Input;
exports.Notification = Notification;
exports.P = P;
exports.PopoverNavigation = PopoverNavigation;
exports.RadioGroup = RadioGroup;
exports.SelectMenu = SelectMenu;
exports.SelectMenuFull = SelectMenuFull;
exports.StatDownload = StatDownload;
exports.StatUpload = StatUpload;
exports.TabGroup = TabGroup;
exports.Table = Table;
exports.TableColumn = TableColumn;
exports.TableContent = TableContent;
exports.Textarea = Textarea;
exports.Toggle = Toggle;
exports.TooltipAnchor = TooltipAnchor;
